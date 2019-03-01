<template>
  <div>
    <!-- 头部 -->
    <ul class="header">
      <router-link to="/">
        <li class="header_home">ele.me</li>
      </router-link>
      <router-link to="/profile">
        <i v-if="$store.state.user_msg" class="iconfont icon-wode header_login search"></i>
      </router-link>
      <router-link to="/login">
        <li v-if="!$store.state.user_msg" class="header_login" id="user_login">登录|注册</li>
      </router-link>
    </ul>
    <!-- 当前定位城市 -->
    <div class="position_city">
      <div class="position">
        <span class="success_city">当前定位城市:</span>
        <span class="erro_city">定位不准时，请在城市列表中选择</span>
      </div>
      <router-link :to="{name: 'city', params:{id: position_id}}">
        <div class="city_show">
          <span class="city_now">{{position_city}}</span>
          <span class="go_city">
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
      </router-link>
    </div>
    <!-- 热门城市 -->
    <ul class="hot_city">
      <p class="hot_text">热门城市</p>
      <li>
        <el-row>
          <el-col :span="6" v-for="(hot_city, index) in hot_citys" :key="index">
            <router-link :to="{name: 'city', params:{id: hot_city.id}}">
              <div class="grid-content bg-purple city_wrap">
                <span class="hotCity_name">{{hot_city.name}}</span>
              </div>
            </router-link>
          </el-col>
        </el-row>
      </li>
    </ul>
    <!-- 所有城市列表 -->
    <ul class="citys_wtap">
      <li v-for="(city_key, index) in city_keys" :key="index">
        <h4 class="city_title">
          {{city_key}}
          <span class="A_msg" v-if="index == 0">{{msg}}</span>
        </h4>
        <ul>
          <li class="city_list">
            <el-row>
              <el-col :span="6" v-for="(city, index) in citys_msg[city_key]" :key="index">
                <router-link :to="{name: 'city', params:{id: city.id}}">
                  <div class="grid-content bg-purple city_wrap">
                    <span class>{{city.name}}</span>
                  </div>
                </router-link>
              </el-col>
            </el-row>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      position_id: null,
      position_city: "",
      hot_citys: "",
      all_citys: [],
      city_keys: [],
      citys_msg: null,
      msg: "（按字母排序）"
    };
  },
  methods: {
    sort_key(data) {
      this.city_keys = Object.keys(data).sort();
    }
  },
  created() {
    // 开始请求定位城市
    this.$http({
      method: "get",
      url: "https://elm.cangdu.org/v1/cities?type=guess"
    }).then(res => {
      //   console.log(res.data);
      this.position_city = res.data.name;
      this.position_id = res.data.id;
    });
    // 请求热门城市
    this.$http({
      method: "get",
      url: "https://elm.cangdu.org/v1/cities?type=hot"
    }).then(res => {
      //   console.log(res.data);
      this.hot_citys = res.data;
    });
    // 请求所有城市
    this.$http({
      method: "get",
      url: "https://elm.cangdu.org/v1/cities?type=group"
    }).then(res => {
      //   console.log(res.data);
      this.citys_msg = res.data;
      this.city_id = res.data.id;
      this.sort_key(res.data);
    });
    // 进入页面看看有没有用户登录缓存
    let get_user = localStorage.getItem("user_data");
    this.$store.state.user_msg = JSON.parse(get_user);
    console.log(this.$store.state.user_msg);
  }
};
</script>
<style scoped>
/* 头部样式 */
.header {
  position: fixed;
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
}
.header_login {
  float: right;
}
/* 定位城市样式 */
.position_city {
  padding-top: 0.45rem;
  margin-bottom: 0.12rem;
  background: #fff;
}
.position,
.city_show {
  height: 0.45rem;
  padding: 0 0.1rem;
}
.position {
  font-size: 0.12rem;
  line-height: 0.55rem;
  border-bottom: 0.01rem solid #e4e4e4;
}
.success_city {
  color: #666;
}
.position .erro_city {
  height: 100%;
  color: #9f9f9f;
  font-weight: bold;
  float: right;
}
.city_show {
  line-height: 0.45rem;
  border-bottom: 0.02rem solid #e4e4e4;
}
.city_show .city_now {
  font-size: 0.18rem;
  color: #3190e8;
}
.city_show .go_city .el-icon-arrow-right {
  float: right;
  font-size: 0.18rem;
  line-height: 0.45rem;
  font-weight: bold;
  color: #999;
}
/* 热门城市 */
.hot_city {
  border-top: 0.02rem solid #e4e4e4;
  margin-bottom: 0.12rem;
  background: #fff;
}
.hot_city .hot_text {
  height: 0.34rem;
  padding: 0 0.1rem;
  line-height: 0.38rem;
  font-size: 0.14rem;
  color: #666;
  border-bottom: 0.01rem solid #e4e4e4;
}
.hotCity_name {
  display: inline-block;
  width: 100%;
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: center;
  border: 0.001rem solid #e4e4e4;
  font-size: 0.14rem;
  color: #3190e8;
}
/* 所有城市 */
.citys_wtap {
  border-top: 0.02rem solid #e4e4e4;
  background: #fff;
}
.city_list {
  border-bottom: 0.02rem solid #e4e4e4;
}
.city_title {
  height: 0.34rem;
  line-height: 0.34rem;
  padding-left: 0.1rem;
  color: #666;
  font-size: 0.13rem;
}
.city_title .A_msg {
  color: #999;
  font-size: 0.12rem;
}
.city_wrap {
  width: 100%;
  height: 100%;
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: center;
  border: 0.001rem solid #e4e4e4;
  font-size: 0.14rem;
  color: #333;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.icon-wode.search {
  font-size: .18rem;
}
</style>
