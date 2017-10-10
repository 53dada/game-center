import Vue from 'vue'
import Router from 'vue-router'

const Main = resolve => require(['@/components/Main.vue'], resolve);
const User = resolve => require(['@/components/User.vue'], resolve);
const Rank = resolve => require(['@/components/Rank.vue'], resolve);
const Agent = resolve => require(['@/components/Agent.vue'], resolve);
const Home = resolve => require(['@/components/Home.vue'], resolve);
const Token = resolve => require(['@/components/Token.vue'], resolve);
const Zhuanpan = resolve => require(['@/components/Zhuanpan.vue'], resolve);
const Subordinate = resolve => require(['@/components/Subordinate.vue'], resolve);
const GameRecord = resolve => require(['@/components/GameRecord.vue'], resolve);

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      redirect: '/home',
      children: [
        {
          //我的
          path: '/user',
          name: 'User',
          component: User
        },
        {
          //推广二维码
          path: '/agent',
          name: 'Agent',
          component: Agent
        },
        {
          //排行榜
          path: '/rank',
          name: 'Rank',
          component: Rank
        }, {
          //首页
          path: '/home',
          name: 'Home',
          component: Home
        }
      ]
    },
    {
      //授权
      path: '/token',
      name: 'Token',
      component: Token,
    },
    {
      //转盘
      path: '/game/zhuanpan',
      name: 'Zhuanpan',
      component: Zhuanpan,
    },
    {
      //代理人
      path: '/subordinate',
      name: 'Subordinate',
      component: Subordinate,
    },
    {
      //游戏记录
      path: '/gameRecord',
      name: 'GameRecord',
      component: GameRecord,
    }
  ]
})
