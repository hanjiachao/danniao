import Vue from 'vue'
import Vuex from 'vuex'
import means from '@/libs/means'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: means.getToken(),
    userinfo: {},
    severTel: '',
    nextPath: ''
  },
  mutations: {
    setAccessToken (state, token) {
      state.accessToken = token === null ? null : token.access_token
      means.setToken(token)
    },
    setUserinfo (state, userinfo) {
      state.userinfo = userinfo
    },
    setSeverTel (state, severTel) {
      state.severTel = severTel
    },
    setLoadingFlag (state, LoadingFlag) {
      state.LoadingFlag = LoadingFlag
    },
    setNextPath (state, path) {
      state.nextPath = path
    }
  },
  actions: {
  },
  modules: {
  }
})
