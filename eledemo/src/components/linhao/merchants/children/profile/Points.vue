<template>
  <div>
    <!-- 头部 -->
    <ul class="header">
      <a>
        <i class="header_home el-icon-arrow-left backButton" @click="back_()"></i>
      </a>
      <span class="position_city">我的积分</span>
    </ul>
    <!-- 当前积分 -->
    <div class="balance_wrap">
      <div class="current_balance">
        <div class="current_text">
          <p>当前积分</p>
          <p>
            <i class="iconfont icon-wenhao"></i>
            <router-link to>
              <span>积分说明</span>
            </router-link>
          </p>
        </div>
        <div class="money_num_wrap">
          <b>0</b>分
        </div>
        <div>
          <button class="withdraw" @click="make_points_fun()">积分兑换商品</button>
        </div>
      </div>
    </div>
    <!-- 明细记录 -->
    <div>
      <p class="detail_text">最近30天积分纪录</p>
      <div class="detail_his">
        <img class :src="img1" alt>
        <p>最近30天积分纪录</p>
        <p class="make_points">快去下单赚取大量积分吧</p>
      </div>
    </div>
    <!-- 弹框 -->
    <transition name="show" enter-active-class="animated heartBeat fast">
      <div class="prompt_wrap" v-if="show_point">
        <div class="tip_icon">
          <span></span>
          <span></span>
        </div>
        <p class="alert_text">快去下单赚取大量积分吧</p>
        <button class="OK_btn" @click="show_point=false">确认</button>
      </div>
    </transition>
  </div>
</template>

<script>
import img1 from '../../../../../../static/imgs/erro.png'
export default {
  data() {
    return {
      show_point: false,
      img1:img1
    };
  },
  methods: {
    back_() {
      this.$router.go(-1);
    },
    make_points_fun() {
        this.show_point = true;
    }
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
  z-index: 113;
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
/* 当前积分 */
.balance_wrap {
  width: 100%;
  height: 1.57rem;
  background: #3190e8;
  margin-top: 0.45rem;
  padding-top: 0.1rem;
}
.balance_wrap .current_balance {
  width: 95%;
  height: 93%;
  background: #fff;
  margin: 0 auto;
  border-radius: 0.05rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.1rem;
}
.current_text {
  display: flex;
  justify-content: space-between;
}
.current_text p {
  font-size: 0.14rem;
}
.current_text p:last-child {
  color: #3190e8;
}
.money_num_wrap b {
  font-size: 0.4rem;
  color: black;
}
.withdraw {
  width: 100%;
  height: 0.4rem;
  border: none;
  outline: none;
  background: #fe6d47;
  color: #fff;
  font-size: 0.17rem;
  border-radius: 0.05rem;
}
.balance_wrap .icon-wenhao {
  font-size: 0.16rem;
}
.detail_text {
  height: 0.47rem;
  padding: 0.1rem;
  font-size: 0.16rem;
  color: #999;
  padding-bottom: 1rem;
}
.detail_his {
  text-align: center;
}
.detail_his img {
  width: 1.87rem;
  height: 1.17rem;
}
.detail_his p {
  font-size: 0.17rem;
}
.detail_his .make_points {
  font-size: 0.12rem;
  color: #999;
}
/* 弹框样式 */
.prompt_wrap {
  display: flex;
  width: 2.81rem;
  height: 1.85rem;
  background: #fff;
  flex-direction: column;
  align-items: center;
  border-radius: 0.1rem;
  margin: 0 auto;
  position: fixed;
  top: 50%;
  margin-top: -0.92rem;
  left: 50%;
  margin-left: -1.4rem;
  overflow: hidden;
  z-index: 11;
}

.icon-gantanhao {
  font-size: 1rem;
  color: #f8cb86;
}
.prompt_wrap p {
  font-size: 0.18rem;
}
.OK_btn {
  width: 100%;
  height: 0.42rem;
  background: #4cd964;
  border: none;
  outline: none;
  position: absolute;
  bottom: 0;
  font-size: 0.18rem;
  font-weight: bolder;
  color: #fff;
}
/* 感叹号样式 */
.prompt_wrap .tip_icon {
  width: 0.7rem;
  height: 0.7rem;
  border: 0.015rem solid #f8cb86;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.2rem 0;
}
.prompt_wrap .tip_icon span:first-child {
  display: inline-block;
  width: 0.03rem;
  height: 0.35rem;
  background-color: #f8cb86;
  margin-bottom: 0.05rem;
}
.prompt_wrap .tip_icon span:last-child {
  display: inline-block;
  width: 0.04rem;
  height: 0.04rem;
  border: 1px;
  border-radius: 50%;
  margin-top: 0.02rem;
  background-color: #f8cb86;
}
</style>
