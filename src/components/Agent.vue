<template>
  <div>
   <img  width="100%"  class="agent-bg">
   
  </div>
</template>

<script>
import { Group, Cell } from 'vux'

export default {
  components: {
    Group,
    Cell
  }
}
</script>

<style>
  .agent-bg{
    height: 100%;
    background: url(../assets/agent-bg.jpg) center no-repeat;
    background-size: 100% 100%;
    
  }
</style>
