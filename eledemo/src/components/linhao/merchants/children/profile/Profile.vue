<template>
  <div>
    <!-- 头部 -->
    <ul class="header">
      <a @click="back_4()">
        <i class="header_home el-icon-arrow-left backButton"></i>
      </a>
      <span class="position_city">我的</span>
    </ul>
    <!-- 我的-登录 -->
    <router-link to="/profile/info" v-if="userInfo">
      <div class="login_wrap">
        <div class="head_portrait">
          <img :src="base_url+'/img/'+userInfo.avatar" alt>
        </div>
        <div class="login_in">
          <p class="login_text" v-if="userInfo">{{userInfo.username}}</p>
          <p class="login_text" v-else>登录/注册</p>
          <p class="telephone">
            <span class="phone">
              <i class="iconfont icon-shouji"></i>
              <span>暂无绑定手机号</span>
            </span>
          </p>
          <i class="iconfont icon-you"></i>
        </div>
      </div>
    </router-link>
    <router-link to="/login" v-else>
      <div class="login_wrap">
        <div class="head_portrait">
          <img v-if="userInfo" :src="base_url+avatar_url" alt>
          <img v-else :src="img1" alt>
        </div>
        <div class="login_in">
          <p class="login_text" v-if="userInfo">{{userInfo&&userInfo.username}}</p>
          <p class="login_text" v-else>登录/注册</p>
          <p class="telephone">
            <span class="phone">
              <i class="iconfont icon-shouji"></i>
              <span>暂无绑定手机号</span>
            </span>
          </p>
          <i class="iconfont icon-you"></i>
        </div>
      </div>
    </router-link>
    <!-- 余额优惠券等 -->
    <ul class="property_wrap">
      <li class="li_wrap">
        <router-link to="/balance" class="span_wrap">
          <span class="money_wrap">
            <b class="money_num">{{new_balance}}</b>元
          </span>
          <span class="my_balance">我的余额</span>
        </router-link>
      </li>
      <li class="li_wrap">
        <router-link to="/benefit" class="span_wrap">
          <span class="discounts_wrap">
            <b class="discounts_num">{{new_gift_amount}}</b>个
          </span>
          <span class="my_discounts">我的优惠</span>
        </router-link>
      </li>
      <li class="li_wrap">
        <router-link to="/points" class="span_wrap">
          <span class="integral_wrap">
            <b class="integral_num">{{new_point}}</b>分
          </span>
          <span class="my_integral">我的积分</span>
        </router-link>
      </li>
    </ul>
    <!-- 订单积分商城等 -->
    <ul class="shopList_wrap">
      <router-link to="/order">
        <li class="list_wrap">
          <i class="iconfont icon-icon- first_img"></i>
          <p>
            <span>我的订单</span>
            <i class="iconfont icon-you"></i>
          </p>
        </li>
      </router-link>
      <a href="https://activity.m.duiba.com.cn/autoLogin/notlogin#/chome/index">
        <li class="list_wrap">
          <i class="iconfont icon-shangcheng first_img"></i>
          <p>
            <span>积分商城</span>
            <i class="iconfont icon-you"></i>
          </p>
        </li>
      </a>
      <router-link to="/vipcard">
        <li class="list_wrap">
          <i class="iconfont icon-huangguan first_img"></i>
          <p>
            <span>饿了么会员卡</span>
            <i class="iconfont icon-you"></i>
          </p>
        </li>
      </router-link>
    </ul>
    <!-- 客服中心 -->
    <ul class="shopList_wrap call_center">
      <router-link :to="{name: 'service', params: {username: '服务中心'}}">
        <li class="list_wrap">
          <i class="iconfont icon-wode1 first_img"></i>
          <p>
            <span>服务中心</span>
            <i class="iconfont icon-you"></i>
          </p>
        </li>
      </router-link>
      <router-link to="/download">
        <li class="list_wrap">
          <i class="iconfont icon-eliaomo first_img"></i>
          <p>
            <span>下载饿了么APP</span>
            <i class="iconfont icon-you"></i>
          </p>
        </li>
      </router-link>
    </ul>
    <!-- 展示用户详情的 -->
    <!-- <keep-alive> -->
    <!-- <transition name="router-slid" mode="out-in"> -->
      <router-view :key="key"></router-view>
    <!-- </transition> -->
    <!-- </keep-alive> -->
  </div>
</template>

