import { createApp } from 'vue'
import App from './app.vue'
import * as LiquorUI from '@liquor-ui/components'
const app = createApp(App)
Object.keys(LiquorUI).forEach(v => {
  app.use(LiquorUI[v as keyof typeof LiquorUI])
})
app.mount('#play')
