import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const NavBarLayout = defineAsyncComponent(() => import('@/layouts/NavBarLayout.vue'))
const Bill = defineAsyncComponent(() => import('@/views/Bill/index.vue'))
const Statistics = defineAsyncComponent(() => import('@/views/Statistics/index.vue'))
const Mine = defineAsyncComponent(() => import('@/views/Mine/index.vue'))


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/tab/bill',
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