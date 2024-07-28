import './assets/main.css'

import { createApp } from 'vue'
import { createBootstrap } from 'bootstrap-vue-next'
import App from './App.vue'
import VueApexCharts from 'vue3-apexcharts'
import router from './routes.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

createApp(App).use(router).use(VueApexCharts).use(createBootstrap()).mount('#app');
