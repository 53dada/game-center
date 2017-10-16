// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'

import DomainConfig from './common/Domain'

Vue.use(DomainConfig)

//入口域名

// mock需要在axios实例初始化之前
// if (process.env.NODE_ENV === 'development') {
//   console.log('sdfadfasdfasdfs')
//   require('./mock');
// }
// import ins from './common/Request'

// ins.get('/fuck').then((res,rej)=>console.log(res,rej))

Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份 
    "d+": this.getDate(),                    //日 
    "h+": this.getHours(),                   //小时 
    "m+": this.getMinutes(),                 //分 
    "s+": this.getSeconds(),                 //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}


FastClick.attach(document.body)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem('token')
  token='eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTYWx0ZWRGaXNoSldUIiwianRpIjoiU2FsdGVkRmlzaEpXVCIsImlhdCI6MTUwODE2MDcwMiwic3ViIjoie1wiYWdlbnRJZFwiOjEsXCJvcGVuSWRcIjpcInRlc3RvcGVuaWQ6MVwiLFwiYWRtaW5cIjpmYWxzZSxcImlkXCI6MX0iLCJleHAiOjE1MDg1MjA3MDJ9.YWAWXoei6eTz9TAMRhB-9Ip8OVtwekX3CmBS7OrPRTI'
  window.localStorage.setItem('token',token);
  // token= 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTYWx0ZWRGaXNoSldUIiwianRpIjoiU2FsdGVkRmlzaEpXVCIsImlhdCI6MTUwODEzNTI1OSwic3ViIjoie1wib3BlbklkXCI6XCJ0ZXN0b3BlbmlkOjFcIixcImFkbWluXCI6ZmFsc2UsXCJpZFwiOjF9IiwiZXhwIjoxNTA4NDk1MjU5fQ.lHYKU4EuGXpk-O3QdQAt7ptwNqjb7_yZc8l9CwouTEo'
  if (!token) {
    localStorage.setItem('token', '123')
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
