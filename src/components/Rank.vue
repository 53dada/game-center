<template>
  <div class="content">

    <!-- <img width="100%" src="../assets/rank_bg.jpg" /> -->

    <div class="button-tab">
      <button-tab v-model="tabIndex">
        <button-tab-item @on-item-click="changeIndex()" selected>充值排行榜</button-tab-item>
        <button-tab-item @on-item-click="changeIndex()">盈利排行榜</button-tab-item>
      </button-tab>
    </div>
    <div class="list">
      <div v-show="tabIndex==0" class="rank-list">
        <div v-for="(item, index) in items" :key="index">
          <label>{{'No.'+(index+1)}}</label>
          <label style="margin-left:10px;flex:1;">{{item.value.replace('uid:','数字id:')}}</label>
          <img v-if="index==0" style="margin-right:0.2rem; width:22px;" src="../assets/first.png">
          <img v-if="index==1" style="margin-right:0.2rem; width:22px;" src="../assets/second.png">
          <img v-if="index==2" style="margin-right:0.2rem; width:22px;" src="../assets/third.png">
          <div class="value-layout">
            <label>{{item.score.toFixed(2)}}</label>
            <img src="../assets/rank-value.png" />
          </div>
        </div>
      </div>

      <div v-show="tabIndex==1" class="rank-list">
        <div v-for="(item, index) in items1" :key="index">
          <label>{{'No.'+(index+1)}}</label>
          <label style="margin-left:10px;flex:1;">{{item.value.replace('uid:','')}}</label>
          <img v-if="index==0" style="margin-right:0.2rem; width:22px;" src="../assets/first.png">
          <img v-if="index==1" style="margin-right:0.2rem; width:22px;" src="../assets/second.png">
          <img v-if="index==2" style="margin-right:0.2rem; width:22px;" src="../assets/third.png">
          <div class="value-layout">
            <label>{{item.score.toFixed(2)}}</label>
            <img src="../assets/rank-value.png" />
          </div>
        </div>
      </div>

      <div class="rank-notice">
        <div class="rank-notice-item">
          <label>排名</label>
          <label>奖励</label>
        </div>
        <div class="rank-notice-item">
          <label>第一名</label>
          <label>{{ranks[0]}}</label>
        </div>
        <div class="rank-notice-item">
          <label>第二名</label>
          <label>{{ranks[1]}}</label>
        </div>
        <div class="rank-notice-item">
          <label>第三名</label>
          <label>{{ranks[2]}}</label>
        </div>
        <div class="rank-notice-item">
          <label>第四～第十</label>
          <label>{{ranks[3]}}</label>
        </div>

      </div>

      <label>{{infos[0]}}</label>

      <label>{{infos[1]}}
      </label>

      <label>{{infos[2]}}
      </label>

      <label>{{infos[3]}}</label>
    </div>
  </div>
</template>



<script>
import { ButtonTab, ButtonTabItem } from 'vux'
import api from '../common/Request'
export default {
  components: {
    ButtonTab,
    ButtonTabItem
  },
  data() {
    return {
      tabIndex: 0,
      items: [],
      items1: [],
      infos: [],
      ranks: [],
    }
  },
  methods: {
    async getRankWinData() {
      let data = await api.getRankWin()
      this.items1 = data.data
    },
    async getRankPayData() {
      let data = await api.getRankPay()
      this.items = data.data
    },
    changeIndex() {
      if (this.tabIndex == 0) {
        this.getRankPayData()
        this.infos = ['1)玩家排行榜是根据玩家充值的数量进行排名的。'
          , '2)排名于每天晚上12点截止，统计每天排名前10名 玩家可联系客服领取奖励，奖励按当天排名充值数的百分比进行奖励。'
          , '3)当日游戏流水需占充值金额的10%。'
          , '3)本活动最终解释权归永达娱乐团队所有。']

        this.ranks = ['%5'
          , '%3'
          , '%1.5'
          , '%1']
      } else {
        this.getRankWinData()
        this.infos = ['1)1玩家排行榜是根据玩家充值的数量进行排名的。'
          , '2)排名于每天晚上12点截止，统计每天排名前10名 玩家可联系客服领取奖励，奖励按当天排名充值数的百分比进行奖励。'
          , '3)当日游戏流水需占充值金额的10%。'
          , '3)本活动最终解释权归永达娱乐团队所有。']
        this.ranks = ['%15'
          , '%3'
          , '%1.5'
          , '%1']
      }
    }
  },
  created() {
    this.getRankPayData()
    this.infos = ['1)玩家排行榜是根据玩家充值的数量进行排名的。'
      , '2)排名于每天晚上12点截止，统计每天排名前10名 玩家可联系客服领取奖励，奖励按当天排名充值数的百分比进行奖励。'
      , '3)当日游戏流水需占充值金额的10%。'
      , '3)本活动最终解释权归永达娱乐团队所有。']
    this.ranks = ['%5'
      , '%3'
      , '%1.5'
      , '%1']
  }
}
</script>


<style >
.button-tab {
  margin-top: 3rem;
  padding-left: 18%;
  padding-right: 18%;
}

.list {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 0.5rem;
  /* padding-bottom:1.8rem; */
}

.list>label {
  font-size: 0.25rem;
  color: #ffffff;
  margin-top: 0.1rem;
  text-align: left;
  width: 80%;
}

.rank-list {
  box-shadow: 5px 5px 20px #888888;
  opacity: 0.9;
  background: #FFFFFF;
  border-radius: 0.15rem;
  width: 80%;
  display: inline-flex;
  flex-direction: column;
  padding: 0.15rem;
}

.rank-list>div {
  height: 0.9rem;
  display: flex;
  align-items: center;
  border-bottom: 0.005rem #d8d8d8 solid;
}

.rank-list>div>label {
  font-size: 0.3rem;
  color: #000000;
}

.value-layout {
  background-image: linear-gradient(-135deg, #FAD961 0%, #F76B1C 100%);
  border-radius: 0.08rem;
  height: 0.45rem;
  padding-left: 0.1rem;
  padding-right: 0.1rem;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
}

.value-layout>label {
  font-size: 13px;
  color: #ffffff;
  min-width: 0.9rem;
  text-align: center;
  line-height: 0.5rem;
}

.value-layout>img {
  height: 0.2rem;
  margin-left: 0.05rem;
}

.rank-notice {
  border: 1px solid rgba(255, 255, 255, 0.90);
  margin-top: 0.4rem;
  border-radius: 0.15rem;
  width: 80%;
  padding: 0.15rem;
  flex-direction: column;
  display: flex;
  box-shadow: 5px 5px 20px #888888;
  margin-bottom: 0.4rem;
}

.rank-notice-item {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  text-align: center;
  align-items: center;
  height: 0.6rem;
}

.rank-notice-item label {
  font-size: 0.25rem;
  color: #ffffff;
  flex: 1;
}

.content {
  background-repeat: none;
  background-image: url(../assets/rank_bg.jpg);
  background-size: cover;
}


.vux-button-group>a.vux-button-group-current {
  color: #FFF !important;
  background: linear-gradient(-135deg, #FAD961 0%, #F76B1C 100%) !important;
}

.vux-button-group>a.vux-button-tab-item-first:after {
  border: 1px solid #F76B1C !important;
  color: #F76B1C !important;
}

.vux-button-group>a.vux-button-tab-item-last:after {
  border-right: 1px solid #F76B1C !important;
  border-top: 1px solid #F76B1C !important;
  border-bottom: 1px solid #F76B1C !important;
  border-left: none !important;
  color: #F76B1C !important;
}
</style>
