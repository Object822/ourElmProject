<template>
  <div  v-on:call_back="call">
     <!-- 
      specification mask
     -->
     <div v-if="spect" class="specification_mask">

     </div>
    <router-view v-if="$route.name=='shop_detail'"></router-view>
    <div class="body1" v-if="$route.name=='shop'">
      <header1></header1>
      <div class="option">
        <div >
          <span @click="changecolor(0)" :class="index==0?'blue':'none'">商品</span>
        </div>
        <div>
          <span @click="changecolor(1)" :class="index==1?'blue':'none'">评价</span>
        </div>
      </div>
      <comment v-if="index==1"></comment>
      <shopping v-else></shopping>
    </div>
  </div>
</template>
<script>
import header1 from "./header";
import comment from "./comment";
import shopping from "./shopping";
export default {
  data() {
    return {
      index:0,
     spect:null
    };
  },
  methods: {
      changecolor(index){
        this.index=index;
        console.log(this.index)
      },
      call(spect){
        console.log("你哈")
        this.spect=spect
      }
  },
  components: {
    header1,
    comment,
    shopping,
  },
  created() {}
};
</script>
<style scoped>

.specification_mask{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background:rgba(0, 0, 0, 0.4);
  z-index:400
}
.body1{
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
}
.blue{
   color:blue;
   border-bottom: 0.02rem solid blue;
  
}
.none{
   color:black;
   
   border-bottom: 0px;
}
.option > div {
  flex: 1;
  text-align: center;
  padding-top: 0.15rem;
  padding-bottom: 0.15rem;
  box-sizing: border-box;
  font-weight: 1000;
  font-size: 0.15rem;
}
.option {
  display:-webkit-box;
  /* justify-content: space-between;
  flex-direction: row; */
  background: white;
}
</style>

