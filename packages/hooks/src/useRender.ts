import { type VNode, getCurrentInstance } from 'vue'

export function useRender(render: () => VNode):void {
  const vm = getCurrentInstance() as any
  if (!vm) {
    throw Error('useRender 必须在 setup 中使用')
  }
  vm.render = render
}
