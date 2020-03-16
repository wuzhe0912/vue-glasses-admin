import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import env from './env'

// styles
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/scss/style.scss'

// 前端 axios 啟用附帶 cookie
axios.defaults.withCredentials = true
axios.defaults.baseURL = env.baseURL
axios.defaults.validBaseURL = env.baseURL + env.customURL
// 超時檢查
axios.defaults.timeout = 5000
// API 錯誤攔截
axios.interceptors.response.use((response) => {
  let res = response.data
  return res
})

Vue.config.productionTip = false

// 過濾器
Vue.filter('currency', (val) => {
  return parseFloat(val).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')
})
Vue.filter('dollarSign', (val) => {
  return `$ ${val}`
})

Vue.use(ElementUI)
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
