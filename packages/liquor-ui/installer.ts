import type { App, Plugin } from 'vue'
import Components from './components' //LiquorUI 组件

const Intaller = (components: Plugin[]) => {
  const install = (app: App) => {
    components.forEach(c => app.use(c))
  }
  return {
    install
  }
}

export default Intaller([...Components])
