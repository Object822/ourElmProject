<template>
  <div>
    <!-- 头部 -->
    <ul class="header">
      <a>
        <i class="header_home el-icon-arrow-left backButton" @click="back_()"></i>
      </a>
      <span class="position_city">我的余额</span>
    </ul>
    <!-- 当前余额 -->
    <div class="balance_wrap">
      <div class="current_balance">
        <div class="current_text">
          <p>当前余额</p>
          <p>
            <i class="iconfont icon-wenhao"></i>
            <router-link to>
              <span>余额说明</span>
            </router-link>
          </p>
        </div>
        <div class="money_num_wrap">
          <b>0.00</b>元
        </div>
        <div>
          <button class="withdraw">提现</button>
        </div>
      </div>
    </div>
    <!-- 明细记录 -->
    <div>
      <p class="detail_text">交易明细</p>
      <div class="detail_his">
        <img class :src="img1" alt>
        <p>暂无明细记录</p>
      </div>
    </div>
  </div>
</template>

<script>
import img1 from "../../../../../../static/imgs/erro.png";
export default {
  data() {
    return {
      img1: img1
    };
  },
  methods: {
    back_() {
      this.$router.go(-1);
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
/* 当前余额 */
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
  background: #ccc;
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
</style>
