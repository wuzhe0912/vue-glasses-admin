import login from '@/views/login'
import home from '@/views/home'

export const routes = [
  {
    path: '/',
    name: 'login',
    component: login,
    meta: {}
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: { requireAuth: true }
  },
  { path: '*', redirect: { name: 'login' } }
]
