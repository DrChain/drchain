import Vue from 'vue'
import Router from 'vue-router'
import Element from 'element-ui'

import NotFoundPage from 'pages/NotFoundPage'
import HomePage from 'pages/HomePage'

Vue.use(Router)
Vue.use(Element)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      name: '404',
      path: '/404',
      component: NotFoundPage
    },
    {
      path: '*',
      redirect: '404'
    }
  ]
})
