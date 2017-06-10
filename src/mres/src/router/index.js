import Vue from 'vue'
import Router from 'vue-router'
import Element from 'element-ui'

import NotFoundPage from 'pages/NotFoundPage'
import HomePage from 'pages/HomePage'
import ScanPage from 'pages/ScanPage'

import VueQRCodeComponent from 'vue-qrcode-component'

Vue.component('qr-code', VueQRCodeComponent)

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
      path: '/scan',
      name: 'ScanPage',
      component: ScanPage
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
