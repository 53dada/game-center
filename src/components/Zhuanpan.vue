<template>
    <div class="zp-content">
        <!-- 用户信息 -->
        <!-- <div class="zp-user-info"></div> -->

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
                <img id="zhuanpan-bg" class="zhuanpan-img-bg" src="../assets/zhuanpan/zhuanpanbg1.png">
                <img class="zhuanpan-img-bg" src="../assets/zhuanpan/zhuanpan2.gif">

                <img v-show="changeIndex == 1" class="zhuanpan-img-bg" src="../assets/zhuanpan/zhuanpanxiaopanbg.png">
                <img v-show="changeIndex == 2" class="zhuanpan-img-bg" src="../assets/zhuanpan/zhuanpanzhongpanbg.png">
                <img v-show="changeIndex == 3" class="zhuanpan-img-bg" src="../assets/zhuanpan/zhuanpandapanbg.png">
                <img class="zhuanpan-img-bg" src="../assets/zhuanpan/zhuanpancenter.png">
                <img v-on:click="start()" id="zp-start" class="zhuanpan-img-bg" src="../assets/zhuanpan/zhuanpanstart.png">
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

    </div>
</template>


<script>
export default {
    data() {
        return {
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
            var rootWidth = $('#zhuanpan-bg').width()
            var s = rootWidth / 4 - 12
            var postionX
            var postionY
            var rotates

            var data
            if (type == 1) { //小盘  size 2 顺时针
                postionX = [s * 3 + 32, s - 32]
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
                // value = parseInt(value)
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



<style scroped>
.change {
    display: flex;
    flex-direction: row;
    padding-top: 15px;
}

.change>div {
    margin-left: 10px;
    margin-right: 10px;
    flex: 1;
    height: 40px;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-content: center;
}

.zp-change-active {
    background: url(../assets/zhuanpan/anniu2.png) center no-repeat;
}

.zp-change-normal {
    background: url(../assets/zhuanpan/anniu1.png) center no-repeat;
}

.change>div>label {
    color: #ffffff;
    font-size: 15px;
    line-height: 2.3rem;
}


.zp-content {
    background: url(../assets/zhuanpan/zhuanpanbg.jpg) center no-repeat;
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
    height: 65%;
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
    padding-left: 10px;
    padding-right: 10px;
}

.value-root>div {
    margin-left: 15px;
    margin-right: 15px;
    flex: 1;
    height: 30px;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-content: center;
}

.zp-value-active {
    color: #ffffff;
    background: url(../assets/zhuanpan/zp-value-active.png) center no-repeat;
}

.zp-value-normal {
    color: #ff3d32;
    background: url(../assets/zhuanpan/zp-value-normal.png) center no-repeat;
}

.value-root>div>label {

    font-size: 15px;
    line-height: 1.8rem;
}
</style>
