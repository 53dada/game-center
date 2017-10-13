<template>
    <div class="zp-content">
        <!-- 用户信息 -->
        <div class="zp-header">
          <span class="online">在线{{online}}人</span>
          <span class="user-money" @click="showMoney=true">&yen;{{balance}}</span>
          <span class="user-record" @click="listRecord"></span>
        </div>
        <div class="zp-poll">
          <p>奖金池:{{poolsize}}</p>
        </div>
        <!-- 转盘部分 -->
        <div class="zhuanpan-root">
            <div id='btn-change' class="change">
                <div v-bind:class="{'zp-change-active':changeIndex == 1 ,'zp-change-normal':changeIndex != 1 }" v-on:click="changgeZhuanpan(1)">
                    <label>小盘</label>
                </div>
                <div id="tt" v-bind:class="{'zp-change-active':changeIndex == 2 ,'zp-change-normal':changeIndex != 2 }" v-on:click="changgeZhuanpan(2)">
                    <label>中盘</label>
                </div>
                <div v-bind:class="{'zp-change-active':changeIndex == 3 ,'zp-change-normal':changeIndex != 3 }" v-on:click="changgeZhuanpan(3)">
                    <label>大盘</label>
                </div>
            </div>
            <div id="zhuanpan" class="zhuanpan">
                <div class="zp-wrapper" :class="{zhong:changeIndex == 2,da:changeIndex == 3}">
                  <div class="btn" @click="start"></div>
                  <template v-if="changeIndex==1">
                    <div class="ball ball1">
                      <p>{{ (xiao[0].value * values[valueIndex-1]/2).toFixed(1)}}</p>
                      <p>金币</p>
                    </div>
                    <div class="ball ball2">
                      <p>{{ (xiao[1].value * values[valueIndex-1]/2).toFixed(1)}}</p>
                      <p>金币</p>
                    </div>
                  </template>
                  <template v-if="changeIndex==2">
                    <div class="ball ball3">
                      <p>{{ (zhong[1].value * values[valueIndex-1]/2).toFixed(1)}}</p>
                      <p>金币</p>
                    </div>
                    <div class="ball ball4">
                      <p>{{ (zhong[2].value * values[valueIndex-1]/2).toFixed(1)}}</p>
                      <p>金币</p>
                    </div>
                    <div class="ball ball5">
                      <p>{{ (zhong[3].value * values[valueIndex-1]/2).toFixed(1)}}</p>
                      <p>金币</p>
                    </div>
                    <div class="ball ball6">
                      <p>{{ (zhong[0].value * values[valueIndex-1]/2).toFixed(1)}}</p>
                      <p>金币</p>
                    </div>
                  </template>
                  <template v-if="changeIndex==3">
                    <div class="ball" v-for="(d,index) in deg"  :style="{transform:getXY(d)}" :key="d">
                      <p>{{ (da[index].value * values[valueIndex-1]/2).toFixed(1)}}</p>
                      <p>金币</p>
                    </div>
                  </template>
                </div>
            </div>
            <swiper  auto height="30px" direction="vertical" :interval=2000 class="laba text-scroll" :show-dots="false">
              <swiper-item v-for="msg in fakeAwards" :key="msg"><p>{{msg}}</p></swiper-item>
            </swiper>

            <div class="value-root">
                <div v-bind:class="{'zp-value-active':valueIndex == 1 ,'zp-value-normal':valueIndex != 1 }" v-on:click="changeValue(1)">
                    <label>2金币</label>
                </div>
                <div v-bind:class="{'zp-value-active':valueIndex == 2 ,'zp-value-normal':valueIndex != 2 }" v-on:click="changeValue(2)">
                    <label>5金币</label>
                </div>
                <div v-bind:class="{'zp-value-active':valueIndex == 3 ,'zp-value-normal':valueIndex != 3 }" v-on:click="changeValue(3)">
                    <label>10金币</label>
                </div>
            </div>
            <div class="value-root">
                <div v-bind:class="{'zp-value-active':valueIndex == 4 ,'zp-value-normal':valueIndex != 4 }" v-on:click="changeValue(4)">
                    <label>20金币</label>
                </div>
                <div v-bind:class="{'zp-value-active':valueIndex == 5 ,'zp-value-normal':valueIndex != 5 }" v-on:click="changeValue(5)">
                    <label>50金币</label>
                </div>
                <div v-bind:class="{'zp-value-active':valueIndex == 6 ,'zp-value-normal':valueIndex != 6 }" v-on:click="changeValue(6)">
                    <label>100金币</label>
                </div>
            </div>
        </div>


        <div v-transfer-dom>
          <x-dialog v-model="showMoney" class="dialog-demo">
            <div class="img-box cz">
                <h3>选择充值金额</h3>
                <cell title="充值10元" link="/component/radio"></cell>
                <cell title="充值20元" link="/component/radio"></cell>
                <cell title="充值20元" link="/component/radio"></cell>
            </div>
            <div @click="showMoney=false">
              <span class="vux-close"></span>
            </div>
          </x-dialog>
        </div>
        <div v-transfer-dom>
          <popup v-model="showRecord" position="bottom">
            <group>
               <cell-form-preview :list="list" v-for="(list,index) in kvLists" :key="index"></cell-form-preview>
            </group>
            <div style="padding: 15px;">
              <x-button @click.native="showRecord = false" plain type="primary"> 关闭 </x-button>
            </div>
          </popup>
        </div>
        <div v-transfer-dom>
          <x-dialog v-model="showZhongjiang" class="dialog-demo">
            <div class="img-box zj">
              <img src="../assets/zhuanpan/zhongjiang.jpg" style="max-width:100%">
              <p>获得{{jiangjin}}奖金</p>
            </div>
            <div @click="showZhongjiang=false">
              <span class="vux-close"></span>
            </div>
          </x-dialog>
        </div>
    </div>
