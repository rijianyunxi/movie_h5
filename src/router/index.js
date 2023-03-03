import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/more',
    name: 'more',
    component: () => import('@/views/More.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/Detail.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
