<template>
  <div>
    <!-- 头部 -->
    <ul class="header">
      <router-link to="/search">
        <i class="header_home el-icon-search"></i>
      </router-link>
      <router-link to="/home">
        <span class="position_city">{{position}}</span>
      </router-link>
      <router-link to="/profile">
        <i v-if="$store.state.user_msg" class="iconfont icon-wode header_login search"></i>
      </router-link>
      <router-link to="/login">
        <li v-if="!$store.state.user_msg" class="header_login" id="user_login">登录|注册</li>
      </router-link>
    </ul>
    <!-- 食物列表轮播图 -->
    <div class="food_slide">
      <swiper v-if="food_list.length > 0" :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide>
          <el-row>
            <el-col :span="6" v-for="(item, index) in food_list.slice(0, 8)" :key="index">
              <router-link :to="{name: 'food', query:{title: item.title, geohash: $store.state.geohash}}">
                <div class="grid-content bg-purple food_wrap">
                  <img :src="base_url + item.image_url">
                  <p class="food_title">{{item.title}}</p>
                </div>
              </router-link>
            </el-col>
          </el-row>
        </swiper-slide>
        <swiper-slide>
          <el-row>
            <el-col :span="6" v-for="(item, index) in food_list.slice(8, 16)" :key="index">
              <!-- , geohash: $store.state.geohash -->
              <router-link :to="{name: 'food', query:{title: item.title, geohash: $store.state.geohash}}">
                <div class="grid-content bg-purple food_wrap">
                  <img :src="base_url + item.image_url">
                  <p class="food_title">{{item.title}}</p>
                </div>
              </router-link>
            </el-col>
          </el-row>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!-- 附近商家列表 -->
    <div class="shop_wrap">
      <!-- 附近商家文字 -->
      <div>
        <p class="shop_text">
          <span class="shop_img">
            <i class="iconfont icon-tubiaolunkuo-"></i>
          </span>
          <span>附近商家</span>
        </p>
      </div>
      <!-- 商家列表展示 -->
      <div class="shopLists_wrap">
        <ul class="listShow_wrap">
            <li class="list_wrap" v-for="(list, index) in shop_list" :key="index">
          <router-link :to="{name: 'shop', query:{geohash: $store.state.geohash,id: shop_list[index].id}}">
              <div class="shop_img_list">
                <img :src="base_url_1 + list.image_path">
              </div>
              <div class="shopMsg_wtap">
                <!-- 商铺信息第一行 -->
                <div class="first_shopMsg">
                  <h3 class="brand_shop_name">
                    <span class="brand">品牌</span>
                    <span class="shop_name">{{list.name}}</span>
                  </h3>
                  <ul class="shop_detail_ul" v-for="(item, index) in list.supports" :key="index">
                    <li class="supports">{{item.icon_name}}</li>
                  </ul>
                </div>
                <!-- 商铺信息第二行评价 -->
                <div class="grade_wrap">
                  <h4 class="grade">
                    <el-rate
                      v-model="list.rating"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}"
                    ></el-rate>
                    <span class="monthly_sales">月销{{list.recent_order_num}}单</span>
                  </h4>
                  <h5 class="distribution">
                    <span class="shipping_method">{{list.delivery_mode.text}}</span>
                    <span class="on_time">准时达</span>
                  </h5>
                </div>
                <!-- 商铺信息第三行配送信息 -->
                <div>
                  <h4>
                    <span
                      class="shipping_fee"
                    >￥{{list.float_minimum_order_amount}}起送 / {{list.piecewise_agent_fee.tips}}</span>
                    <p class="journey">
                      <span>{{list.distance}}</span>
                      <span>/</span>
                      <span class="journey_time">{{list.order_lead_time}}</span>
                    </p>
                  </h4>
                </div>
              </div>
          </router-link>
            </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      position: "",
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        //分页器设置
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        loop: true
      },
      food_list: [],
      shop_list: [],
      base_url: "https://fuss10.elemecdn.com",
      base_url_1: "//elm.cangdu.org/img/",
    };
  },
  methods: {
    // foodSubmit(index) {
    //   this.$router.push({path: '/food', query: this.food_list[index]})
    // }
  },
  created() {
    // 使用全局变量存储传值过来的经纬度
    this.$store.state.geohash = this.$route.query.geohash;
    // console.log(this.$route.query.geohash);
    // 请求定位的具体位置
    this.$http({
      method: "get",
      url: "https://elm.cangdu.org/v2/pois/" + this.$store.state.geohash
    }).then(res => {
      console.log("定位的具体信息", res.data);
      //   获取定位后取得的定位信息名字
      this.position = res.data.name;
    });
    // 请求食品分类列表
    this.$http({
      method: "get",
      url: "https://elm.cangdu.org/v2/index_entry"
    }).then(res => {
      this.food_list = res.data;
      console.log("食品分类列表", this.food_list);
    });
    // 请求分类列表
    // 将经纬度字符串转化为数组
    let latitude = this.$store.state.geohash.split(",")[0];
    let longitude = this.$store.state.geohash.split(",")[1]
    this.$http({
      method: "get",
      url:
        "https://elm.cangdu.org/shopping/restaurants?latitude=" +
         latitude +
        "&longitude=" + longitude
    }).then(res => {
      console.log(res.data);
      this.shop_list = res.data;
      console.log("分类列表", this.shop_list);
    });

    // 进入页面看看有没有用户登录缓存
    let get_user = localStorage.getItem("user_data");
    this.$store.state.user_msg = JSON.parse(get_user);
    console.log(this.$store.state.user_msg);
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log("this is current swiper instance object", this.swiper);
    // this.swiper.slideTo(1, 1000, false);
  }
};
</script>
<style scoped>
/* 头部样式 */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 0.45rem;
  background: #3190e8;
  padding: 0 0.1rem;
  font-size: 0.16rem;
  z-index: 111;
}
#user_login {
  font-size: 0.13rem;
}
.header .header_login {
  font-size: 0.2rem;
}
.header_home,
.header_login {
  line-height: 0.45rem;
  color: #fff;
}
.header_home {
  float: left;
}
.search {
  font-size: 0.2rem;
}
.el-icon-search {
  font-size: 0.25rem !important;
}
.header_login {
  float: right;
}
.position_city {
  position: absolute;
  left: 50%;
  margin-left: -25%;
  width: 50%;
  height: 0.45rem;
  color: #fff;
  line-height: 0.45rem;
  text-align: center;
  /* font-weight: bolder; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 轮播图设置 */
.food_slide {
  height: 2rem;
  margin-top: 0.45rem;
  margin-bottom: 0.1rem;
  background: #fff;
  padding-top: 0.12rem;
  border-bottom: 0.01rem solid #e4e4e4;
}
.swiper-container {
  /* width: 100%; */
  height: 2rem;
}
.food_wrap {
  height: 0.8rem;
  text-align: center;
  margin-bottom: 0.1rem;
}
.food_wrap img {
  width: 50%;
  margin-bottom: 0.1rem;
}
.food_wrap .food_title {
  font-size: 0.14rem;
  color: #666;
}
.swiper-slide.swiper-slide-active {
  height: 90%;
}
.el-row {
  height: 100%;
}
.swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets {
  bottom: 0.15rem;
}
/* 商铺列表 */
.shop_wrap {
  background: #fff;
  border-top: 0.01rem solid #e4e4e4;
}
.shop_wrap .shop_text {
  height: 0.35rem;
  line-height: 0.35rem;
  color: #999;
  font-size: 0.13rem;
  text-indent: 0.1rem;
}
/* 商家列表展示 */
.shop_wrap .shopLists_wrap {
  overflow: hidden;
  margin-bottom: 0.45rem;
  width: 100%;
}
.shop_wrap .shopLists_wrap .list_wrap {
  border-bottom: 0.01rem solid #e4e4e4;
  padding: 0.2rem 0.1rem;
  overflow: hidden;
  /* width: 100%; */
}
.shop_wrap .shopLists_wrap .list_wrap .shop_img_list {
  float: left;
  width: 0.68rem;
}
.shop_wrap .shopLists_wrap .list_wrap .shop_img_list img {
  width: 100%;
}
.shop_wrap .shopLists_wrap .list_wrap .shopMsg_wtap {
  width: 78%;
  float: right;
  font-size: 0.11rem;
}
.first_shopMsg {
  overflow: hidden;
  margin-bottom: 0.15rem;
}
.brand {
  height: 0.06rem;
  font-size: 0.05rem;
  line-height: 0.06rem;
  color: #333;
  font-weight: bolder;
  background-color: #ffd930;
  padding: 0 0.05rem;
  border-radius: 0.05rem;
  margin-right: 0.015rem;
}
.brand_shop_name {
  float: left;
}
.shop_name {
  color: black;
  font-size: 0.15rem;
  font-weight: bolder;
}
.shop_detail_ul {
  float: right;
  transform: scale(0.8);
}
.shop_detail_ul .supports {
  float: left;
  margin-left: 0.05rem;
  color: #999;
  border: 0.01rem solid #f1f1f1;
  padding: 0.01rem;
}
.el-rate {
  /* font-size: 1rem; */
  float: left;
  transform: scale(0.6);
  margin-left: -0.25rem;
}
.el-rate__item {
  margin-right: 0;
}
.monthly_sales {
  display: inline-block;
  /* color: red; */
  font-size: 0.1rem;
  transform: scale(0.7);
  vertical-align: middle;
  margin-left: -0.25rem;
  color: #666;
}
/* 评分以及配送部分 */
.grade_wrap {
  overflow: hidden;
  font-size: 0;
  /* margin-bottom: 0.15rem; */
}
.grade {
  float: left;
  line-height: 0.15rem;
}
.distribution {
  float: right;
}
.shipping_method {
  display: inline-block;
  background: #3190e8;
  color: #fff;
  font-size: 0.1rem;
  transform: scale(0.6);
  padding: 0.02rem 0.04rem;
  border-radius: 0.03rem;
  margin-right: -0.18rem;
}
.on_time {
  display: inline-block;
  font-size: 0.1rem;
  transform: scale(0.6);
  border: 0.01rem solid #3190e8;
  padding: 0.02rem 0.04rem;
  border-radius: 0.03rem;
  margin-right: -0.07rem;
}
/* 配送费以及时间 */
.shipping_fee {
  display: inline-block;
  font-size: 0.1rem;
  transform: scale(0.9);
  /* margin-left: -0.03rem; */
  color: #999;
}
.journey {
  float: right;
  font-size: 0.1rem;
  transform: scale(0.9);
  color: #999;
}
.journey .journey_time {
  color: #3190e8;
}
.router-link-active {
  color: #7e8c8d;
}
</style>
