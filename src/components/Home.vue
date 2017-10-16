<template>
    <div>
        <!-- <swiper style="background-image: linear-gradient(-90deg, #FFDE56 0%, #FFDA42 100%);" auto height="25px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
            <swiper-item v-for="(content, index) in notices" :key="index">
                <div style="display:flex;align-items: center;height: 100%;padding-left: 10px;">
                    <p>{{content.title}}</p>
                </div>
            </swiper-item>

        </swiper> -->

        <swiper :show-dots="false" style="width:100%;margin:0 auto;" auto :aspect-ratio="250/750" :list="bannerList" v-model="bannerIndex" @on-index-change="onItemIndexChange"></swiper>

        <div>
            <tab :line-width=2 active-color='#FFAD29' v-model="tabIndex">
                <tab-item active-class="active-tab" class="vux-center" @click="tabIndex = index" v-for="(item, index) in gameTabList" :key="index">{{item}}</tab-item>
            </tab>
            <!-- <swiper v-model="tabIndex" :show-dots="false">
                                    <swiper-item v-for="(item, index) in gameTabList" :key="index">
                                        <div class="tab-swiper vux-center">{{item}} Container</div>
                                    </swiper-item>
                                </swiper> -->

            <div v-show="tabIndex==0">
                <div class="item" v-for="(item ,index) in gameList" :key="index">
                    <img style="border-radius: 6px;" :src="item.icon" />
                    <div>

                        <div style="display:flex;align-items: center;">
                            <span class="item-title">{{item.title}}</span>
                            <badge v-if="item.tag" style="margin-left:3px;" :text="item.tag"></badge>
                        </div>
                        <span class="item-subtitle">{{item.subTitle}}</span>
                    </div>
                    <button class="play" @click="goGame(item)"> 开始 </button>
                </div>
            </div>
            <div v-show="tabIndex==1">
                  <div class="item" v-for="(item ,index) in gameList1" :key="index">
                    <img :src="item.icon" />
                    <div>

                        <div style="display:flex;align-items: center;">
                            <span class="item-title">{{item.title}}</span>
                            <badge v-if="item.tag" style="margin-left:3px;" :text="item.tag"></badge>
                        </div>
                        <span class="item-subtitle">{{item.subTitle}}</span>
                    </div>
                    <button class="play1"> 敬请期待 </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperItem, Tab, TabItem, Badge } from 'vux'

export default {
    components: {
        Swiper
        , SwiperItem, Tab, TabItem, Badge
    },
    name: 'home',
    data() {
        return {
            tabIndex: 0,
            gameTabList: ['游戏列表', '游戏预告'],
            bannerIndex: 0,
            bannerList: [{
                url: 'javascript:',
                img: 'https://static.vux.li/demo/1.jpg',
                title: '送你一朵fua'
            }, {
                url: 'javascript:',
                img: 'https://static.vux.li/demo/2.jpg',
                title: '送你一辆车'
            }, {
                url: 'javascript:',
                img: 'https://static.vux.li/demo/5.jpg',
                title: '送你一次旅行',
                fallbackImg: 'https://static.vux.li/demo/3.jpg'
            }],
            notices: [{
                title: '公告:充值满1000送1001111'
            }, {
                title: '公告:支付通道恢复正常使用'
            }]
            , gameList: [{
                icon: require('../assets/ssc_logo.png'),
                title: '时时彩竞猜',
                subTitle: '公平、公开',
                link: '',
            }, {
                icon: 'http://p18.qhimg.com/dr/105_105_/t0111cb71dabfd83b21.png',
                title: 'QQ在线人数竞猜',
                subTitle: '每分钟一期，飞禽走搜，赢到手软。',
                link: '',
                tag: '赔率高'
            },{
                icon: require('../assets/zhuanpan_logo.png'),
                title: '幸运大转盘',
                subTitle: '全新玩法等你来玩',
                link: 'Zhuanpan',
                tag: '易中奖'
            }],
            gameList1: [{
                icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507061012960&di=586b1952d3108f8f5ed62678a32293f7&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F23%2F73%2F27%2F99U58PIC7se_1024.jpg',
                title: '争分夺秒',
                subTitle: '输赢全靠 快、稳、准',
                link: '',
            }]
        }
    },
    methods: {
        onItemIndexChange(index) {
            this.bannerIndex = index
        },
        // 跳转游戏
        goGame(item){
          this.$router.push({
            name:item.link
          })
        }

    },
}
</script>

<style>
p {
    font-size: 12px;
    color: #2D2F3B;
}

.active-tab {
    color: #FFAD29 !important;
    border-color: #FFAD29 !important;
}

.item {
    margin-bottom: 1px;
    display: flex;
    background-color: #ffffff;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    height: 70px;
}

.item>img {
    width: 40px;
}

.item>div {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
}

.item-title {
    font-size: 16px;
    color: #2D2F3B;
}

.item-subtitle {
    font-size: 14px;
    color: #A5AFBB;
}

.play {
    background-image: linear-gradient(-90deg, #FFDE56 0%, #FFDA42 100%);
    border-radius: 8px;
    height: 30px;
    min-width: 50px;
    border: 0px;
    font-size: 12px;
    outline: none;
}

.play1{
    background-color: #eeeeee;
     border-radius: 8px;
    height: 30px;
    min-width: 50px;
    border: 0px;
    font-size: 12px;
}

.tag {
    background-image: linear-gradient(-90deg, red 0%, #fb4473 100%);
    border-radius: 3px;
    font-size: 8px;
    color: #ffffff;
    padding: 1px;
    margin-left: 3px;

}
</style>