</template>


<script>
import { XDialog,Group,Popup,Cell,XButton,Swiper,SwiperItem, TransferDomDirective as TransferDom ,CellFormPreview} from 'vux'
import api from '../common/Request'

let deg = []
for(let i=0;i<12;i++){
  deg.push(-75+i*30)
}

function genName(){
  let str = []
  let s = '0123456789asdfghjklopiuytrewqzxcvbnm'
  for(let i=0;i<5;i++){
    let idx = parseInt(35*Math.random());  
    str.push(s[idx])
  }
  let name = str.join('')
  str = null
  return name
}
export default {
    directives: {
      TransferDom
    },
    components: {
      XDialog,
      Group,
      Popup,
      Cell,
      XButton,
      CellFormPreview,
      Swiper,
      SwiperItem
    },
    data() {
        return {
            online:10025,
            poolsize:0,
            jiangjin:0,
            showZhongjiang:false,
            fakeAwards:[],
            lock:false,
            deg,
            balance:0,
            kvLists:[],
            showMoney:false,
            showRecord:false,
            //大小中盘切换
            changeIndex: 1,
            //下注金额
            valueIndex: 1,
            values: [2, 5, 10, 20, 50, 100],
            //小中大盘基础数据
            xiao: [{ value: 0.2 }, { value: 3.8 }],
            zhong: [{ value: 4.2 }, { value: 0.2 }, { value: 7.2 }, { value: 1 }],
            da: [{ value: 20 }, { value: 10 }, { value: 12 }, { value: 0.4 }, { value: 0.6 }, { value: 0.1 }
                , { value: 0.2 }, { value: 4 }, { value: 6 }, { value: 1 }, { value: 2.2 }, { value: 16 }],
        }
    },
    methods: {
        genFakeAward(){
          let name = genName();
          let ri = parseInt(Math.random()*3)
          let pan = ['小','中','大'][ri];
          let amount
          switch (ri) {
            case 0:
              amount = this.xiao[parseInt(Math.random()*2)].value
              break;
            case 1:
              amount = this.zhong[parseInt(Math.random()*4)].value
              break
            default:
              amount = this.da[parseInt(Math.random()*12)].value
              break;
          }
          return `${name}在${pan}盘赢得${amount}金币`
        },
        getXY(deg){
          let x = 1.8*Math.cos(deg/180*3.14),y = 1.8*Math.sin(deg/180*3.14);
          return `translate(${x}rem,${y}rem) rotate(${90+deg}deg)`
        },
        async start() {
          //console.log($('.btn'),$)
          if(this.lock){
            return;
          }
          let postValue = this.values[this.valueIndex - 1]
          let betType = this.changeIndex-1;
          $('.btn').css('transform','rotate(0)')
          let res = await api.bet(postValue,betType);
          let index,animateTo=0;
          if(res.data){
            index = res.data.index
            this.jiangjin = res.data.value
          }
          if(this.changeIndex==1){
             animateTo = 90+index*180
          }
          if(this.changeIndex==2){
             animateTo = -45+index*90
          }
          if(this.changeIndex==3){
             //to = deg //[45,135,225,315,]
             console.log(index)
             animateTo = 15+index*30
          }
          let self = this
          this.lock = true
            $('.btn').rotate({
                angle: 0,
                animateTo: animateTo+360*10,
                duration: 8000,
                center:['50%','1.14rem'],
                callback: function() {
                    self.lock = false
                    self.showZhongjiang = true
                }
            })
        },
        changeValue(index) {
          if(this.lock) return;
            this.valueIndex = index
            this.changgeZhuanpan(this.changeIndex)
        },
        changgeZhuanpan(type) {
          if(this.lock) return;
          this.changeIndex = type
        },
        async betRecord(){
          let res = await api.getRecord()
          let rawList = res.data.list
          let kvLists = []
          rawList.forEach((record,i)=>{
            let cellList = []
            Object.keys(record).forEach(key=>{
              console.log(record,key)
              const result= this.translateList(record,key)
              if(result.key==-1 && result.value==-1)return
              cellList.push({
                label: result.key,
                value: result.value
              })
            })
            kvLists.push(cellList)
          });
          this.kvLists = kvLists
        },
        listRecord(){
          if(this.showRecord) return;
          this.betRecord()
          this.showRecord = true
        },
        translateList(record,key){
          if(key=='betType'){
            let value
            if(record[key]==0){
              value = '小盘'
            }
            if(record[key]==1){
              value = '中盘'
            }
            if(record[key]==2){
              value = '大盘'
            }
            return {
              key:'下注类型',
              value
            }
          }
          if(key=='createTime'){
            return {
              key:'下注时间',
              value:(new Date(record[key])).format("yyyy-MM-dd hh:mm:ss")
            }
          }
          if(key=='currentBalance'){
            return {
              key:'下注后的当前余额',
              value:record[key]
            }
          }
          if(key=='gameType'){
            return {
              key:'游戏类型',
              value: record[key] == 2? '转盘游戏':'其他'
            }
          }
          if(key=="value"){
            return {
              key:'下注金额',
              value: record[key]
            }
          }
          if(key=='amount'){
            return {
              key:'中奖金额',
              value: record[key]
            }
          }
          return {
            key:-1,
            value:-1
          }
        },
        async getUserBalance(){
          let res = await api.getBalance()
          this.balance = res.data
        },
        async getPool(){
          let res = await api.zhuanpanPool()
          this.poolsize = res.data
        }
    },
    created(){
      this.getUserBalance();
      this.getPool()
      let tmp = []
      for(let i=0;i<10;i++){
        tmp.push(this.genFakeAward())
      }
      this.fakeAwards = tmp;
      this.online = this.online + parseInt(10000*Math.random())
    },
    mounted() {
        this.$nextTick(() => {
        })
    }
}
</script>



