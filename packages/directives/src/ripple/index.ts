import './index.scss'

import { DirectiveBinding } from 'vue'
import { isObject } from '@liquor-ui/utils'

declare global {
  interface Element {
    _ripple?: {
      enabled?: boolean
      centered?: boolean
      class?: string
      circle?: boolean
      touched?: boolean
      isTouch?: boolean
      showTimer?: number
      showTimerCommit?: (() => void) | null
    }

    getElementsByClassName(classNames: string): NodeListOf<HTMLElement>
  }
}

const stopSymbol = Symbol('rippleStop')

type RippleEvent = (MouseEvent) & { [stopSymbol]?: boolean }

const DELAY_RIPPLE = 80

function transform(el: HTMLElement, value: string) {
  el.style.transform = value
  el.style.webkitTransform = value
}

interface RippleOptions {
  class?: string
  center?: boolean
  circle?: boolean
}

// 移除DirectiveBinding默认属性，添加额外属性
export interface RippleDirectiveBinding extends Omit<DirectiveBinding, 'modifiers' | 'value'> {
  value?: boolean | { class: string }
  modifiers: {
    center?: boolean
    circle?: boolean
    stop?: boolean
  }
}

const calculate = (e: RippleEvent, el: HTMLElement, value: RippleOptions = {}) => {
  const { left, top, width, height } = el.getBoundingClientRect()
  // 获取点击位置相对元素左上角坐标
  const localX = e.clientX - left
  const localY = e.clientY - top
  let radius = 0
  let scale = 0.3
  /* 
    计算 ripple 的半径和缩放比例：
    如果元素有 _ripple.circle 属性：
    缩放比例设置为 0.15， 半径为元素宽度的一半， 如果 value.center 为 true，则半径保持不变；否则根据点击位置进一步调整半径：
  */
  if (el._ripple?.circle) {
    scale = 0.15
    radius = width / 2
    radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4
  } else {
    // 否则半径为元素对角线的一半
    radius = Math.sqrt(width ** 2 + height ** 2) / 2
  }
  // 计算 ripple 的中心位置和相对于点击位置的坐标：
  const centerX = `${(width - (radius * 2)) / 2}px`
  const centerY = `${(height - (radius * 2)) / 2}px`

  const x = value.center ? centerX : `${localX - radius}px`
  const y = value.center ? centerY : `${localY - radius}px`

  return { radius, scale, x, y, centerX, centerY }
}

const ripples = {
  show(
    e: RippleEvent,
    el: HTMLElement,
    value: RippleOptions = {}
  ) {
    if (!el?._ripple?.enabled) return

    const container = document.createElement('span')
    const animation = document.createElement('span')

    container.appendChild(animation)
    container.className = 'l-ripple__container'

    if (value.class) {
      container.className += ` ${value.class}`
    }

    const { radius, scale, x, y, centerX, centerY } = calculate(e, el, value)

    const size = `${radius * 2}px`
    animation.className = 'l-ripple__animation'
    animation.style.width = size
    animation.style.height = size

    el.appendChild(container)

    const computed = window.getComputedStyle(el)
    if (computed && computed.position === 'static') {
      el.style.position = 'relative'
      el.dataset.previousPosition = 'static'
    }

    animation.classList.add('l-ripple__animation--enter')
    animation.classList.add('l-ripple__animation--visible')
    transform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`)
    animation.dataset.activated = String(performance.now())

    setTimeout(() => {
      animation.classList.remove('l-ripple__animation--enter')
      animation.classList.add('l-ripple__animation--in')
      transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`)
    }, 0)
  },

  hide(el: HTMLElement | null) {
    if (!el?._ripple?.enabled) return

    const ripples = el.getElementsByClassName('l-ripple__animation')

    if (ripples.length === 0) return
    const animation = ripples[ripples.length - 1]

    if (animation.dataset.isHiding) return
    else animation.dataset.isHiding = 'true'

    const diff = performance.now() - Number(animation.dataset.activated)
    const delay = Math.max(250 - diff, 0)

    setTimeout(() => {
      animation.classList.remove('l-ripple__animation--in')
      animation.classList.add('l-ripple__animation--out')

      setTimeout(() => {
        const ripples = el.getElementsByClassName('l-ripple__animation')
        if (ripples.length === 1 && el.dataset.previousPosition) {
          el.style.position = el.dataset.previousPosition
          delete el.dataset.previousPosition
        }

        if (animation.parentNode?.parentNode === el) el.removeChild(animation.parentNode)
      }, 300)
    }, delay)
  },
}

function isEnabled(value: any): value is true {
  return typeof value === 'undefined' || !!value
}

function rippleShow(e: RippleEvent) {
  const value: RippleOptions = {}
  const element = e.currentTarget as HTMLElement | undefined

  if (!element?._ripple || element._ripple.touched || e[stopSymbol]) return

  // Don't allow the event to trigger ripples on any other elements
  e[stopSymbol] = true

  if (element._ripple.isTouch) return

  value.center = element._ripple.centered
  if (element._ripple.class) {
    value.class = element._ripple.class
  }

  ripples.show(e, element, value)
}

function rippleStop(e: RippleEvent) {
  e[stopSymbol] = true
}

function rippleHide(e: Event) {
  const element = e.currentTarget as HTMLElement | null
  if (!element?._ripple) return

  window.clearTimeout(element._ripple.showTimer)

  // The touch interaction occurs before the show timer is triggered.
  // We still want to show ripple effect.
  if (e.type === 'touchend' && element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit()
    element._ripple.showTimerCommit = null

    // re-queue ripple hiding
    element._ripple.showTimer = window.setTimeout(() => {
      rippleHide(e)
    })
    return
  }

  window.setTimeout(() => {
    if (element._ripple) {
      element._ripple.touched = false
    }
  })
  ripples.hide(element)
}




function updateRipple(el: HTMLElement, binding: RippleDirectiveBinding, wasEnabled: boolean) {
  const { value, modifiers } = binding
  if (!isEnabled(value)) { ripples.hide(el) }
  el._ripple = el._ripple ?? {}
  el._ripple.enabled = isEnabled(value)
  el._ripple.centered = modifiers.center
  el._ripple.circle = modifiers.circle
  if (isObject(value) && value.class) {
    el._ripple.class = value.class
  }

  if (isEnabled(value) && !wasEnabled) {
    if (modifiers.stop) {
      el.addEventListener('mousedown', rippleStop)
      return
    }
    el.addEventListener('mousedown', rippleShow)
    el.addEventListener('mouseup', rippleHide)
    el.addEventListener('mouseleave', rippleHide)
  } else if (!isEnabled(value) && wasEnabled) {
    removeListeners(el)
  }
}

function removeListeners(el: HTMLElement) {
  el.removeEventListener('mousedown', rippleShow)
  el.removeEventListener('mouseup', rippleHide)
  el.removeEventListener('mouseleave', rippleHide)
}

function mounted(el: HTMLElement, binding: RippleDirectiveBinding) {
  updateRipple(el, binding, false)
}

function unmounted(el: HTMLElement) {
  delete el._ripple
  removeListeners(el)
}

function updated(el: HTMLElement, binding: RippleDirectiveBinding) {
  if (binding.value === binding.oldValue) { return }
  const wasEnabled = isEnabled(binding.oldValue)
  updateRipple(el, binding, wasEnabled)
}

export const Ripple = {
  mounted,
  unmounted,
  updated,
}

export default Ripple
