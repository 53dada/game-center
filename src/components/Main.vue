<template>
  <div class="main-root">
    <transition>
    <router-view class="main-content"></router-view>
    </transition>

    <tabbar class="main-tabbar" @on-index-change="onIndexChange">
      <tabbar-item selected :link="{path:'/home',replace:true}">
        <img slot="icon" src="../assets/tabbar-home-normal.png">
        <img slot="icon-active" src="../assets/tabbar-home-active.png">
        <span v-bind:class="[index==0 ? activeClass : normalClass]" slot="label">游戏中心</span>
      </tabbar-item>

      <tabbar-item :link="{path:'/rank',replace:true}">
        <img slot="icon" src="../assets/tabbar-rank-normal.png">
        <img slot="icon-active" src="../assets/tabbar-rank-active.png">
        <span v-bind:class="[index==1 ? activeClass : normalClass]" slot="label">排行榜</span>
      </tabbar-item>

      <tabbar-item :link="{path:'/agent',replace:true}">
        <img slot="icon" src="../assets/tabbar-agent-normal.png">
        <img slot="icon-active" src="../assets/tabbar-agent-active.png">
        <span v-bind:class="[index==2 ? activeClass : normalClass]" slot="label">推广</span>
      </tabbar-item>

      <tabbar-item :link="{path:'/user',replace:true}">
        <img slot="icon" src="../assets/tabbar-user-normal.png">
        <img slot="icon-active" src="../assets/tabbar-user-active.png">
        <span v-bind:class="[index==3 ? activeClass : normalClass]" slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
  components: {
    TabbarItem,
    Tabbar
  },
  data() {
    return {
      index: 0,
      activeClass: 'tab-active',
      normalClass: 'tab-normal'
    }
  }
  , methods: {
    onIndexChange(newIndex, oldIndex) {
      this.index = newIndex;
    }
  }
}
</script>

<style lang="less" scoped>

.tab-active {
  color: #FEC710;
}

.tab-normal {
  color: #9AA5C1;
}

.weui-tabbar {
  background-color: #1c1c20;
}

.main-root {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.main-content {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding-bottom:1rem;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  position: absolute;
}
</style>
