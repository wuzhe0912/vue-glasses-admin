import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {}
  },
  mutations: {
    SET_USER_INFO (state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    getUserStatus ({ commit }) {
      return new Promise((resolve, reject) => {
        let api = `${axios.defaults.baseURL}/api/user/check`
        axios.post(api).then((res) => {
          commit('SET_USER_INFO', {
            status: res.success
          })
          return resolve()
        }).catch((err) => {
          console.log(err)
          return reject(err)
        })
      })
    }
  }
  // modules: {
  // }
})
