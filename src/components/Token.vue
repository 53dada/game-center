<template>
  <div class="content">
    123123123
  </div>
</template>

<script>
import DomainConfig from '../common/Domain'
export default {
  mounted() {
    let token = this.$route.query.token
    if (token) {
      window.localStorage.setItem("token", token);
      this.$router.replace({
        path: '/home'
      });
      console.log('token is ' + token)
    } else {
      console.log('token is ' + token)
      let ltoken = window.localStorage.getItem('token')
      if (ltoken) {
        this.$router.replace({
          path: '/home'
        });
      } else {
        window.location.href = DomainConfig.config.main
      }
    }
  }
}
</script>
