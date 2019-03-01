<template>
<div class="invoice">
  <!-- logo -->
  <div class="header">
      <div class="boult">
    <span class="el-icon-arrow-left " @click="go()"></span>
    </div>
    <span>选择发票抬头</span>
  </div>
  <!-- 中间部分 -->
    <div class="nobill">
        <span>不需要开发票</span>
        
        <!-- <span class="el-icon-circle-check" v-if="select" @click="select=!select"> </span> -->
         <span class="el-icon-circle-check nobillspan"   @click="select=!select" :class="select ? 'col' : 'nobillspan' " >  </span>
        
    </div>
    <!-- foot -->
    <router-link :to="{name:'confirmOrder'}">
    <div class="foot">确定</div>
    </router-link>
  </div>
</template>
<script>
export default {
data () {
    return {
       
        select:false
    }
},
methods: {
    go(){
        this.$router.go(-1)
    },
   
},
};
</script>
<style scoped>
.invoice{
    background-color: #f5f5f5;
}
.header {
  width: 100%;
   position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  height: 0.5rem;
  background-color: #3190e8;
   
}

.header span {
  text-align: center;
  position: absolute;
  left: 50%;
  top:25%;
  margin-left: -25%;
  width: 50%;
  font-size: 0.2rem;
  color: white;
}
.boult {
  position: absolute;
  top: 0.1rem;
  left:0.2rem;
 
}
.nobill{
    line-height: 1rem;
    color: #333;
    font-size: 0.2rem;
    margin-top:0.7rem;
    width: 100%;
    height: 1rem;
    background-color: white;
}
.nobill span:nth-child(1){
margin-left: 0.2rem;
}
.nobillspan {
margin-left: 1.8rem;
}
/* .nobill span:nth-child(3){
color:#4cd964;
position: absolute;
top:1.095rem;
right: 0.28rem;;
} */
.col{
    color:#4cd964;
    
}
.foot{
    font-size: 0.2rem;
    color: white;
    width: 90%;
    height: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
    margin: 0.4rem auto;
    border-radius: 0.07rem;
    background-color: #4cd964;
}
</style>
