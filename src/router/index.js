import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import User from '@/components/User'
import Rank from '@/components/Rank'
import Agent from '@/components/Agent'
import Home from '@/components/Home'
import Token from '@/components/Token'
import Zhuanpan from '@/components/Zhuanpan'
import Subordinate from '@/components/Subordinate'
import GameRecord from '@/components/GameRecord'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
