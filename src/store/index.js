import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './Gvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state, num = 1) {
      state.count += num
    },
  },
  actions: {
    asyncAdd({commit}) {
      return new Promise((res) => {
        setTimeout(() => {
          commit("add")
          res({ok: 1})
        }, 2000)
      })
    }
  },
  getters: {
    score(state) {
      return "score:" + state.count
    }
  }
})