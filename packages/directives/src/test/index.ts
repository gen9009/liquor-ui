import { Directive, DirectiveBinding } from "vue"

export interface TestDirectiveBind extends Omit<DirectiveBinding, 'modifiers' | 'value'> {
  value?: any,
  modifiers: {
    [key: string]: any
  }
}
export const testDirective = {
  name:'test',
  mounted: (el: HTMLElement, binding: TestDirectiveBind) => {
    console.log('🚀::::::🐶💩', binding, el)
    el.innerHTML = 'test'
  },
  updated: (el: HTMLElement, binding: TestDirectiveBind) => {
    console.log('🚀::::::🐶💩', binding, el)
  },
  unmounted: (el: HTMLElement, binding: TestDirectiveBind) => {
    console.log('🚀::::::🐶💩', binding, el)
  }
}
/* 
  局部注册  import { testDirective as vTest } from 'xxx' -> <div v-test>
  全局注册  import app.directive('test', testDirective) -> <div v-test>
*/
export default testDirective
