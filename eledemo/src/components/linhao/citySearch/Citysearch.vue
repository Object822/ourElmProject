<template>
  <div>
    <!-- 头部 -->
    <ul class="header">
      <router-link to="/home">
        <i class="header_home el-icon-arrow-left"></i>
      </router-link>
      <span class="position_city">{{position_city}}</span>
      <router-link to="/home">
        <li class="header_login">切换城市</li>
      </router-link>
    </ul>
    <!-- 搜索框 -->
    <form class="search_wrap" v-on:submit.prevent="search">
      <div class="input_wrap">
        <input
          class="search_input"
          required
          type="text"
          placeholder="输入学校、商务楼、地址"
          v-model="search_msg"
        >
      </div>
      <div>
        <input type="submit" value="提交" class="search_button">
      </div>
    </form>

    <!-- 搜索的记录 -->
    <div>
      <p class="old_search" v-if="old_flag">搜索历史</p>
      <p class="erro_msg" v-if="erro_flag">很抱歉! 无法搜索结果</p>
      <ul class="search_all">
        <li
          class="search_lists"
          v-for="(list, index) in search_lists"
          :key="index"
          @click="addHistory(index)"
        >
          <router-link :to="{name: 'merchant', query:{geohash: search_lists[index].geohash}}">
            <p class="search_name">{{list.name}}</p>
            <p class="search_address">{{list.address}}</p>
          </router-link>
        </li>
      </ul>
      <!-- 展示历史记录 -->
      <!-- <router-view></router-view> -->
      <ul v-if="show_history" class="history_all">
        <li class="search_lists" v-for="(item, index) in local_data" :key="index">
          <router-link :to="{name: 'merchant', query:{geohash: local_data[index].geohash}}">
            <p class="search_name">{{item.name}}</p>
            <p class="search_address">{{item.address}}</p>
          </router-link>
        </li>
        <p class="clear_history" @click="clear_history">清空所有</p>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      position_city: "",
      search_msg: "",
      search_lists: [],
      old_flag: true,
      erro_flag: false,
      local_data: [],
      show_history: false,
    };
  },
  methods: {
    //  发送搜索请求
    search() {
      // console.log("输入框数据", this.search_msg);
      if (this.search_msg) {
        this.$http({
          method: "get",
          url:
            "https://elm.cangdu.org/v1/pois?city_id=" +
            this.$route.params.id +
            "&keyword=" +
            this.search_msg
        }).then(res => {
          console.log("搜索的所有信息", res.data);
          this.search_lists = res.data;
          this.old_flag = false;
          this.show_history = false;
          // 判断如果数组长度为0的话, 就显示无法搜索结果页面
          if (this.search_lists.length == 0) {
            this.erro_flag = true;
          } else {
            this.erro_flag = false;
          }
        });
      }
    },
    // 定义去重方法
    unique(arr) {
      const res = new Map();
      return arr.filter(arr => !res.has(arr.name) && res.set(arr.name, 1));
    },
    // // 绑定点击后添加历史记录方法
    addHistory(index) {
      console.log(index);
      this.$store.state.historys.push(this.search_lists[index]);
      console.log("最原始数据", this.$store.state.historys);
      // 保存新的去重数组
      this.$store.state.historys = this.unique(this.$store.state.historys);
      console.log("去重后新的数据", this.$store.state.historys);
      let myJsonString = JSON.stringify(this.$store.state.historys);
      localStorage.setItem("History", myJsonString);
      let getLocal = localStorage.getItem("History");
      this.local_data = JSON.parse(getLocal);
      // this.local_data = obj;
      console.log("存储后的数据", this.local_data);
      // this.$store.state.address_msg = this.local_data;
      // console.log("本地存储地址的记录", this.$store.state.address_msg);
    },
    // 绑定清空所有的方法
    clear_history() {
      this.show_history = !this.show_history;
      this.local_data = [];
      localStorage.removeItem("History");
    }
  },
  created() {
    if (localStorage.getItem("History")) {
      this.show_history = !this.show_history;
    }
    var getLocal = localStorage.getItem("History");
    var obj = JSON.parse(getLocal);
    this.local_data = obj;

    // 接收路由传过来的城市id存储在state里
    this.$store.state.city_id = this.$route.params.id;
    localStorage.setItem("cityID", JSON.stringify(this.$route.params.id));

    // console.log(this.$route.params.id);
    // console.log("历史记录", this.history);
    // 请求点击后的城市列表
    this.$http({
      method: "get",
      url: "https://elm.cangdu.org/v1/cities/" + this.$route.params.id
    }).then(res => {
      console.log(res);
      this.position_city = res.data.name;
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
.header .header_login {
  font-size: 0.13rem;
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
/* 搜索样式 */
.search_wrap {
  border-top: 0.01rem solid #e4e4e4;
  border-bottom: 0.01rem solid #e4e4e4;
  margin-top: 0.55rem;
  text-align: center;
  padding: 0.1rem 0.2rem;
  background: #fff;
}
.search_all {
  background: #fff;
}
.history_all {
  background: #fff;
}
.search_wrap .search_input {
  width: 100%;
  font-size: 0.16rem;
  text-indent: 0.1rem;
  padding: 0.1rem 0;
  outline: none;
  border: 1px solid #e4e4e4;
  border-radius: 0.02rem;
  margin-bottom: 0.1rem;
}
.search_wrap .search_button {
  width: 100%;
  height: 0.4rem;
  background: #3190e8;
  border: none;
  border-radius: 0.02rem;
  outline: none;
  font-size: 0.16rem;
  color: #fff;
}
/* 搜索历史 */
.old_search {
  padding: 0.02rem 0.1rem;
  font-size: 0.12rem;
  /* height: 0.15rem; */
  line-height: 0.15rem;
  border: 0.01rem solid #e4e4e4;
  /* background: #f5f5f5; */
}
.search_lists {
  border-top: 0.01rem solid #e4e4e4;
  padding: 0.1rem 0.2rem;
  /* height: 0.45rem; */
  line-height: 0.25rem;
}
.search_lists .search_name {
  font-size: 0.15rem;
  color: black;
}
.search_lists .search_address {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.1rem;
  color: #9f9f9f;
}
/* 清空历史记录 */
.clear_history {
  height: 0.45rem;
  line-height: 0.45rem;
  border-top: 0.01rem solid #e4e4e4;
  text-align: center;
  color: #333;
  font-size: .16rem;
}
.erro_msg {
  height: 0.45rem;
  line-height: 0.45rem;
  border-top: 0.01rem solid #e4e4e4;
  background: #fff;
  text-indent: 0.2rem;
}
</style>