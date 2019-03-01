<template>
  <div>
    <!-- 头部 -->
    <ul class="header">
      <a @click="back_()">
        <i class="header_home el-icon-arrow-left backButton"></i>
      </a>
      <span class="position_city">我的优惠</span>
    </ul>
    <div class="red_packet">
      <p :class="red_show?'btn_active':''" @click="red()">红包</p>
      <p :class="packet_show?'btn_active':''" @click="packet()">商家代金券</p>
    </div>
    <!-- 红包内容展示 -->
    <transition name="fade" mode="out-in">
      <div class="packet_content_wrap" v-if="red_show">
        <div class="show_red_count">
          <p>
            有
            <span class="red_num">{{count}}</span> 个红包即将到期
          </p>
          <p>
            <i class="iconfont icon-wenhao"></i>
            <router-link to>
              <span>红包说明</span>
            </router-link>
          </p>
        </div>
        <ul>
          <li class="content_red_Wrap" v-for="(list, index) in red_lists_data" :key="index">
            <div class="red_lists_wrap">
              <div class="red_money">
                <span>￥</span>
                <span class="money_bits">{{parseInt(list.amount)}}</span>
                <span>.</span>
                <span>{{(list.amount-parseInt(list.amount))*10}}</span>
                <p>{{list.description_map.sum_condition}}</p>
              </div>
              <div>
                <p class="share_red">{{list.name}}</p>
                <p class="red_time">
                  <span>{{list.description_map.validity_periods}}</span>
                </p>
                <p class="astrict_phone">
                  <span>{{list.description_map.phone}}</span>
                </p>
              </div>
              <div>
                <p class="last_time">{{list.description_map.validity_delta}}</p>
              </div>
            </div>
            <div class="type_red" v-if="list.limit_map">
              <p>{{list.limit_map.restaurant_flavor_ids}}</p>
            </div>
          </li>
        </ul>
        <router-link to="/benefit/hbHistory">
          <p class="his_reds">查看历史红包 ></p>
        </router-link>
        <div class="footer_wrap">
          <router-link to="/benefit/exchange">
            <p>兑换红包</p>
          </router-link>
          <router-link :to="{name: 'commend', params: {username: '推荐有奖'}}">
            <p>推荐有奖</p>
          </router-link>
        </div>
      </div>
    </transition>
    <!-- 商家代金券 -->
    <transition name="fade" mode="out-in">
      <div v-if="packet_show">
        <div class="voucher_text">
          <i class="iconfont icon-wenhao"></i>
          <router-link to>
            <p>商家代金券说明</p>
          </router-link>
        </div>
        <div class="erro_voucher">
          <img :src="img1" alt>
          <p>无法使用代金券</p>
          <p class="erro_msg">非客户端或客户端版本过低</p>
          <router-link to="/download">
            <button class="downLoad">下载或升级客户端</button>
          </router-link>
        </div>
      </div>
    </transition>
    <keep-alive>
      <router-view :key="key"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import img1 from "../../../../../../static/imgs/erro.png";
export default {
  data() {
    return {
      red_show: true,
      packet_show: false,
      count: 0,
      red_lists_data: [],
      img1:img1
    };
  },
  computed: {
    key() {
      return this.$route.path + Math.random();
    }
  },
  methods: {
    back_() {
      this.$router.go(-1);
    },
    red() {
      this.red_show = true;
      this.packet_show = false;
    },
    packet() {
      this.packet_show = true;
      this.red_show = false;
    }
  },
  created() {
    var userId;
    if (localStorage.getItem("user_data")) {
      let get_user = localStorage.getItem("user_data");
      this.user_name = JSON.parse(get_user);
      console.log(this.user_name);
      userId = this.user_name.user_id;
    }
    // 请求可以用的红包数
    this.$http({
      method: "get",
      url:
        "https://elm.cangdu.org/promotion/v2/users/" +
        userId +
        "/hongbaos?limit=20&offset=0"
    }).then(res => {
      // console.log(res.data.length);
      if (res.data.length) {
        this.count = res.data.length;
        this.red_lists_data = res.data;
        console.log(this.red_lists_data);
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
/* 红包展示 */
.red_packet {
  width: 100%;
  height: 0.45rem;
  background: #fff;
  display: flex;
  justify-content: space-around;
  margin-top: 0.45rem;
  align-items: center;
  font-size: 0.16rem;
}
.red_packet .btn_active {
  color: #3190e8;
  border-bottom: 0.02rem solid #3190e8;
}
/* 红包内容展示 */
.packet_content_wrap {
  width: 100%;
  padding: 0.1rem 0.2rem;
}
.show_red_count {
  display: flex;
  height: 0.46rem;
  line-height: 0.46rem;
  justify-content: space-between;
  font-size: 0.14rem;
}
.red_num {
  color: red;
}
.show_red_count .icon-wenhao {
  color: #3190e8;
  font-size: 0.14rem;
}

/* 红包列表 */
.content_red_Wrap {
  width: 100%;
  margin-bottom: 0.1rem;
}
.red_lists_wrap {
  width: 100%;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff !important;
  background: url("../../../../../../static/imgs/red.png") repeat-x;
  border-radius: 0.05rem;
  padding: 0 0.1rem;
}
.red_money {
  width: 0.8rem;
  height: 0.5rem;
  border-right: 0.01rem dotted #e4e4e4;
}
.red_money span {
  color: red;
  font-size: 0.16rem;
  font-weight: bolder;
}
.red_money p {
  font-size: 0.1rem;
  color: #999;
  transform: scale(0.8);
  margin-top: -0.1rem;
}
.red_money .money_bits {
  font-size: 0.35rem;
}
.share_red {
  font-size: 0.17rem;
  color: black;
}
.red_time span {
  font-size: 0.1rem;
  color: #999;
}
.astrict_phone span {
  font-size: 0.1rem;
  color: #999;
}
.last_time {
  height: 0.5rem;
  color: red;
  font-size: 0.18rem;
}
.type_red {
  background: #f9f9f9;
}
.type_red p {
  font-size: 0.1rem;
  transform: scale(0.8);
  height: 0.3rem;
  line-height: 0.3rem;
  color: #999;
  margin-left: -0.2rem;
}
.his_reds {
  height: 1rem;
  text-align: center;
  color: #999;
  font-size: 0.14rem;
}
/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* 商家代金券 */
.voucher_text {
  display: flex;
  justify-content: flex-end;
  margin-right: 0.2rem;
  height: 0.45rem;
  line-height: 0.45rem;
  font-size: 0.14rem;
}
.voucher_text .icon-wenhao {
  font-size: 0.14rem;
  color: #3190e8;
  margin-right: 0.05rem;
}
.erro_voucher {
  margin-top: 1rem;
  text-align: center;
}
.erro_voucher img {
  width: 1.4rem;
  height: 0.8rem;
}
.erro_voucher p {
  font-size: 0.17rem;
  line-height: 0.3rem;
}
.erro_voucher .erro_msg {
  font-size: 0.12rem;
  color: #999;
}
.downLoad {
  width: 1.5rem;
  height: 0.35rem;
  background: #56d176;
  border: none;
  outline: none;
  color: #fff;
  border-radius: 0.05rem;
  font-size: 0.15rem;
}
/* 底部样式 */
.footer_wrap {
  width: 100%;
  height: 0.45rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.footer_wrap p {
  width: 50%;
  height: 0.45rem;
  line-height: 0.45rem;
  float: left;
  text-align: center;
  font-size: 0.18rem;
  color: black;
  background: #fff;
}
.footer_wrap p:first-child {
  border-right: 0.01rem solid #e4e4e4;
}

</style>
