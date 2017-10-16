<template>
  <div style="width:100%">
    <div class="user-info">
      <img width="80px" src="../assets/user-avatar.png" />
      <div>
        <label>数字ID:{{id}} </label><br/>
        <label> 字母ID:{{userId}}</label>
      </div>
    </div>

    <form-preview header-label="资产" :header-value="'¥'+all" :body-items="list" :footer-buttons="payButtons"></form-preview>

    <group style="margin-bottom:30px">
      <cell title="资产记录" is-link @click.native="showZichan=true">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/ic-zichang.png">
      </cell>
      <cell title="游戏记录" is-link>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/ic-gamerecord.png">
      </cell>
      <cell title="代理赚钱" is-link @click.native="go('Subordinate')">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/ic-my-user1.png">
      </cell>
      <cell title="常见问题" is-link>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/ic-qa.png">
      </cell>
      <cell title="联系客服" is-link>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/ic-service.png">
      </cell>
    </group>

    <div v-transfer-dom>
      <popup v-model="showZichan" position="bottom">
        <group>
          <h3 class="h3title">资产记录</h3>
          <cell-form-preview :list="list" v-for="(list,index) in zichanList" :key="index"></cell-form-preview>
        </group>
        <div style="padding: 15px;">
          <x-button @click.native="showZichan = false" plain type="primary"> 关闭 </x-button>
        </div>
      </popup>
    </div>
  </div>
</template>


<script>
import { numberComma, Cell, CellFormPreview, Popup, XButton, Group, FormPreview, TransferDomDirective as TransferDom } from 'vux'
import api from '../common/Request'
export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    Cell,
    FormPreview,
    CellFormPreview,
    Popup,
    XButton
  },
  data() {
    return {
      zichanList: [
        [
          { label: '资产', value: 123 },
          { label: '时间', value: '2011-12-12' }
        ],
        [
          { label: '资产', value: 123 },
          { label: '时间', value: '2011-12-13' }
        ],
        [
          { label: '资产', value: 123 },
          { label: '时间', value: '2011-12-12' }
        ],
        [
          { label: '资产', value: 123 },
          { label: '时间', value: '2011-12-13' }
        ],
        [
          { label: '资产', value: 123 },
          { label: '时间', value: '2011-12-12' }
        ],
        [
          { label: '资产', value: 123 },
          { label: '时间', value: '2011-12-13' }
        ],
        [
          { label: '资产', value: 123 },
          { label: '时间', value: '2011-12-12' }
        ],
        [
          { label: '资产', value: 123 },
          { label: '时间', value: '2011-12-13' }
        ],

      ],
      showZichan: false, // 显示资产记录
      userId: '',
      id: '',
      balance: 0,
      commission: 0,
      list: [{
        label: '余额',
        value: 0
      }, {
        label: '佣金',
        value: 0
      }],
      payButtons: [{
        style: 'primary',
        text: '充值'
      }, {
        style: 'default',
        text: '提现',
        link: '/home'
      }]
    }
  },
  async created() {
    let data = await api.getUser();
    this.userId = data.data.uniqueId
    this.id = data.data.id
    this.balance = data.data.balance
    this.commission = data.data.commission
    this.list[0].value = '￥' + numberComma(this.balance)
    this.list[1].value = '￥' + numberComma(this.commission)
  },

  computed: {
    all() {
      return numberComma((this.commission + this.balance).toFixed(2))
    }
  }
  ,
  methods: {
    go(rname) {
      this.$router.push({
        name: rname
      })
    }
  },
}
</script>


<style>
.user-info {
  background-image: linear-gradient(90deg, #FFE136 0%, #FFA103 100%);
  height: 2rem;
  display: flex;
  align-items: center;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
}

.user-info>div>label {
  color: #ffffff;
  font-size: 0.25rem;
  margin-left: 0.15rem;
  flex: 1;
}

.weui-form-preview__value {
  color: #FFAD29;
}

.h3title {
  height: .88rem;
  line-height: .88rem;
  font-weight: normal;
  text-align: center
}
</style>
