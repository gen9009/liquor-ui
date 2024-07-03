import { defineComponent } from "vue";
import { useRender, useNamespace } from "@liquor-ui/hooks";
import props from './props'
const ns = useNamespace("icon");

export default defineComponent({
  name: "L-icon",
  props: { ...props },
  setup() {
    useRender(() => {
      return (
        <div class={ns.b()} >我是测试按钮{JSON.stringify(ns.b())}</div>
      )
    })
  }
})
