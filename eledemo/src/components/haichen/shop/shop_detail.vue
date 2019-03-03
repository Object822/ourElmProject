<template>
  <div>
     
    <tit></tit>
    <!-- 内容 -->
    <div class="rating_page">
      <section v-if="restaurant_data">
        <h2>活动与属性</h2>
        <ul>
          <li :key="index" v-for="(value,index) in restaurant_data.supports">
            <span :style="'background:#'+value.icon_color">{{value.icon_name}}</span>
            <span>{{value.description}}(App共享)</span>
          </li>
        </ul>
      </section>
      <section v-if="restaurant_data">
        <h2>
          食品监督安全公示
          <span>
            企业认证详情
            <span class="el-icon-arrow-right"></span>
          </span>
        </h2>
        <ul>
          <li class="check">
            <div>
                <span id="svg" class="el-icon-rank"></span>
            </div>
            <div>
              <p>检查结果:<span class="score">差</span></p>
              <p>检查日期<span></span></p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>
import tit from "./title";
export default {
  data() {
    return {
      restaurant_data: null
    };
  },
  components: {
    tit
  },
  created() {
    this.restaurant_data = this.$route.params.restaurant_data;
    console.log(this.$route);
  }
};
</script>
<style scoped>
.score{
    color: red;
}
.check>div:nth-child(2) p{
    box-sizing: border-box;
    padding: 0.05rem 0.05rem;
}

.check>div:nth-child(2){
    flex:1;
    display: flex;
    flex-direction: column;

}
#svg{
 transform: scale(3)
}
.check>div:nth-child(1){
    width:20%;
       color:green;
}
.check {
  display: flex;
}
h2 > span {
  color: gray;
  font-size: 0.14rem;
  float: right;
}
li {
  margin-bottom: 0.1rem;
}
li > span:nth-child(1) {
  margin-right: 0.1rem;
}
section > ul {
  box-sizing: border-box;
  padding: 0.1rem 0.1rem;
  background: white;
}
section > h2 {
  box-sizing: border-box;
  padding: 0.1rem 0.1rem;
  background: white;
  margin-bottom: 0.01rem;
}
section {
  margin-bottom: 0.2rem;
}
.rating_page {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 0.6rem;
  background: #ebebeb;
}
</style>


