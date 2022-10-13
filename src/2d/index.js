import App from "./App";
import { createApp } from "vue";
import * as echarts from "echarts";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/2d/router/index'


const app = createApp(App);

app.provide("SHOW2D", true) // 隐藏2d页面，只显示纯3d模块
app.use(ElementPlus)
app.use(router)
app.use(echarts)
app.mount("#app");
