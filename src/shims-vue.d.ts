/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module "*.js"
interface Window {
  $newiframe: any;
  recorderCallBack:any
  CCB_event_publish:any
  jumptouse:any
  showwebviewurl:any
  $imgCall:any;
}