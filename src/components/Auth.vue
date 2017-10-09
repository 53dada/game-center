<template>
  <div class="content">
    <div v-transfer-dom>
      <loading :show="true" text="自动授权登录中..."></loading>
    </div>
  </div>
</template>


<script>
import { Loading, TransferDomDirective as TransferDom } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    Loading
  },
  mounted() {

    // //存在token 直接跳过认证
    // if (window.localStorage.getItem('token')) {
    //   this.$router.replace({
    //     path: '/home'
    //   });
    //   return;
    // }

    // //获取code 微信授权验证码
    // let codeQuery = this.$route.query.code
    // //重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
    // let stateQuery = this.$route.query.state
    // let params = { code: codeQuery, state: stateQuery }
    // let paramsArray = [];
    // //拼接参数  
    // Object.keys(params).forEach(key => {
    //   if (params[key]) {
    //     paramsArray.push(key + '=' + params[key])
    //   }
    // })

    // console.log('api/auth/wx?' + paramsArray.join('&'))

    // //进行授权
    // fetch('api/auth/wx?' + paramsArray.join('&'), { method: 'GET' })
    //   .then((response) => response.json())
    //   .then((jsonData) => {
    //     if (jsonData.code == 0) {
    //       console.log(jsonData.data)
    //       //存储token

    //       window.location.href = 'http://'+jsonData.data.domain+'/token?token='+jsonData.data.token
    //       // window.localStorage.setItem("token", jsonData.data.token);
    //       // this.$router.replace({
    //       //   path: '/home'
    //       // });
    //     } else {
    //       console.log(jsonData.msg)
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   });
  }
}
</script>

<style>
.weui-toast__content {
  color: #ffffff;
}
</style>

