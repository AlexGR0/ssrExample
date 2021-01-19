import Vue from 'vue'
import Vuex from 'vuex'
import promission from './promission'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    promission,
    user
  },
  getters: {
    roles: state=> state.user.roles
  }
})
