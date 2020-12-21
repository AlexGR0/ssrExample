import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '@/components/index'
import Detail from '@/components/detail'

Vue.use(VueRouter)

const routes = [{
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

export default function createRouter() {
  return new VueRouter({
    mode: 'history',
    routes
  })
}