// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'

import DomainConfig from './common/Domain'
// import Home from './components/HelloFromVux'

Vue.use(DomainConfig)

// Request.get('api/games/ssc/bet')

// const routes = [{
//   path: '/',
//   component: Home
// }]

// const router = new VueRouter({
//   routes
// })

//入口域名

FastClick.attach(document.body)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  console.log(window.location.href)
  console.log(to.name)
  let token = window.localStorage.getItem('token')
  if(!token){
    localStorage.setItem('token','123')
  }

  if (to.name == 'Token') {
    next()
    return
  }
  if (token) {
    console.log('token存在')
    next()
    return
  } else {
    console.log('token不存在')
    //token如果不存,跳转到授权页面
    if (DomainConfig.config.main) {
      window.location.href = DomainConfig.config.main
    }
    return
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