<style lang="less">
@import '~vux/src/styles/close';
.change {
    display: flex;
    flex-direction: row;
    padding-top: .1rem;
}

.change>div {
    margin-left: 10px;
    margin-right: 10px;
    flex: 1;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-content: center;

    width:2.2rem;
    height: .54rem;
    box-sizing: border-box;
    line-height: .54rem;
}

.zp-change-active {
    background: url(../assets/zhuanpan/anniu1.png) center no-repeat;
}

.zp-change-normal {
    background: url(../assets/zhuanpan/anniu2.png) center no-repeat;
}

.change>div>label {
    color: #ffffff;
    font-size: 14px;
//    line-height: 2.3rem;
}


.zp-content {
    background: url(../assets/zhuanpan/1zp-root-bg.jpg) center no-repeat;

    background-size: 100% 100%;

}

.zhuanpan-root {
   height: 100vh;
}

.value-root {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    // padding-left: 10px;
    // padding-right: 10px;
    justify-content: space-around;
}

.value-root>div {
    // margin-left: 15px;
    // margin-right: 15px;
    // flex: 1;
    width:1.96rem;
    height: .58rem;
    // margin-right: .42rem;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-content: center;
}

.zp-value-active {
    color: #ffffff;
    background: url(../assets/zhuanpan/zhu1.png) center no-repeat;

}

