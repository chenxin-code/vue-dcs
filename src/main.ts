import { createApp } from 'vue'
import App from './App.vue'
import { Progress,Circle,Calendar,Loading } from "vant";
import Vant from 'vant';
import "vant/es/progress/style";
import "vant/es/circle/style";
import 'vant/lib/index.css'
import 'vant/es/toast/style'
const app =createApp(App)
app.use(Progress);
app.use(Circle);
app.use(Calendar);
app.use(Vant);
app.use(Loading);
app.mount('#app');
