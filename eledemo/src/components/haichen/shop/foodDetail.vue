<template>
  <div class="ee">
    <div v-if="foods" class="header">
      <div>
        <div v-on:click.stop="up">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div>{{foods.name}}</div>
      </div>
    </div>
    <div v-if="image" class="banner">
      <img :src="image">
    </div>
    <div v-if="foods" class="content">
      <div>{{foods.description}}</div>
      <h3>{{foods.name}}</h3>
      <div>
        <span>評分</span>
        <el-rate v-model="foods.rating" disabled show-score text-color="#ff9900"></el-rate>
      </div>
      <div>
        <div>月售:{{foods.month_sales}}单</div>
        <div>售价:¥{{foods.specfoods[0].price}}器</div>
      </div>
      <div>好评率{{foods.satisfy_rate}}%</div>
    </div>

    <section v-if="all" class="shopping">
      <section>
        <div class="cart_icon_container">
          <div :style="'background:'+background" class="tow1">
            <span class="tu">购物</span>
          </div>
          <div class="l">
            <span>¥:{{all.allPrice}}</span>
            <div>{{pei}}</div>
          </div>

          <div v-if="all.jie" class="s">还查¥{{least}}起送</div>
          <div v-else class="jie">结算</div>
        </div>
      </section>
      <section></section>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      all: null,
      background: null,
      pei: null,
      foods: null,
      image: null,
      least: null
    };
  },
  created() {
    this.all = this.$route.params.all;
    this.background = this.$route.params.background;
    this.pei = this.$route.params.pei;
    this.foods = this.$route.params.foods;
    this.image = this.$route.params.image;
    this.least = this.$route.params.least;

    console.log(this.$route);
  },
  methods: {
    up() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.ee {
  margin-top: -1rem;
}
.content {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 0.2rem;
}
img {
  width: 100%;
  height: 4rem;
}
.header {
  display: flex;
  align-items: center;
  height: 0.5rem;
  background: blue;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 8%;
}
.header div {
  color: white;
}
.header > div {
  width: 50%;
  margin-left: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.jie {
  width: 1.3rem;
  height: 0.44rem;
  position: relative;
  top: -0.36rem;
  color: white;
  text-align: center;
  line-height: 0.44rem;
  right: -2.3rem;
  background: green;
}
.render {
  position: absolute;
  visibility: hidden;
  color: red;
}
.money {
  color: orange;
  font-size: 0.15rem;
  font-weight: 1000;
}
.handle > div:nth-child(3) {
  color: blue;
  text-align: center;
  border: 0.01rem solid blue;
  width: 0.16rem;
  height: 0.16rem;
  font-size: 0.2rem;
  line-height: 0.13rem;
  border-radius: 0.087rem;
}
.handle > div:nth-child(2) {
  font-size: 0.15rem;
}
.handle > div:nth-child(1) {
  color: blue;
  text-align: center;
  border: 0.01rem solid blue;
  width: 0.16rem;
  height: 0.16rem;
  font-size: 0.2rem;
  line-height: 0.13rem;
  border-radius: 0.087rem;
}
.handle {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.kk > p {
  font-size: 0.15rem;
}
.kk > div:nth-child(2) {
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.kk {
  width: 95%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.items2 {
  height: 0.5rem;
  z-index: 1000;
  background: white;
  font-size: 0.2rem;
  font-weight: 1000;
}
.s {
  width: 1.3rem;
  height: 0.44rem;

  position: relative;
  top: -0.36rem;
  color: white;
  text-align: center;
  line-height: 0.44rem;
  right: -2.3rem;
}
.l {
  width: 1.4rem;
  height: 100%;
  color: white;

  position: relative;
  top: 0.2rem;
  left: 0.8rem;
}
.happy-scroll-container {
  height: 5.3rem;
}
.itemsRight {
  float: right;
}
.itemsLeft {
  float: left;
}
.items {
  width: 3.46875rem;
  padding: 0.07031rem 0.14063rem;
  height: 0.3rem;
  background: #f5f5f5;
}
.car {
  width: 3.75rem;
  z-index: 100;
  position: absolute;
  left: 0;
  bottom: 0.4rem;
}
.select2 {
  width: 0.45rem;
  height: 0.2rem;
  background: blue;
  color: white;
  float: right;
  border-radius: 0.1rem 0.1rem;
  text-align: center;
  line-height: 0.2rem;
  font-size: 0.1rem;
}
.sNumber {
  width: 0.2rem;
  height: 0.2rem;
  position: absolute;
  top: 4.7rem;
  left: 0.65rem;
  z-index: 2000;
  color: white;
  font-size: 0.12rem;
  text-align: center;
  line-height: 0.2rem;
  background: orange;

  border-radius: 50%;
}
.tu {
  color: white;
}
.tow1 {
  width: 0.45rem;
  height: 0.45rem;
  text-align: center;
  line-height: 0.45rem;
  border-radius: 50%;
  background: transparent;
  position: absolute;
  top: 0.01rem;
  left: 0.02rem;
}
.cart_icon_container {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #3d3d3f;
  border: 0.04218rem solid #444;
  position: absolute;
  bottom: 0.07rem;
  left: 0.2rem;
}
.body1 {
  position: relative;
}
.shopping {
  width: 100%;
  height: 0.46875rem;
  background-color: #3d3d3f;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 200;
}
</style>
