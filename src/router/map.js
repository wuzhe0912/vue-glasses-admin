import login from '@/views/login'
import home from '@/views/home'
import homeContainer from '@/views/home-container'
import products from '@/views/products'
import orders from '@/views/orders'

export const routes = [
  {
    path: '/',
    name: 'login',
    component: login,
    meta: {}
  },
  {
    path: '/home',
    component: home,
    meta: { requireAuth: true },
    children: [
      { path: '', component: homeContainer },
      { path: '/home-container', name: 'home-container', component: homeContainer },
      { path: '/products', name: 'products', component: products },
      { path: '/orders', name: 'orders', component: orders }
    ]
  },
  { path: '*', redirect: { name: 'login' } }
]
