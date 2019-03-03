<template>
  <div>
    <!-- logo -->
    <div class="header">
      <div class="boult">
        <span class="el-icon-arrow-left" @click="go()"></span>
      </div>
      <span>搜索</span>
    </div>
    <form class="seek">
      <input v-model="search" type="text" placeholder="请输入/小区/写字楼/学校等">
      <el-button type="primary" class="bot" @click="bot()">搜索</el-button>
    </form>
    <div v-if="cityinfo==null" class="empty">
      <p>找不到地址?</p>
      <p>尝试输入小区、写字楼或学校名</p>
      <p>详细地址(如门牌号等)可稍后输入哦!!!</p>
    </div>
    <!-- 结果 -->
    <li v-for="(value,index) in cityinfo" :key="index" class="liove" @click="ko(value.name)">
      <h3>{{value.name}}</h3>
      <p>{{value.address}}</p>
      <div class="sold1"></div>
    </li>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityinfo: null,
      search: null
    };
  },
  //         watch: {
  //     $route(to, from) {
  //       this.$router.go(0);
  //     }
  //   },
  methods: {
    go() {
      this.$router.go(-1);
    },
    bot() {
      this.$http({
        method: "get",
        url:
          "https://elm.cangdu.org/v1/pois?city_id=1&keyword=" +
          this.search +
          "&type=search"
      }).then(res => {
        if (res.data.length > 0) {
          this.cityinfo = res.data;
        } else {
          this.cityinfo = null;
        }
      });
    },
    ko(name) {
      this.$router.push({
        name: "register",
        params: {
          name: name
        }
      });
      this.$forceUpdate();
    }
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  height: 0.5rem;
  background-color: #3190e8;
}

.header span {
  text-align: center;
  position: absolute;
  left: 50%;
  top: 25%;
  margin-left: -25%;
  width: 50%;
  font-size: 0.18rem;
  color: white;
}

.boult {
  position: absolute;
  top: 0.1rem;
  left: 0.2rem;
}

.seek {
  padding-top: 1rem;
}

.seek input {
  width: 2.5rem;
  height: 0.35rem;
  margin-left: 0.2rem;
  height: 0.4rem;
  font-size: 0.15rem;
  border-radius: 0.05rem;
  outline: none;
}

.bot {
  margin-left: 0.1rem;
  height: 0.4rem;
}

.empty {
  text-align: center;
  color: #aaa;
  margin-top: 2rem;
}

.empty p {
  padding: 0.03rem;
}

.liove {
  margin-left: 0.2rem;
}

.liove h3 {
  margin: 0.2rem;
}

.liove p {
  margin-left: 0.2rem;
  font-size: 0.15rem;
  color: #aaa;
}

.sold1 {
  border-bottom: 0.01rem solid #aaa;
  width: 90%;
  padding-top: 0.09rem;
  margin: 0 auto;
}
</style>
