import { createRouter, createWebHashHistory } from 'vue-router'

const NavBarLayout = () => import('@/layouts/NavBarLayout.vue')
const Bill = () => import('@/views/Bill/index.vue')
const Statistics = () => import('@/views/Statistics/index.vue')
const Mine = () => import('@/views/Mine/index.vue')
const Login = () => import('@/views/Login/index.vue')

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/tab/bill',
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/tab',
      component: NavBarLayout,
      children: [
        {
          path: '/tab/bill',
          component: Bill
        },
        {
          path: '/tab/statistics',
          component: Statistics
        },
        {
          path: '/tab/mine',
          component: Mine
        },
      ]
    }
  ]
})

export default router