.zp-value-normal {
    color: #ff3d32;
    background: url(../assets/zhuanpan/zhu2.png) center no-repeat;
}

.value-root>div>label {

    font-size: 15px;
}
.zp-header{
  display: flex;
  height: .9rem;
  background-color: #004272;
  align-items: center;
  span{
    height: .6rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    box-sizing: border-box;
    color:#fff;
    padding-top: .1rem;
    font-size: 14px;
  }
  .online{
    width:2.66rem;
    background-image: url(../assets/zhuanpan/1zp-online.png);
    margin-left: .22rem;
    padding-left: .72rem;
    
  }
  .user-money{
    width:2.34rem;
    background-image: url(../assets/zhuanpan/1zp-pay.png);
    margin-left: .9rem;
    padding-left: .1rem;
  }
  .user-record{
    width:.64rem;
    background-image: url(../assets/zhuanpan/1zp-record.png);
    margin-left: .45rem;
  }
}

.zp-poll{
  text-align: center;
  background: url(../assets/zhuanpan/zp-cash-pool.png) center no-repeat;
  background-size: contain;
  height: 1.4rem;
  p{
    color:#fff;
    font-size: 20px;
    height: 100%;
    line-height: 1.4rem;
  }
}
.zhuanpan{

  // margin: 0 auto;
  position: relative;
  height: 7.6rem;
  overflow: hidden;
  box-sizing: border-box;
  // padding-top: .16rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(../assets/zhuanpan/zp-border-bg.png)  center  no-repeat;
  background-size: contain;
  .pan{
      width: 80%;
      transform: translate(-50%,-50%);
      left: 50%;
      top: 44%;
  }
  #zp-start{
    width:20%;
    height:20%;

  }
  .zp-wrapper{
    position: relative;
    width:4.7rem;
    height: 4.7rem;
    background: url(../assets/zhuanpan/1xiao.png) no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
     align-items: center;
  }
  .zhong{
    background-image: url(../assets/zhuanpan/1zhong.png)
  }
  .da{
    background-image: url(../assets/zhuanpan/1da.png)
  }

  .btn{
    width:2rem;
    height: 2.14rem;
    background: url(../assets/zhuanpan/button.png) no-repeat;
    background-size: contain;
  }
  .ball{
    position: absolute;
    width:.8rem;
    height: .8rem;
    background: url(../assets/zhuanpan/yuan.png) no-repeat;
    background-size: contain;
    right:50;
    margin-right: -.4rem;
    top: 50%;
    margin-top: -.4rem;
    box-sizing: border-box;
    padding-top: .1rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    //transform: rotate(90deg);
    //transform-origin: -1.4rem .4rem;
    p{
      font-size:13px;
      text-align: center;
      //transform-origin: center;
      line-height: 1;
      //flex: 1
    }
  }
  .ball1{
    transform: rotate(90deg) translateY(-1.8rem);
  }
  .ball2{
    transform: rotate(-90deg) translateY(-1.8rem);
    // p{
    //   transform: rotate(90deg);
    // }
  }
  
  .ball3{
     transform: translate(1.273rem,-1.273rem) rotate(45deg);
  }
  .ball4{
    transform: translate(1.273rem,1.273rem) rotate(135deg);
  }
  .ball5{
    transform: translate(-1.273rem,1.273rem) rotate(225deg);
  }
  .ball6{
    transform: translate(-1.273rem,-1.273rem) rotate(315deg);
  }
}
.zhuanpan-item{
  // display: none;
}
.text-scroll{
  color:#fff
}
.laba{
    //position: absolute;
    // width: 4.9rem;
    height:.58rem;
    margin-left:auto;
    margin-right: auto;
    // bottom:.05rem;
    bottom:0;
    background: url(../assets/zhuanpan/zp-notice-bg.png) center no-repeat;
    background-size: contain;
}

.dialog-demo {
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: 350px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
.vux-swiper-item{
  //padding-left: 1rem
  text-align:center;
  line-height: .58rem;
}
.zj{
  position: relative;
  p{
    color: #fff;
    font-size: 20px;
    position: absolute;
    margin:auto;
    width:100%;
    text-align: center;
    z-index: 9000;
    bottom:30%;

  }
}
.cz{
  h3{
    height: .88rem;
    line-height: .88rem;
    font-weight: normal;
    text-align: center
  }
}
</style>
