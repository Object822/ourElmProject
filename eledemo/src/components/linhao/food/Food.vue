<template>
  <div>
    <!-- 头部 -->
    <ul class="header">
      <a @click="back_1()">
        <i class="header_home el-icon-arrow-left backButton"></i>
      </a>
      <span class="position_city">{{title}}</span>
      <!-- <router-link to="/home">
        <li class="header_login">切换城市</li>
      </router-link>-->
    </ul>
    <!-- 下拉列表 -->
    <div class="select_warp">
      <!-- 分类列表 -->
      <div class="select_food">
        <div class="list_select_wrap">
          <div class="public_height">
            <div class="classify_wrap" @click="show_list">
              <span :class="[isShow ? textColor:'']">{{title}}</span>
              <i v-bind:class="[iconfont, icon_style, isShow ? rotate_icon_1 : rotate_icon_2]"></i>
            </div>
          </div>
          <transition name="showList">
            <div class="food_select_wrap" v-if="isShow" :key="isShow">
              <div class="food_select_left">
                <ul>
                  <li
                    :class="[menu_list_left, back_show==index ? back_color:'']"
                    v-for="(list, index) in food_lists"
                    :key="index"
                    @click="pitch_on(index, list.id)"
                  >
                    <span class="category_wrap">
                      <!-- <img :src="base_url_food + list.image_url" alt> -->
                      <span>{{list.name}}</span>
                    </span>
                    <span class="category_count">
                      <span class="count_num">{{list.count}}</span>
                      <span class="right_img" v-if="index != 0">></span>
                    </span>
                  </li>
                </ul>
              </div>
              <div class="food_select_right">
                <ul>
                  <li
                    class="menu_list_right"
                    v-for="(item, index) in sub_categories"
                    :key="index"
                    @click="select_food(index, item.id)"
                  >
                    <div :class="(count_food==item.name)? textColor:''">
                      <span>{{item.name}}</span>
                      <span class="category_count">{{item.count}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <!-- 排序列表 -->
      <div class="select_sort">
        <div class="list_select_wrap">
          <div class="public_height">
            <div class="classify_wrap middle_select" @click="show_sort_list">
              <span :class="[show_sort ? textColor:'']">排序</span>
              <i v-bind:class="[iconfont, icon_style, show_sort ? rotate_icon_1 : rotate_icon_2]"></i>
            </div>
          </div>
          <transition name="showList">
            <div v-if="show_sort" class="classify_list_wrap" :key="show_sort">
              <ul class="classify_ul_wrap">
                <li
                  class="classify_children_wrap"
                  v-for="(sort, index) in sort_arr"
                  :key="index"
                  @click="check_sort_fun(index, sort.id)"
                >
                  <div class="classify_icon_wrap">
                    <i :class="[classify_img, iconfont, sort.img_class]"></i>
                  </div>
                  <p class="classify_text_wrap">
                    <span class="classify_text">{{sort.name}}</span>
                    <i :class="[classify_select, iconfont, check_sort==index ? icon_duihao : '']"></i>
                  </p>
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </div>
      <!-- 筛选列表 -->
      <div class="select_filtrate">
        <div class="list_select_wrap">
          <div class="public_height">
            <div class="classify_wrap" @click="show_classify_list">
              <span :class="[show_classify ? textColor:'']">筛选</span>
              <i
                v-bind:class="[iconfont, icon_style, show_classify ? rotate_icon_1 : rotate_icon_2]"
              ></i>
            </div>
          </div>
          <transition name="showList">
            <div v-if="show_classify" class="screen_wrap" key="C">
              <div class="distribution_wrap">
                <p class="distribution_title">配送方式</p>
                <ul>
                  <li
                    class="distribution_method"
                    @click="choose_distribution(item.id)"
                    v-for="(item, index) in distribution_method"
                    :key="index"
                  >
                    <i v-if="show_right" class="iconfont icon-fengniao"></i>
                    <i v-else class="iconfont icon-duihao"></i>
                    <span :class="[show_right==false?textColor:'']">{{item.text}}</span>
                  </li>
                </ul>
              </div>
              <div>
                <p class="distribution_title title_style">商家属性(可以多选)</p>
                <ul class="choose_list_wrap">
                  <li
                    class="distribution_method choose_lists"
                    v-for="(list, index) in distribution_arr"
                    :key="index"
                    @click="choose_list(index,list.id)"
                  >
                    <i v-if="lists_id.indexOf(list.id) !== -1" :class="[iconfont, icon_duihao]"></i>
                    <span v-else class="check_text">{{list.icon_name}}</span>
                    <span :class="[lists_id.indexOf(list.id) !== -1?textColor:'']">{{list.name}}</span>
                  </li>
                </ul>
              </div>
              <div class="button_wrap">
                <button class="publice_but_style clear_but" @click="clear_arr_all()">清空</button>
                <button class="publice_but_style sure_but" @click="submit_search()">
                  确定
                  <span v-if="count_num!=0">({{count_num}})</span>
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <!-- 蒙版 -->
    <transition name="fade">
      <div class="max_black" v-if="isShow || show_sort || show_classify" key="D"></div>
    </transition>
    <div>
      <!-- 商家展示---第一版展示 -->
      <div class="merchant_list_wrap" v-if="shops_show">
        <div class="shopLists_wrap">
          <ul class="listShow_wrap">
            <li class="list_wrap" v-for="(list, index) in shop_list" :key="index">
              <router-link
                :to="{name: 'shop', query:{geohash: $store.state.geohash,id: shop_list[index].id}}"
              >
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
                      <span class="shipping_method">{{list.delivery_mode&&list.delivery_mode.text}}</span>
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
      <!-- 商家展示---第二版展示 -->
      <div class="merchant_list_wrap" v-else>
        <div class="shopLists_wrap">
          <ul class="listShow_wrap">
            <li class="list_wrap" v-for="(list, index) in shop_datas" :key="index">
              <router-link
                :to="{name: 'shop', query:{geohash: $store.state.geohash,id: shop_datas[index].id}}"
              >
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
                      <span class="shipping_method">{{list.delivery_mode&&list.delivery_mode.text}}</span>
                      <span class="on_time">准时达</span>
                    </h5>
                  </div>
                  <!-- 商铺信息第三行配送信息 -->
                  <div>
                    <h4>
                      <span
                        class="shipping_fee"
                      >￥{{list.float_minimum_order_amount}}起送 / {{list.piecewise_agent_fee&&list.piecewise_agent_fee.tips}}</span>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      isShow: false,
      iconfont: "iconfont",
      icon_style: "icon-triangle-bottom",
      rotate_icon_1: "active_rotate_1",
      rotate_icon_2: "active_rotate_2",
      textColor: "text_color",
      show_sort: false,
      show_classify: false,
      // 定义变量保存请求下来的食物列表数据
      food_lists: [],
      sub_categories: [],
      base_url_food: "https://fuss10.elemecdn.com/",
      back_color: "back_color",
      menu_list_left: "menu_list_left",
      back_show: -1,
      classify_img: "classify_img",
      icon_duihao: "icon-duihao",
      classify_select: "classify_select",
      check_sort: -1,
      shop_datas: [],
      base_url_1: "//elm.cangdu.org/img/",
      shops_show: true,
      shop_list: [],
      count_food: -1,
      show_right: true,
      show_choose: -1,
      distribution_arr: [],
      distribution_method: [],
      // 商家属性id
      lists_id: [],
      // 配送方式id
      delivery_ids: [],
      // 选择后的计数
      count_num: 0,
      // latitude: this.$store.state.geohash.split(",")[0],
      // longitude: this.$store.state.geohash.split(",")[1],
      sort_arr: [
        {
          id: 4,
          name: "智能排序",
          img_class: "icon-shaixuanpaixu"
        },
        {
          id: 5,
          name: "距离最近",
          img_class: "icon-location"
        },
        {
          id: 6,
          name: "销量最高",
          img_class: "icon-08"
        },
        {
          id: 1,
          name: "起送价最低",
          img_class: "icon-qian"
        },
        {
          id: 2,
          name: "配送速度最快",
          img_class: "icon-chakantiezishijian"
        },
        {
          id: 3,
          name: "评分最高",
          img_class: "icon-star"
        }
      ]
    };
  },
  methods: {
    // 定义选中排序后出现对勾的方法,并且发送请求,用来展示列表
    check_sort_fun(index, id) {
      this.shops_show = false;
      this.show_sort = false;
      this.check_sort = index;
      // 使用全局变量存储传值过来的经纬度
      this.$store.state.geohash = this.$route.query.geohash;
      // 将经纬度字符串转化为数组
      let latitude = this.$store.state.geohash.split(",")[0];
      let longitude = this.$store.state.geohash.split(",")[1];
      this.$http({
        method: "get",
        url:
          "https://elm.cangdu.org/shopping/restaurants?latitude=" +
          latitude +
          "&longitude=" +
          longitude +
          "&order_by=" +
          id
      }).then(res => {
        this.shop_datas = res.data;
        console.log(this.shop_datas);
      });
    },
    // 定义选中列表后的方法
    pitch_on(index, first_id) {
      this.back_show = index;
      this.sub_categories = this.food_lists[index].sub_categories;
      console.log(this.sub_categories);
    },
    back_1() {
      this.$router.go(-1);
    },
    // 控制食物列表显示的
    show_list() {
      this.isShow = !this.isShow;
      this.show_sort = false;
      this.show_classify = false;
    },
    // 控制排序列表显示的
    show_sort_list() {
      this.show_sort = !this.show_sort;
      this.isShow = false;
      this.show_classify = false;
    },
    // 控制筛选列表显示的
    show_classify_list() {
      this.show_classify = !this.show_classify;
      this.show_sort = false;
      this.isShow = false;
    },
    // 定义请求食物列表方法
    res_food() {
      this.$http({
        method: "get",
        url: "https://elm.cangdu.org/shopping/v2/restaurant/category"
      }).then(res => {
        // console.log(res.data);
        this.food_lists = res.data;
        // console.log("测试食物分类数据",this.food_lists);
      });
    },
    // 定义食品类别点击事件方法
    select_food(index, shop_id) {
      this.title = this.sub_categories[index].name;
      this.count_food = this.sub_categories[index].name;
      this.isShow = false;
      let id_arr = [];
      id_arr.push(shop_id);
      // 使用全局变量存储传值过来的经纬度
      this.$store.state.geohash = this.$route.query.geohash;
      // 将经纬度字符串转化为数组
      let latitude = this.$store.state.geohash.split(",")[0];
      let longitude = this.$store.state.geohash.split(",")[1];
      this.shops_show = false;
      // console.log(index);
      console.log(id_arr);
      // 开始请求
      this.$http({
        method: "get",
        url: "https://elm.cangdu.org/shopping/restaurants",
        params: {
          latitude: latitude,
          longitude: longitude,
          restaurant_category_ids: id_arr
        }
      }).then(res => {
        this.shop_datas = res.data;
        console.log(this.shop_datas);
      });
    },
    // 定义筛选框选择方法
    choose_distribution(methods_id) {
      if (this.delivery_ids.indexOf(methods_id) === -1) {
        this.delivery_ids.push(methods_id);
        this.count_num += 1;
      } else {
        this.delivery_ids.pop(methods_id);
        this.count_num -= 1;
      }
      console.log(this.delivery_ids);
      this.show_right = !this.show_right;
    },
    // 定义商家属性选择框方法
    choose_list(index, type_id) {
      if (this.lists_id.indexOf(type_id) === -1) {
        this.lists_id.push(type_id);
        this.count_num += 1;
      } else {
        let index = this.lists_id.indexOf(type_id);
        this.lists_id.splice(index, 1);
        this.count_num -= 1;
      }
      console.log(this.lists_id);
    },
    // 定义清空所有的方法
    clear_arr_all() {
      this.lists_id = [];
      this.delivery_ids = [];
      this.count_num = 0;
      this.show_right = true;
    },
    // 定义提交确定方法
    submit_search() {
      this.shops_show = false;
      this.show_classify = false;
      // 使用全局变量存储传值过来的经纬度
      this.$store.state.geohash = this.$route.query.geohash;
      // 将经纬度字符串转化为数组
      let latitude = this.$store.state.geohash.split(",")[0];
      let longitude = this.$store.state.geohash.split(",")[1];
      // 开始请求
      this.$http({
        method: "get",
        url: "https://elm.cangdu.org/shopping/restaurants",
        params: {
          latitude: latitude,
          longitude: longitude,
          delivery_mode: this.delivery_ids,
          support_ids: this.lists_id
        }
      }).then(res => {
        this.shop_datas = res.data;
        console.log(res.data);
      });
    }
  },
  created() {
    // 使用全局变量存储传值过来的经纬度
    this.$store.state.geohash = this.$route.query.geohash;
    // 将经纬度字符串转化为数组
    let latitude = this.$store.state.geohash.split(",")[0];
    let longitude = this.$store.state.geohash.split(",")[1];
    this.title = this.$route.query.title;
    // console.log(this.$route.query);
    // 调用请求食物列表方法
    this.res_food();
    this.$http({
      method: "get",
      url:
        "https://elm.cangdu.org/shopping/restaurants?latitude=" +
        latitude +
        "&longitude=" +
        longitude
    }).then(res => {
      // console.log(res.data);
      this.shop_list = res.data;
      // console.log("分类列表", this.shop_list);
    });
    // 请求商家信息
    this.$http({
      method: "get",
      url: "https://elm.cangdu.org/shopping/v1/restaurants/activity_attributes"
    }).then(res => {
      console.log(res.data);
      this.distribution_arr = res.data;
    });
    // 请求配送方式
    this.$http({
      method: "get",
      url: "https://elm.cangdu.org/shopping/v1/restaurants/delivery_modes"
    }).then(res => {
      console.log(res.data);
      this.distribution_method = res.data;
    });
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
/* .header .header_login {
  font-size: 0.13rem;
} */
.header_home,
.header_login {
  line-height: 0.45rem;
  color: #fff;
}
.header_home {
  float: left;
  font-size: 0.25rem;
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
  font-weight: bolder;
}

/* 下拉列表蒙版 */
.max_black {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 10;
  background: rgba(0, 0, 0, 0.3);
  /* display: none; */
}
/* 下拉分类列表 */
.select_warp {
  /* border: 1px solid; */
  height: 0.45rem;
  position: fixed;
  top: 0.45rem;
  left: 0;
  right: 0;
  z-index: 111;
  border-bottom: 0.01rem solid #f1f1f1;
  background: #fff;
}
.merchant_list_wrap {
  /* border: 1px solid; */
  margin-top: 0.9rem;
}
.classify_wrap {
  text-align: center;
  margin-top: 0.1rem;
  font-size: 0.15rem;
}
.classify_wrap.middle_select {
  border-left: 0.01rem solid #e4e4e4;
  border-right: 0.01rem solid #e4e4e4;
}
.icon-triangle-bottom {
  font-size: 0.12rem;
  display: inline-block;
}
/* 分类列表下拉框 */
.food_select_wrap {
  /* border: 1px solid; */
  width: 100%;
  height: 3.8rem;
  position: fixed;
  top: 0.9rem;
  background: #fff;
}
.showList-enter-active,
.showList-leave-active {
  transition: all 0.5s;
}
.showList-enter,
.showList-leave-to {
  opacity: 0;
  height: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.public_height {
  float: left;
  width: 33%;
  height: 0.45rem;
}
.food_select_wrap .food_select_left,
.food_select_right {
  float: left;
  width: 50%;
  height: 100%;
  overflow-y: scroll;
}
.food_select_wrap .food_select_right {
  background: #fff;
  padding-left: 0.1rem;
}
.menu_list_left {
  background: #f5f5f5;
}
.menu_list_right {
  background: #fff;
}
.menu_list_left,
.menu_list_right {
  height: 0.42rem;
  /* text-align: center; */
  line-height: 0.42rem;
}
.category_wrap {
  float: left;
  margin-left: 0.1rem;
  font-size: 0.12rem;
  color: #666;
  width: 50%;
}
.category_count {
  float: right;
  margin-right: 0.1rem;
  color: #ccc;
  height: 0.42rem;
}
.category_count .count_num {
  font-size: 0.1rem;
  border-radius: 0.1rem;
  background: #ccc;
  color: #fff;
  padding: 0.02rem;
}
.right_img {
  font-size: 0.16rem;
  margin-left: 0.08rem;
  font-weight: bolder;
}
.menu_list_right {
  font-size: 0.14rem;
  border-bottom: 0.01rem solid #e4e4e4;
}
.menu_list_right .category_count {
  color: #666;
}
.back_color {
  background: #fff;
}
.text_color {
  color: #3190e8;
}
.active_rotate_1 {
  transform: rotate(180deg) !important;
  transition: all 0.3s;
  color: #3190e8;
}
.active_rotate_2 {
  transition: all 0.3s;
}
.category_wrap img {
  width: 20%;
  vertical-align: middle;
}

/* 排序列表展示 */
.classify_list_wrap {
  /* border: 1px solid; */
  width: 100%;
  height: 3.45rem;
  position: fixed;
  top: 0.9rem;
  background: #fff;
}
.classify_list_wrap .classify_ul_wrap {
  height: 100%;
}
.classify_children_wrap {
  width: 100%;
  height: 0.57rem;
  /* line-height: 0.57rem; */
}
.classify_icon_wrap {
  float: left;
  padding-left: 0.2rem;
  color: #3190e8;
  height: 100%;
  line-height: 0.57rem;
}
.classify_img {
  font-size: 0.16rem;
}
.classify_text_wrap {
  width: 87%;
  float: left;
  margin-left: 0.1rem;
  border-bottom: 0.01rem solid #e4e4e4;
  height: 100%;
  line-height: 0.57rem;
}
.classify_text {
  font-size: 0.14rem;
  color: #666;
}
.classify_select {
  float: right;
  margin-right: 0.08rem;
  color: #3190e8;
  font-weight: bolder;
  font-size: 0.2rem;
}
.icon-08 {
  color: red;
}
.icon-qian {
  color: #ffd930;
}
.icon-star {
  color: #ffd930;
}

/* 商铺列表 */
.merchant_list_wrap {
  background: #fff;
  border-top: 0.01rem solid #e4e4e4;
}
.merchant_list_wrap .shop_text {
  height: 0.35rem;
  line-height: 0.35rem;
  color: #999;
  font-size: 0.13rem;
  text-indent: 0.1rem;
}
/* 商家列表展示 */
.shopLists_wrap {
  overflow: hidden;
  margin-bottom: 0.45rem;
  width: 100%;
}
.shopLists_wrap .list_wrap {
  border-bottom: 0.01rem solid #e4e4e4;
  padding: 0.2rem 0.1rem;
  overflow: hidden;
  /* width: 100%; */
}
.shop_img_list {
  float: left;
  width: 0.68rem;
}
.shop_img_list img {
  width: 100%;
}
.shopLists_wrap .list_wrap .shopMsg_wtap {
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

/* 筛选下拉框样式 */
.screen_wrap {
  width: 100%;
  height: 2.56rem;
  background: #fff;
  position: fixed;
  top: 0.9rem;
}
.distribution_wrap {
  width: 100%;
  height: 0.77rem;
  padding-left: 0.1rem;
  /* padding-top: .1rem; */
}
.distribution_title {
  width: 100%;
  height: 0.3rem;
  line-height: 0.3rem;
  transform: scale(0.8);
  margin-left: -0.3rem;
  color: #333;
}
.distribution_method {
  width: 1.1rem;
  height: 0.32rem;
  border: 0.01rem solid #e4e4e4;
  border-radius: 0.04rem;
  /* text-align: center; */
  line-height: 0.32rem;
  padding-left: 0.1rem;
  font-size: 0.12rem;
  margin-left: 0.07rem;
}
.distribution_method .icon-duihao {
  font-weight: bolder;
  font-size: 0.18rem;
  margin-right: 0.05rem;
}
.title_style {
  padding-left: 0.1rem;
}
/* 下方选择 */
.choose_list_wrap {
  height: 0.9rem;
  padding-left: 0.1rem;
  overflow: hidden;
}
.check_text {
  display: inline-block;
  width: 0.2rem;
  height: 0.2rem;
  text-align: center;
  vertical-align: middle;
  line-height: 0.2rem;
  border: 0.01rem solid #3190e8;
  color: #3190e8;
  border-radius: 0.05rem;
  margin-right: 0.05rem;
}
.choose_list_wrap .distribution_method.choose_lists {
  float: left;
  margin-bottom: 0.1rem;
}
.button_wrap {
  width: 100%;
  height: 0.59rem;
  background: #f5f5f5;
  line-height: 0.59rem;
  padding: 0 0.08rem;
}
.publice_but_style {
  width: 48%;
  height: 0.4rem;
  line-height: 0.4rem;
  border: none;
  outline: none;
  font-size: 0.2rem;
  vertical-align: middle;
  border-radius: 0.08rem;
}
.clear_but {
  background: #fff;
  margin-right: 0.1rem;
  color: black;
}
.sure_but {
  background: #56d176;
  color: #fff;
}
.icon-fengniao {
  font-size: 0.15rem;
  color: #3190e8;
  margin-right: 0.03rem;
}
.distribution_method.choose_lists:nth-child(2) :first-child {
  color: rgb(153, 153, 153);
  border-color: rgb(153, 153, 153);
}
.distribution_method.choose_lists:nth-child(4) :first-child {
  color: rgb(232, 132, 45);
  border-color: rgb(232, 132, 45);
}
.distribution_method.choose_lists:nth-child(5) :first-child {
  color: rgb(255, 78, 0);
  border-color: rgb(255, 78, 0);
}
.distribution_method.choose_lists:nth-child(6) :first-child {
  color: rgb(153, 153, 153);
  border-color: rgb(153, 153, 153);
}
.icon-duihao {
  color: #3190e8 !important;
}
</style>