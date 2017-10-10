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

export default {
  components: {
    Group,
    Cell,
  },
  created(){
    console.log(qr)
    //let ele = qr.makeImage('https://github.com/mdn/simple-web-worker/blob/gh-pages/worker.jshttps://github.com/mdn/simple-web-worker/blob/gh-pages/worker.js');
  },
  mounted(){
    qr.draw('https://github.com/mdn/simple-web-worker/blob/gh-pages/worker.js',document.getElementById('qr-canvas'))
  },
  data(){
    return {
      qrcode:''
    }
  }
}
</script>

<style>
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
  }
</style>
