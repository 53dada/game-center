<template>
  <div class="content">

    <img width="100%" src="../assets/rank_bg.jpg" />
    <div class="list">

      <div class="rank-list">
        <div v-for="(item, index) in items">
          <label>{{index+1+'.'}}</label>
          <label style="margin-left:10px;flex:1;">{{item.name}}</label>
          <img v-if="index==0" style="margin-right:20px; width:22px;" src="../assets/first.png">
          <img v-if="index==1" style="margin-right:20px; width:22px;" src="../assets/second.png">
          <img v-if="index==2" style="margin-right:20px; width:22px;" src="../assets/third.png">
          <div class="value-layout">
            <label>{{item.value}}</label>
            <img src="../assets/rank-value.png" />
          </div>
          
        </div>

      </div>

      <label>1)玩家排行榜是根据玩家通过支付宝和QQ充值的数量进行排名的.</label>

      <label>2)排名于每天晚上12点截止，统计每天排名前10名 玩家可联系客服领取奖励，奖励按当天排名宝豆数的百分 比进去奖励。
      </label>

      <div class="rank-notice">
        <div class="rank-notice-item">
          <label>排名</label>
          <label>奖励</label>
        </div>
        <div class="rank-notice-item">
          <label>第一名</label>
          <label>10%</label>
        </div>
        <div class="rank-notice-item">
          <label>第二名</label>
          <label>5%</label>
        </div>
        <div class="rank-notice-item">
          <label>第三名</label>
          <label>3%</label>
        </div>
        <div class="rank-notice-item">
          <label>第四～第十</label>
          <label>1%</label>
        </div>

      </div>

      <label>3)本活动最终解释权归周舜团队所有。</label>
    </div>
  </div>
</template>



<script>
export default {

  data() {
    return {
      items: [
        { name: 'dsds', value: 10000.00 },
        { name: 'guik', value: 100.00 },
        { name: 'dxxg', value: 20.00 },
        { name: 'Food', value: 2 },
        { name: 'zzas', value: 2 },
        { name: 'Flkkoo', value: 2 },
        { name: 'ffjio', value: 2 },
        { name: 'ggrrrg', value: 2 },
        { name: 'grgr', value: 2 },
        { name: 'grgrg', value: 2 },

      ]
    }
  }
}
</script>


<style>
.content {}

.list {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 200px;
}

.list>label {
  font-size: 15px;
  color: #ffffff;
  margin-top: 20px;
  text-align: left;
  width: 80%;
}

.rank-list {
  box-shadow: 5px 5px 30px #888888;
  opacity: 0.9;
  background: #FFFFFF;
  border-radius: 15px;
  width: 80%;
  display: inline-flex;
  flex-direction: column;
  padding: 15px;
}

.rank-list>div {
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 0.5px #d8d8d8 solid;
}

.rank-list>div>label {
  font-size: 16px;
  color: #000000;
}

.value-layout {
  background-image: linear-gradient(-135deg, #FAD961 0%, #F76B1C 100%);
  border-radius: 8px;
  height: 25px;
  padding-left: 10px;
  padding-right: 10px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
}

.value-layout>label {
  font-size: 13px;
  color: #ffffff;
}

.value-layout>img {
  width: 12.5px;
  height: 10px;
  margin-left: 5px;
}

.rank-notice {
  border: 4px solid rgba(255, 255, 255, 0.90);
  margin-top: 20px;
  border-radius: 15px;
  width: 85%;
  flex-direction: column;
  display: flex;
  box-shadow: 5px 5px 30px #888888;
}

.rank-notice-item {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  text-align: center;
  align-items: center;
  height: 40px;
}

.rank-notice-item label {
  font-size: 14px;
  color: #ffffff;
  flex: 1;
}
</style>
