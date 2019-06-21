import Vue from 'vue'
import Vuex from 'vuex'
import note from './modules/note'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    note
  },
})

export default store
