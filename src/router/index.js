import Vue from 'vue'
import Router from 'vue-router'

import routes from './routes'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters['console/isAuth']) {
      next()
    } else {
      next({name: 'login'})
    }
  } else {
    next()
  }
})

export default router
