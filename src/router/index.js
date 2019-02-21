import Vue from 'vue'
import VueRouter from 'vue-router'
import moment from 'moment'

import routes from './routes'

Vue.use(VueRouter)

Vue.filter('time', function (time) {
  if (!time) return ''
  return moment.utc(time.asMilliseconds()).format('HH:mm:ss')
})

Vue.filter('date', function (time) {
  if (!time) return ''
  return moment.utc(new Date(time)).format('DD/MM/YY')
})

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
