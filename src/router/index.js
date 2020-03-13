import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './map'
import axios from 'axios'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 需驗證的頁面，取檢查用戶狀態 API 比對
    let api = `${axios.defaults.baseURL}/api/user/check`
    axios.post(api).then((res) => {
      // 若用戶已成功登入，則正常進入下一頁
      if (res.success) {
        next()
      } else {
        // 反之，回到登入頁面
        next({ path: '/' })
      }
    }).catch((err) => {
      console.log(err)
    })
  } else {
    // 不需要驗證的頁面
    next()
  }
})

export default router
