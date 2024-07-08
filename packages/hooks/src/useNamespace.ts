export const defaultNamespace = 'l'
export const statePrefix = 'is-'

// 生成命名空间+BEM规范

const _bem = (
  namespace: string, // 命名空间 
  block: string, // 块 form
  blockSuffix?: string, // 块后缀 item
  element?: string, // 元素 label
  modifier?: string, // 修饰符 disabled
) => {
  let cls = `${namespace}-${block}`
  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }
  if (element) {
    cls += `__${element}`
  }
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}

export const useNamespace = (block: string,) => {
  const b = (blockSuffix = '') => {
    return _bem(defaultNamespace, block, blockSuffix, '', '')
  }
  const e = (element?: string) => {
    return element ? _bem(defaultNamespace, block, '', element, '') : ''
  }
  const be = (blockSuffix?: string, element?: string) => {
    return blockSuffix && element ? _bem(defaultNamespace, block, blockSuffix, element, '') : ''
  }
  const bm = (blockSuffix?: string, modifier?: string) => {
    return blockSuffix && modifier ? _bem(defaultNamespace, block, blockSuffix, '', modifier) : ''
  }
  const em = (element?: string, modifier?: string) => {
    return element && modifier ? _bem(defaultNamespace, block, '', element, modifier) : ''
  }
  const bem = (blockSuffix?: string, element?: string, modifier?: string) => {
    return blockSuffix && element && modifier ? _bem(defaultNamespace, block, blockSuffix, element, modifier) : ''
  }
  const is = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args?.[0] !== undefined ? args[0] : true
    return name && state ? `${statePrefix}${name}` : ''
  }

  return {
    b, e, be, bm, em, bem, is
  }
}
