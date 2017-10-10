<template>
    <div class="zp-content">
        <!-- 用户信息 -->
        <!-- <div class="zp-user-info"></div> -->
        <div class="zp-header">
          <span class="online">在线10025人</span>
          <span class="user-money" @click="showMoney=true">&yen;125.00</span>
          <span class="user-record" @click="showRecord=true"></span>
        </div>
        <div class="zp-poll">
          <p>12345</p>
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
                  <div class="btn"></div>
                  <template v-if="changeIndex==1">
                    <div class="ball">
                    </div>
                    <div class="ball2">
                    </div>
                  </template>
                  
                  <!-- <img id="zhuanpan-bg" class="zhuanpan-img-bg" src="../assets/zhuanpan/zhuanpanbg1.png"> -->
                  <!-- <img class="zhuanpan-img-bg" src="../assets/zhuanpan/deng.gif"> -->
                  
                  <!-- <img v-if="changeIndex == 1" class="zhuanpan-img-bg pan" src="../assets/zhuanpan/zhuanpanxiaopanbg.png">
                  <img v-if="changeIndex == 2" class="zhuanpan-img-bg pan" src="../assets/zhuanpan/zhuanpanzhongpanbg.png">
                  <img v-if="changeIndex == 3" class="zhuanpan-img-bg pan" src="../assets/zhuanpan/zhuanpandapanbg.png"> -->
                  
                  <!-- <img class="zhuanpan-img-bg" src="../assets/zhuanpan/zhuanpancenter.png"> -->
                  
                  <!-- <img v-on:click="start()" id="zp-start" class="zhuanpan-img-bg" src="../assets/zhuanpan/button.png"> -->
                </div>
                <div class="laba"></div>
            </div>

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
            <div class="img-box">
              <!-- <img src="../assets/demo/dialog/01.jpg" style="max-width:100%"> -->
            </div>
            <div @click="showMoney=false">
              <span class="vux-close"></span>
            </div>
          </x-dialog>
        </div>
        <div v-transfer-dom>
          <popup v-model="showRecord" position="bottom">
            <group>
              <cell v-for="i in 20" :key="i" :title="i"></cell>
            </group>
            <div style="padding: 15px;">
              <x-button @click.native="showRecord = false" plain type="primary"> 关闭 </x-button>
            </div>
          </popup>
        </div>
    </div>
</template>


<script>
import { XDialog,Group,Popup,Cell,XButton, TransferDomDirective as TransferDom} from 'vux'
export default {
    directives: {
      TransferDom
    },
    components: {
      XDialog,
      Group,
      Popup,
      Cell,
      XButton
    },
    data() {
        return {
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
        start() {
            $('#zp-start').rotate({
                angle: 0,
                animateTo: 5555,
                duration: 10000,
                callback: function() {
                    //alert('网络超时，请检查您的网络设置！');
                }
            })
        },
        changeValue(index) {
            this.valueIndex = index
            this.changgeZhuanpan(this.changeIndex)
        },
        changgeZhuanpan(type) {
            this.changeIndex = type
            $("div").remove(".zhuanpan-item")
            var str = ''
            var rootWidth = $('#zhuanpan').width()
            var s = rootWidth / 4 - 12
            var postionX
            var postionY
            var rotates

            var data
            if (type == 1) { //小盘  size 2 顺时针
                postionX = [s * 3+32 , s]
                postionY = [s * 2, s * 2]
                rotates = [90, 270]
                data = this.xiao
            } else if (type == 2) { //中盘  size 4 顺时针
                var diff = 4
                postionX = [s, s * 3, s * 3, s]
                postionY = [s, s, s * 3 - diff, s * 3 - diff]
                rotates = [-45, 45, 135, 225]
                data = this.zhong
            } else if (type == 3) { //大盘 size 12 顺时针
                var diff = 4
                s = rootWidth / 12
                postionX = [s * 6.15, s * 7.7, s * 8.7, s * 8.7, s * 7.7, s * 6.2
                    , s * 4.3, s * 2.7, s * 1.7, s * 1.7, s * 2.7, s * 4.35]
                postionY = [s * 1.7, s * 2.6, s * 4.2, s * 6.05, s * 7.6, s * 8.6
                    , s * 8.6, s * 7.7, s * 6.05, s * 4.2, s * 2.6, s * 1.7]
                rotates = [7.5, 45, 75, 125, 140, 170
                    , -170, -140, -125, -75, -45, -7.5]
                data = this.da
            }

            for (var i = 0; i < data.length; i++) {
                var left = postionX[i]
                var top = postionY[i]
                let rotate = rotates[i]
                var value = data[i].value * (this.values[this.valueIndex - 1] / 2)
                value = value.toFixed(1)
                str += `<div class='zhuanpan-item' style='top:${top}px;left:${left}px;transform:rotate(${rotate}deg) scale(0.95);-webkit-transform:rotate(${rotate}deg) scale(0.95)'>
                        <span style =' height:15px'>${value}</span>
                        <span>金币</span>
                        </div>`
            }
            $('#zhuanpan').append(str)
        }
    },
    mounted() {
        this.$nextTick(() => {

            this.changgeZhuanpan(1)
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

.zp-user-info {
    height: 50px;
    background-color: #3c3636;
}

.zhuanpan-root {
   height: 100vh;
}

.zhuanpan {

    margin: 0 auto;
    position: relative;
    height: 64%;
    overflow: hidden;
}


.zhuanpan-img-bg {
    position: absolute;
    width: 100%;
}

.zhuanpan-item {
    background: url(../assets/zhuanpan/zhuanpanitem.png) center no-repeat;
    background-size: 100% 100%;
    position: absolute;
    width: 50px;
    height: 50px;
    color: #fff;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(../assets/zhuanpan/deng.gif) center no-repeat;
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
    width:4.4rem;
    height: 4.4rem;
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
  .ball,.ball2{
    position: absolute;
    width:.7rem;
    height: .7rem;
    background: #fff;
    border-radius: 50%;
    border:1px solid #333;
    margin:auto;
    transform: translate(1.8rem,0px)
  }
  .ball2{
    transform: translate(-1.8rem,0)
  }
  .laba{
    position: absolute;
    width: 4.9rem;
    height:.58rem;
    margin-left:auto;
    margin-right: auto;
    // bottom:.05rem;
    bottom:0;
    background: url(../assets/zhuanpan/laba.png) no-repeat;
    background-size: contain;
  }
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
</style>
