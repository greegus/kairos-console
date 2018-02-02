import Vue from 'vue'
import Vuex from 'vuex'

import console from './console'

const { env } = require('process')

Vue.use(Vuex);

const store = new Vuex.Store({
  // "Do not enable strict mode when deploying for production!"
  // https://vuex.vuejs.org/en/strict.html
  strict: env.NODE_ENV !== 'production',

  actions: {
    init() {}
  },

  getters: {},

  modules: {
    console
  }
});

export default store;
