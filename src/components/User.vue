<template>
  <div style="width:100%">
    <div class="user-info">
      <img width="80px" src="../assets/user-avatar.png" />
      <label>ID:cjkty</label>
    </div>

    <form-preview header-label="资产" header-value="¥600.00" :body-items="list" :footer-buttons="payButtons"></form-preview>

    <group style="margin-bottom:30px">
      <cell title="资产记录" is-link>
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

  </div>
</template>


<<script>
import { Cell, Group,FormPreview} from 'vux'
export default {
  components: {
    Group,
    Cell,
    FormPreview
    
  },
  data () {
    return {
      list: [{
        label: '余额',
        value: '¥300.00'
      }, {
        label: '佣金',
        value: '¥300.00'
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

</style>
