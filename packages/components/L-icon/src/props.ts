import type { PropType } from "vue"
export default {
  // 图标名称
  name: {
    type: String as PropType<string>,
    default: ""
  },
  // 图标颜色
  color: {
    type: String as PropType<string>,
    default: ""
  },
  // 图标大小
  size: {
    type: [Number, String] as PropType<number | string>,
    default: 16

  }
} as const