<script>
import img1 from "../../../../../../static/imgs/toux.png";
export default {
  data() {
    return {
      userInfo: null,
      new_balance: 0,
      new_gift_amount: 0,
      new_point: 0,
      base_url: "//elm.cangdu.org/",
      avatar_url: "",
      img1: img1
    };
  },
  computed: {
    key() {
      return this.$route.path + Math.random();
    }
  },
  methods: {
    back_4() {
      this.$router.go(-1);
    }
  },
  // watch: {
  //   $route(to, from) {
  //     this.$router.go(0);
  //   }
  // },

  created() {
    console.log("1111");
    var userId;
    if (localStorage.getItem("user_data")) {
      let get_user = localStorage.getItem("user_data");
      this.user_name = JSON.parse(get_user);
      // console.log(this.user_name);
      userId = this.user_name.user_id;
    }
    // 请求用户信息
    this.$http({
      method: "get",
      url: "https://elm.cangdu.org/v1/user",
      params: {
        user_id: userId
      }
    }).then(res => {
      console.log(res.data);
      if (res.data.status !== 0) {
        this.userInfo = res.data;
        let num = this.userInfo.balance.toFixed(2);
        this.new_balance = num;
        this.new_gift_amount = res.data.gift_amount;
        this.new_point = res.data.point;
        this.avatar_url = res.data.avatar;
      }
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

/* 登录 */
.login_wrap {
  width: 100%;
  height: 0.9rem;
  display: flex;
  margin-top: 0.45rem;
  background: #3190e8;
  align-items: center;
  justify-content: space-around;
}
.head_portrait {
  width: 0.59rem;
  height: 0.59rem;
  border-radius: 50%;
  overflow: hidden;
}
.head_portrait img {
  width: 100%;
}
.login_in {
  position: relative;
  width: 74%;
}
.login_text {
  font-size: 0.19rem;
  color: #fff;
  font-weight: bolder;
}
.telephone {
  color: #fff;
}
.phone {
  display: inline-block;
  height: 0.25rem;
  line-height: 0.25rem;
  font-size: 0.2rem;
}
.phone span {
  font-size: 0.14rem;
}
.icon-shouji {
  font-size: 0.2rem;
  margin-top: 0.1rem;
}
.login_in .icon-you {
  position: absolute;
  right: 0;
  top: 30%;
  z-index: 11;
  font-size: 0.16rem;
  color: #fff;
}

/* 余额优惠券等 */
.property_wrap {
  width: 100%;
  height: 0.84rem;
  display: flex;
  justify-content: center;
  background: #fff;
}
.property_wrap .li_wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  justify-content: center;
}
.span_wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.property_wrap li:nth-child(2) {
  border-left: 0.01rem solid #f1f1f1;
  border-right: 0.01rem solid #f1f1f1;
}
.money_wrap,
.my_balance,
.discounts_wrap,
.my_discounts,
.integral_wrap,
.my_integral {
  font-size: 0.15rem;
  color: black;
}
.money_wrap .money_num {
  color: #f90;
  font-size: 0.3rem;
}
.discounts_wrap .discounts_num {
  color: #ff5f3e;
  font-size: 0.3rem;
}
.integral_wrap .integral_num {
  color: #6ac20b;
  font-size: 0.3rem;
}

/* 订单积分商城等 */
.shopList_wrap {
  width: 100%;
  height: 1.28rem;
  margin-top: 0.1rem;
  background: #fff;
}
.shopList_wrap .list_wrap {
  height: 0.43rem;
  line-height: 0.43rem;
  display: flex;
}
.shopList_wrap .list_wrap .first_img {
  margin-left: 0.2rem;
  font-size: 0.14rem;
}
.shopList_wrap .list_wrap p {
  flex: 10;
  margin-left: 0.05rem;
  border-bottom: 0.01rem solid #f1f1f1;
  position: relative;
}
.shopList_wrap .list_wrap p span {
  font-size: 0.16rem;
  color: black;
}
.icon-shangcheng {
  color: #ff5f3e;
}
.icon-huangguan {
  color: #f90;
}
.list_wrap .icon-you {
  position: absolute;
  right: 0;
  color: #e4e4e4;
}

/* 客服中心 */
.call_center {
  height: 0.84rem;
}

/* 动画 */
/* .router-slid-enter-active,
.router-slid-leave-active {
  transition: all 0.4s;
}
.router-slid-enter,
.router-slid-leave-active {
  transform: translate3d(3rem, 0, 0);
  opacity: 0;
} */
</style>
