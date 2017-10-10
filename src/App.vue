<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './assets/css/rem.less';
html,
body {
  background-color: #f8f8f8;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}
</style>
