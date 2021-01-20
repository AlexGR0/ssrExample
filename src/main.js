import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './icons/index'
import './promission'
import promission from './directive/promission'

Vue.directive("promission",promission)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
