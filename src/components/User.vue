<template>
  <div style="width:100%">
    <div class="user-info">
      <img width="80px" src="../assets/user-avatar.png" />
      <label>ID:{{userId}}</label>
    </div>

    <form-preview header-label="资产" :header-value="'¥'+all" :body-items="list" :footer-buttons="payButtons"></form-preview>

    <group style="margin-bottom:30px">
      <cell title="资产记录" is-link @click.native="showZichan=true">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/ic-zichang.png">
      </cell>
      <cell title="游戏记录" is-link>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/ic-gamerecord.png">
      </cell>
      <cell title="我的下级" is-link>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/ic-my-user.png">
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


<<script>
import { Cell,CellFormPreview,Popup,XButton, Group,FormPreview,TransferDomDirective as TransferDom} from 'vux'
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
  data () {
    return {
      zichanList:[
        [
          {label:'资产',value:123},
          {label:'时间',value:'2011-12-12'}
        ],
        [
          {label:'资产',value:123},
          {label:'时间',value:'2011-12-13'}
        ],
        [
          {label:'资产',value:123},
          {label:'时间',value:'2011-12-12'}
        ],
        [
          {label:'资产',value:123},
          {label:'时间',value:'2011-12-13'}
        ],
        [
          {label:'资产',value:123},
          {label:'时间',value:'2011-12-12'}
        ],
        [
          {label:'资产',value:123},
          {label:'时间',value:'2011-12-13'}
        ],
        [
          {label:'资产',value:123},
          {label:'时间',value:'2011-12-12'}
        ],
        [
          {label:'资产',value:123},
          {label:'时间',value:'2011-12-13'}
        ],

      ],
      showZichan:false, // 显示资产记录
      userId:'',
      balance:0,
      commission:0,
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
  async created(){
    let data = await api.getUser();
    this.userId = data.data.uniqueId
    this.balance = data.data.balance
    this.commission= data.data.commission
    this.list[0].value = '￥'+ this.balance
    this.list[1].value = '￥'+ this.commission
  },
  computed:{
    all(){
      return this.commission + this.balance
    }
  }
}
</script>


<style >
.user-info {
  background-image: linear-gradient(90deg, #FFE136 0%, #FFA103 100%);
  height: 100px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
}

.user-info>label {
  color: #ffffff;
  font-size: 16px;
  margin-left: 10px;
  flex: 1;
}

.weui-form-preview__value {
  color: #FFAD29;
}
.h3title{
    height: .88rem;
    line-height: .88rem;
    font-weight: normal;
    text-align: center
}

</style>
