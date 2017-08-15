// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import axios from 'axios'
import './common/style/detailpage.styl'
import 'element-ui/lib/theme-default/index.css'
import './common/style/reset.css'
import './common/style/public.css'
import routes from './router/routes.js'
import Vuex from 'vuex'
import store from './vuex/store.js'
import api from './api/request.js'
import $util from './common/js/util.js'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.prototype.$axios = axios
Vue.prototype.$api = api
Vue.prototype.$util = $util
Vue.config.productionTip = false

/* eslint-disable no-new */

let router = new VueRouter({
  mode: 'history',
  routes
})

let vue = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})

vue.$mount('#app')

router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('token')
  if (to.meta.authoritys) {
    let authorityList = vue.$store.state.Authoritys
    let Url = to.path.substr(1, to.path.length)
    for (var i = 0; i < authorityList.length; i++) {
      if (authorityList[i].url == Url && authorityList[i].authority == 0) {
        next({ path: '/' })
      }
    }
  }
  if (token && to.path === '/') {
    next(false)
  } else {
    if (!token && to.path !== '/') {
      next({
        path: '/'
      })
    } else {
      // 对询价单修改为保存处理
      if (store.state.isSaveEnquirySheetDetail) {
        vue.$confirm('你的修改未保存, 是否继续?', '提示', {
          confirmButtonText: '继续',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           next()
           store.commit('isSaveEnquirySheetDetailFun', { isSave: false })
        }).catch(() => {
           store.state.adminleftnavnum = '/EnquirySheet/enquirySheet'
           next(false)
        })
        return
      }
      next()
    }
  }
})
