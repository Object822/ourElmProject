<template>
  <div>
    <section class="shop_wrap">
      <section class="back_btn">
        <i class="el-icon-arrow-left" @click="back_()"></i>
      </section>
      <!-- 头部 -->
      <section class="header_wrap">
        <img class="mask_img" src="../merchants/children/logo.png" alt>
        <section class="title_content">
          <section class="header_content">
            <section>
              <img class="title_img" src="../merchants/children/logo.png" alt>
            </section>
            <section class="content_text">
              <p>效果演示</p>
              <p>商家配送 / 分钟送达 / 配送费$5</p>
              <p>公告: 欢迎光临, 用餐高峰期请提前下单, 谢谢</p>
            </section>
            <router-link to="/">
              <section>
                <i class="el-icon-arrow-right go_shop"></i>
              </section>
            </router-link>
          </section>
          <footer class="foot" v-if="have" @click="showDetail = true">
            <li>
              <span>减</span>
              <span>满30减5, 满60减8 (APP专享)</span>
            </li>
            <li>
              <span>一个活动</span>
              <i class="el-icon-arrow-right"></i>
            </li>
          </footer>
        </section>
      </section>
      <!-- 商品,评价方面 -->
      <section class="goods_evaluate_wrap">
        <div class="evaluate" @click="evaluate()">
          <span :class="isEvaluate?isActive:''">商品</span>
        </div>
        <div class="goods" @click="goods()">
          <span :class="isGoods?isActive:''">评价</span>
        </div>
      </section>
      <!-- 商家详细优惠信息 -->
      <transition name="fade" mode="out-in">
        <section class="detail_mask" v-if="showDetail">
          <ul class="detail_content">
            <li>撒的发生的购物券</li>
            <li>优惠信息</li>
            <li>满30减5, 满60减8 (APP专享)</li>
            <li>商家公告</li>
            <li>欢迎光临, 用餐高峰期请提前下单, 谢谢</li>
            <li @click="showDetail = false">X</li>
          </ul>
        </section>
      </transition>
      <!-- 食物列表 -->
      <transition name="fade" mode="out-in">
        <section class="lists_wrap" v-if="isEvaluate">
          <section class="food_type_left">
            <ul>
              <li>热销榜</li>
              <li>热销榜</li>
              <li>热销榜</li>
              <li>热销榜</li>
              <li>热销榜</li>
              <li>热销榜</li>
              <li>热销榜</li>
              <li>热销榜</li>
            </ul>
          </section>
          <section class="food_det_right">
            <ul>
              <li></li>
            </ul>
          </section>
          <!-- 购物车列表 -->
          <section class="car_lists_wrap" v-if="false">
            <div class="car_title_wrap">
              <span>购物车</span>
              <span>
                <i class="iconfont icon-lajitong"></i>
                <span class="clear_text">清空</span>
              </span>
            </div>
            <ul class="lists_ul">
              <li class="list_content">
                <div class="foods_name">
                  <span class="food_text">食物名字11111111111111</span>
                  <p>规格</p>
                </div>
                <div class="money_list">
                  <span>$20</span>
                </div>
                <div class="add_subtract">
                  <i class="iconfont icon-jianhao"></i>
                  <span>1</span>
                  <i class="iconfont icon-jiahao-fill"></i>
                </div>
              </li>
            </ul>
          </section>
          <!-- 底部购物车 -->
          <section class="shopping_cart_wrap" @click="showCar()">
            <div class="car_wrap">
              <div class="back_blue">
                <i class="iconfont icon-03f"></i>
              </div>
              <span class="count_num">1</span>
            </div>
            <div class="money_wrap">
              <p>$20.00</p>
              <p>配送费$5</p>
            </div>
            <div class="settle_accounts">
              <span>去结算</span>
            </div>
          </section>
          <!-- 蒙版 -->
          <div class="mask_back" v-if="false"></div>
        </section>
      </transition>
      <!-- 评价 -->
      <transition name="fade" mode="out-in">
        <section v-if="isGoods">我是评价</section>
      </transition>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 选中时的class值
      isActive: "isActive",
      isEvaluate: true,
      isGoods: false,
      have: true,
      showDetail: false
    };
  },
  methods: {
    back_() {
      this.$router.go(-1);
    },
    // 展示商家的
    evaluate() {
      this.isEvaluate = true;
      this.isGoods = false;
    },
    // 展示评价的
    goods() {
      this.isGoods = true;
      this.isEvaluate = false;
    }
  }
};
</script>

