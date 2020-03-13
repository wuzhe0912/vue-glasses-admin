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

// axios.defaults.withCredentials = true
axios.defaults.noTokenBaseURL = env.baseURL
axios.defaults.hasTokenBaseURL = env.baseURL + env.customURL
// 超時檢查
axios.defaults.timeout = 5000
// API 錯誤攔截
axios.interceptors.response.use((response) => {
  let res = response.data
  return res
})

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
