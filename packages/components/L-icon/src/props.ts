import { PropType, ExtractPropTypes } from "vue"
/*
  渲染 JSX 组件。
  渲染 SVG 路径。
  渲染字体图标。
  渲染使用类名的图标。
  https://pictogrammers.com/docs/guides/webfont-alternatives/
  vuetify 使用了@mdi/js 动态控制标签tag以及mdi规定的svg写法
*/

export const props = {
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

export type IconProps = ExtractPropTypes<typeof props>
