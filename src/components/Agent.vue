<template>
  <div>
   <div  width="100%"  class="agent-bg"></div>
   <img v-if="qrcode" :src="qrcode" class="qrcode-fg">
    <canvas width="180" height="180" id="qr-canvas"></canvas>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import qr from '../common/qr'
import api from '../common/Request'
import html2canvas from 'html2canvas'

export default {
  components: {
    Group,
    Cell,
  },
  data(){
    return {
      qrcode:'asdf'
    }
  },
  async created(){
    let res = await api.getQr();
    let qrcode = res.data
    let ele = qr.makeImage(qrcode)
    this.qrcode =ele.src
  },
  mounted(){
    this.$nextTick(()=>{
      document.querySelector('#qr-canvas').remove()
      html2canvas(document.querySelector('.main-content')).then(canvas=>{
        canvas.id = 'capture'
        document.body.appendChild(canvas)
        let imgData=  canvas.toDataURL('image/png')
        let img = document.createElement('img')
        img.id="capimg"
        img.src=imgData
        document.body.appendChild(img)
      })
    })
    
  }
}
</script>

<style>
  #capimg{
    position: absolute;
    z-index: 9999;
    left: 0;
    right: 0;
    top: 0;
    bottom:0;
  }
  .agent-bg{
    height: 100%;
    background: url(../assets/agent-bg.jpg) center no-repeat;
    background-size: 100% 100%;
  }
  .qrcode-fg,#qr-canvas{
    width: 180px;
    height: 180px;
    position: fixed;
    bottom:30%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 233;
    border: none;
  }
</style>
