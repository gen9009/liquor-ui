import { PropType, ExtractPropTypes } from "vue"
export const props = {
  // 按钮标签
  tag: {
    type: String as PropType<string>,
    default: 'button'
  },
  // 按钮类型
  type: {
    type: String as PropType<string>,
    default: 'default'
  },
  // 按钮是否圆角
  round: {
    type: Boolean as PropType<boolean>,
    default: '2'
  },
  // 按钮大小
  size: {
    type: String as PropType<string>,
    default: 'default'
  },
  // 按钮是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  link: {
    type: Boolean,
    default: false
  },
  // 按钮是否加载中
  loading: {
    type: Boolean,
    default: false
  },

  // 按钮是否圆形
  circle: {
    type: Boolean,
    default: false
  },
  // 按钮是否朴素
  plain: {
    type: Boolean,
    default: false
  },
  // 按钮是否自定义颜色
  customColor: {
    type: Boolean,
    default: false
  },
  // 按钮是否后端插槽
  append: {
    type: Boolean,
    default: false
  },
  // 按钮是否前端插槽
  prepend: {
    type: Boolean,
    default: false
  },
  // 按钮是否展示波浪
  ripple: {
    type: Boolean,
    default: false
  }
}
export type BtnProps = ExtractPropTypes<typeof props>
