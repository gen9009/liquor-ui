/* 
 异步加载组件
*/

import { defineAsyncComponent } from "vue"

export const loadAsyncComponent = (loader: any) => {
  return defineAsyncComponent({
    loader,
    delay: 200,
    timeout: 3000,
  })
}
