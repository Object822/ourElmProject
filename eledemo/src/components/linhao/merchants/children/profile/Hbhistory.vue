<template>
  <div class="info_wrap">
    <!-- 头部 -->
    <ul class="header">
      <a>
        <i class="header_home el-icon-arrow-left backButton" @click="back_()"></i>
      </a>
      <span class="position_city">历史红包</span>
    </ul>
    <div class="animated slideInRight faster">
      <ul class="past_due_wrap">
        <li class="content_red_Wrap" v-for="(list, index) in red_lists_data" :key="index">
          <div class="red_lists_wrap">
            <div class="red_money">
              <span>￥</span>
              <span class="money_bits">{{list.amount}}</span>
              <!-- <span>.</span> -->
              <!-- <span>{{list.amount-list.amount%10}}</span> -->
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
              <p class="last_time">已过期</p>
            </div>
            <!-- <svg class="expired">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#expired">已过期</use>
            </svg> -->
          </div>
          <div class="type_red" v-if="list.limit_map">
            <p>{{list.limit_map.restaurant_flavor_ids}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      red_lists_data: []
    };
  },
  methods: {
    back_() {
      this.$router.go(-1);
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
    // 请求过期的红包数
    this.$http({
      method: "get",
      url:
        "https://elm.cangdu.org/promotion/v2/users/" +
        userId +
        "/expired_hongbaos?limit=20&offset=0"
    }).then(res => {
      // console.log(res.data.length);
      if (res.data.length) {
        this.red_lists_data = res.data;
        console.log(this.red_lists_data);
      }
    });
  }
};
</script>

<style scoped>
.info_wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 234;
  background: #f5f5f5;
  overflow-y: scroll;
  overflow-x: hidden;
}
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
  z-index: 234;
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
/* 红包列表 */
.past_due_wrap {
  margin-top: 0.6rem;
  padding: 0.1rem;
}
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
  background: url("../../../../../../static/imgs/gray.png") repeat-x;
  border-radius: 0.05rem;
  padding: 0 0.1rem;
}
.red_money {
  width: 0.8rem;
  height: 0.5rem;
  border-right: 0.01rem dotted #e4e4e4;
}
.red_money span {
  color: #ccc;
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
  color: #ccc;
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
.expired {
  fill: #ddd;
  width: 0.3rem;
  height: 0.3rem;
  /* top: .6rem; */
  /* right: .2rem; */
  /* position: absolute; */
}
</style>
