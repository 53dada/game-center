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
      qrcode:'',
      bg:false
    }
  },
  async created(){
    let res = await api.getQr();
    let qrcode = res.data
    let ele = qr.makeImage(qrcode)
    this.qrcode =ele.src
  },
  async mounted(){
    let self = this;
    if(this.bg){
      document.querySelector('#capimg').style.display=""
    };
    if(document.querySelector('#capimg'))return;
    let flag = setInterval(()=>{
      let mc = document.querySelector('.main-content')
        if(document.querySelector('.qrcode-fg') && (document.querySelector('.qrcode-fg').src == self.qrcode) && mc && !mc.querySelector('.list') ){
          clearInterval(flag);
          console.log(3444,document.querySelector('.main-content'),self.$route)
          html2canvas(document.querySelector('.main-content')).then(canvas=>{
            canvas.id = 'capture'
            document.body.appendChild(canvas)
            let imgData=  canvas.toDataURL('image/png')
            let img = document.createElement('img')
            img.id="capimg"
            img.src=imgData
            document.body.appendChild(img);
            self.bg=true
            canvas.remove();
          }).catch(e=>{
            console.log(e)
          })
        } else {
          console.log('not equal')
        }
    })  
  },
  beforeRouteLeave(to,from,next){
    console.log('beforeRouteLeave',document.querySelector('#capimg'))
    if( document.querySelector('#capimg')){
      document.querySelector('#capimg').style.display="none";
    }
    next()
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      if(document.querySelector('#capimg')){
        document.querySelector('#capimg').style.display="block"
      }
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
    bottom:.88rem;
     
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
