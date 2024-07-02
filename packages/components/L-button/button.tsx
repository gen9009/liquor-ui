import { defineComponent, getCurrentInstance } from "vue";
import { useRender } from '@liquor-ui/hooks' 
export default defineComponent({
  name: "LButton",
  setup() {

    useRender(() => {
      return (
        <button class="l-button"></button>
      )
    })
  }
})
