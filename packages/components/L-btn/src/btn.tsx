import { defineComponent, withDirectives, } from "vue";
import { useNamespace, useRender } from '@liquor-ui/hooks'
import { Ripple } from "@liquor-ui/directives";
import { props } from "./props";
const ns = useNamespace('btn')
/* 
简单实现一个vuetify按钮  has no css
1. vuetify 通过了指令的方式实现按钮的点击波纹
*/
export default defineComponent({
  name: "LButton",
  props: { ...props },
  setup(props, { slots }) {
    const tag = props.link ? 'a' : props.tag
    useRender(() => {
      return (
        withDirectives(
          <tag
            class={
              [
                ns.b(),
                ns.is('disabled', props.disabled),
                ns.is('loading', props.loading),
                ns.is('plain', props.plain),
                ns.is('round', props.round),
                ns.is('circle', props.circle),
                ns.is('link', props.link),
              ]
            }
            style={
              {
                color: '#000',
                backgroundColor: '#ccc',
                border: 0,
                padding:'20px'
              }
            }
          >
            {/* prepend 前插槽*/}
            {!!props.prepend ? (<span class={ns.be('prepend')}> </span>) : (slots.prepend?.({ a: 1 }))}

            {/* 默认 插槽*/}
            <span class={ns.be('content')}>
              {slots.default?.()}
            </span>

            {/* append 后插槽*/}
            {!!props.append ? (<span class={ns.be('append')}> </span>) : (slots.append?.())}
            {/* loading 按钮 */}
            {
              !!props.loading && (
                <span class={ns.be('loading')}>
                </span>
              )
            }
          </tag >,
          [
            [
              // [Directive, value, argument, modifiers]
              // Ripple, !!props.ripple, '',
              Ripple, true, '',
            ],
          ]
        )
      )
    })
  }
})
