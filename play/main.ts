import { createApp } from 'vue'
import App from './app.vue'
import LiquorUI from '../packages/liquor-ui'
// import LiquorUI from 'liquor-ui' // [problem] 直接访问liquor-ui失败
const app = createApp(App)
app.use(LiquorUI)
app.mount('#play')
