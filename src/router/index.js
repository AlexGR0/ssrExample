import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '@/components/Index'
import Detail from '@/components/Detail'
import About from '@/components/About'
import Login from '@/components/Login'

Vue.use(VueRouter)

export const constRoutes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/detail',
    name: 'Detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Detail
  }
]
export const asyncRoutes = [{
  path: '/about',
  name: 'Detail',
  component: About,
  meta: {
    roles: ["admin", "editor"]
  }
}]

export default new VueRouter({
  mode: 'history',
  routes: constRoutes
})