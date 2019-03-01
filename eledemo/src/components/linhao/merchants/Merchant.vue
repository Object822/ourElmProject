<template>
  <div>
    <keep-alive>
      <transition name="nav" mode="out-in">
        <router-view></router-view>
      </transition>
    </keep-alive>
    <div class="navigation">
      <el-row type="flex" align="middle">
        <el-col :span="6">
          <router-link :to="{name: 'take_out', query:{geohash: address_history[0].geohash}}">
            <div class="grid-content bg-purple text_wrap">
              <p class="iconfont icon-SSS"></p>
              <span class="navigation_text">外卖</span>
            </div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link :to="{name: 'search', query:{geohash: address_history[0].geohash}}">
            <div class="grid-content bg-purple-light text_wrap">
              <p class="iconfont icon-zhinanzhen1"></p>
              <span class="navigation_text">搜索</span>
            </div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link to="/order">
            <div class="grid-content bg-purple text_wrap">
              <p class="iconfont icon-icon-"></p>
              <span class="navigation_text">订单</span>
            </div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link to="/profile">
            <div class="grid-content bg-purple-light text_wrap">
              <p class="iconfont icon-wode"></p>
              <span class="navigation_text">我的</span>
            </div>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      address_history: []
    };
  },
  created() {
    let getLocal = localStorage.getItem("History");
    this.address_history = JSON.parse(getLocal);
    console.log("打印本地存储的地址", this.address_history);
  }
};
</script>

<style scoped>
.nav-enter-active,
.nav-leave-active {
  transition: all 0.3s;
}
.nav-enter,
.nav-leave-to {
  opacity: 0;
}
.navigation {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.45rem;
  z-index: 111;
  /* line-height: 0.45rem; */
  background: #fff;
  text-align: center;
  box-shadow: 0 -0.02667rem 0.05333rem rgba(0, 0, 0, 0.1);
}
.el-row,
.text_wrap {
  height: 100%;
  /* padding-top: 0.02rem; */
  color: #666;
}
.iconfont {
  font-size: 0.2rem;
}
.navigation .navigation_text {
  font-size: 0.045rem;
}
.router-link-active .iconfont {
  color: #3190e8 !important;
}
</style>
