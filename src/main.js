// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App'

import store from './store'
import router from './router'

// Init store
store.dispatch('console/init')

// Sync store with router
sync(store, router);

Vue.config.productionTip = false

// Use vue portal
import PortalVue from 'portal-vue'

Vue.use(PortalVue);

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
