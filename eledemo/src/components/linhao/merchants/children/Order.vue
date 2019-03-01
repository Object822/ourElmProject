<template>
  <div>
    <!-- 头部 -->
    <ul class="header">
      <a @click="back_3()">
        <i class="header_home el-icon-arrow-left backButton"></i>
      </a>
      <span class="position_city">订单列表</span>
      <!-- <router-link to="/home">
        <li class="header_login">切换城市</li>
      </router-link>-->
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    back_3() {
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
</style>
