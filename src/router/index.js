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

const originalTitle = document.title

router.beforeEach((to, from, next) => {
  const routeWithTitle = to.matched.find((record) => record.meta.title)
  document.title = (routeWithTitle ? routeWithTitle.meta.title + ' | ' : '') + originalTitle
  next()
})

export default router