<style scoped>
/* 最外边框 */
.shop_wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  right: 0;
}
.back_btn .el-icon-arrow-left {
  position: fixed;
  top: 0.05rem;
  font-size: 0.25rem;
  font-weight: bolder;
  color: #fff;
  z-index: 12;
}
.header_wrap {
  width: 100%;
  /* display: flex; */
  position: relative;
  overflow: hidden;
  z-index: 11;
  background-color: rgba(119, 103, 137, 0.43);
}
.mask_img {
  width: 100%;
  filter: blur(10px);
  position: absolute;
  z-index: 1;
}
.title_img {
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.1rem;
}
.title_img img {
  width: 100%;
  height: 100%;
}
.title_content {
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 0.1rem;
  box-sizing: border-box;
  z-index: 12;
}
.header_content {
  display: flex;
}
.content_text {
  flex: 1;
  color: #fff;
  font-size: 0.12rem;
}
.content_text p {
  line-height: 0.28rem;
  font-weight: bolder;
}
.content_text p:nth-child(1) {
  font-size: 0.2rem;
}
.title_content .el-icon-arrow-right.go_shop {
  font-size: 0.25rem;
  color: #fff;
  position: absolute;
  right: 0;
  top: 30%;
  z-index: 12;
}
.goods_evaluate_wrap {
  display: flex;
  background: #fff;
  text-align: center;
  font-size: 0.17rem;
  line-height: 0.35rem;
  padding: 0.07rem;
}
.foot {
  display: flex;
  color: #fff;
  position: relative;
  z-index: 13;
  justify-content: space-between;
  font-size: 0.12rem;
}
/* 商家优惠信息蒙版 */
.detail_mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 45;
  background: #3d3d3f;
  padding: 0.3rem;
}
.detail_content {
  color: #fff;
}
.detail_content li:nth-child(1) {
  font-size: 0.2rem;
  margin-bottom: 0.5rem;
  text-align: center;
}
.detail_content li:nth-child(2),
.detail_content li:nth-child(4) {
  width: 0.7rem;
  height: 0.3rem;
  line-height: 0.3rem;
  font-size: 0.13rem;
  border: 0.01rem solid #555;
  border-radius: 0.1rem;
  margin: 0 auto 0.2rem;
  text-align: center;
}
.detail_content li:nth-child(3),
.detail_content li:nth-child(4) {
  font-size: 0.12rem;
  margin: 0 auto 0.2rem;
}
.detail_content li:last-child {
  width: 0.5rem;
  height: 0.5rem;
  border: 0.01rem solid #555;
  font-size: 0.2rem;
  border-radius: 50%;
  text-align: center;
  line-height: 0.5rem;
  position: absolute;
  bottom: 0.3rem;
  left: 50%;
  margin-left: -0.25rem;
  color: #555;
  z-index: 23;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
/* 商品评价部分 */
.goods_evaluate_wrap .evaluate {
  flex: 1;
}
.goods_evaluate_wrap .goods {
  flex: 1;
}
.goods_evaluate_wrap span {
  display: inline-block;
}
.isActive {
  border-bottom: 0.03rem solid #3190e8;
  color: #3190e8;
}

/* 底部购物车 */
.shopping_cart_wrap {
  width: 100%;
  height: 0.5rem;
  position: absolute;
  bottom: 0;
  display: flex;
  /* justify-content: space-between; */
  background: #3d3d3f;
  z-index: 44;
}
.car_wrap {
  width: 0.6rem;
  height: 0.6rem;
  position: absolute;
  left: 0.2rem;
  bottom: 0.06rem;
  border-radius: 50%;
  background: #3d3d3f;
  z-index: 24;
}
.count_num {
  width: 0.2rem;
  height: 0.2rem;
  position: absolute;
  background: red;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 0.2rem;
  font-size: 0.15rem;
  right: 0;
}
.back_blue {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  left: 0.05rem;
  bottom: 0.05rem;
  border-radius: 50%;
  background: #3190e8;
  text-align: center;
  line-height: 0.5rem;
  color: #fff;
}
.back_blue .icon-03f {
  font-size: 0.3rem;
}
.money_wrap {
  margin-left: 1rem;
  color: #fff;
}
.money_wrap p:first-child {
  font-size: 0.2rem;
  font-weight: bolder;
}
.money_wrap p:last-child {
  font-size: 0.12rem;
  font-weight: bolder;
}
.settle_accounts {
  width: 1rem;
  height: 100%;
  color: #fff;
  background: #4cd964;
  font-size: 0.16rem;
  text-align: center;
  line-height: 0.5rem;
  position: absolute;
  right: 0;
}
.settle_accounts span {
  font-weight: bolder;
}
/* 购物车列表 */
.car_lists_wrap {
  width: 100%;
  position: absolute;
  bottom: 0.5rem;
  z-index: 44;
}
.car_title_wrap {
  width: 100%;
  height: 0.4rem;
  background: #eceff1;
  line-height: 0.4rem;
  display: flex;
  justify-content: space-between;
  padding: 0 0.15rem;
}
.car_title_wrap span {
  font-size: 0.16rem;
  color: #666;
}
.car_title_wrap .icon-lajitong {
  font-size: 0.16rem;
  color: rgb(187, 187, 187);
}
.car_title_wrap .clear_text {
  font-size: 0.14rem;
}
.lists_ul {
  background: #fff;
  width: 100%;
}
.list_content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.1rem 0.15rem;
}
.foods_name {
  flex: 6;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.foods_name p {
  font-size: 0.13rem;
}
.food_text {
  font-size: 0.2rem;
  color: #666;
  font-weight: 600;
}
.money_list {
  flex: 2;
  text-align: center;
}
.money_list span {
  font-size: 0.18rem;
  font-weight: bolder;
  color: #f60;
}
.add_subtract {
  flex: 2;
  text-align: center;
}
.add_subtract span {
  font-size: 0.15rem;
}
.add_subtract .icon-jianhao,
.icon-jiahao-fill {
  font-size: 0.18rem;
  color: #3190e8;
}
.add_subtract .icon-jianhao {
  margin-right: 0.05rem;
}
.add_subtract .icon-jiahao-fill {
  margin-left: 0.05rem;
}
/* 蒙版 */
.mask_back {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: black;
  opacity: 0.3;
  z-index: 35;
}
/* 食物列表 */
.lists_wrap {
  width: 100%;
  flex: 1;
  padding-bottom: 0.5rem;
}
</style>
