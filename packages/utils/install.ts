import { App } from 'vue'
export const CompInstall = (comp: any) => {
  comp.install = (app: App): void => {
    app.component(comp.name, comp)
  }
  return comp
}
