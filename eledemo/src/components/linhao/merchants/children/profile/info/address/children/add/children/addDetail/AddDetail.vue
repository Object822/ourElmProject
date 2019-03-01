<template>
  <div>
    <div class="info_wrap">
      <!-- 头部 -->
      <ul class="header">
        <a>
          <i class="header_home el-icon-arrow-left backButton" @click="back_()"></i>
        </a>
        <span class="position_city">搜索地址</span>
      </ul>
      <!-- 搜索框 -->
      <form class="search_wrap animated fadeInRight faster" v-on:submit.prevent="search_Addr()">
        <div class="input_wrap">
          <input
            class="search_input"
            required
            type="text"
            placeholder="请输入小区/写字楼/学校等"
            v-model="search_msg"
          >
          <input type="submit" value="确定" class="search_button">
        </div>
      </form>
      <p class="hint_msg">为了满足商家的送餐要求，建议您从列表中选择地址</p>
      <!-- 搜索的记录 -->
      <div v-if="show_his">
        <ul class="search_all">
          <li
            class="search_lists"
            v-for="(list, index) in search_lists"
            :key="index"
            @click="add_msg(index)"
          >
            <p class="search_name">{{list.name}}</p>
            <p class="search_address">{{list.address}}</p>
          </li>
        </ul>
      </div>
      <div class="message_wrap" v-else>
        <p>找不到地址？</p>
        <p>请尝试输入小区、写字楼或学校名</p>
        <p>详细地址（如门牌号）可稍后输入哦。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search_msg: "",
      cityId: "",
      search_lists: "",
      show_his: false
    };
  },
  //   watch: {
  //     $route(to, from) {
  //       this.$router.go(0);
  //     }
  //   },
  created() {
    let id = localStorage.getItem("cityID");
    this.cityId = JSON.parse(id);
    // this.cityId = this.$store.state.city_id;
  },
  methods: {
    back_() {
      // this.$router.go(-1);
      this.$router.push({
        name:"add"
      });
    },
    add_msg(index) {
      this.$store.state.city_address = this.search_lists[index];
      console.log(this.$store.state.city_address);
      if (this.$store.state.city_address) {
        this.$router.push({
          name: "add"
        });
      }
    },
    //  发送搜索请求
    search_Addr() {
      console.log(111);
      // console.log("输入框数据", this.search_msg);
      if (this.search_msg) {
        this.$http({
          method: "get",
          url:
            "https://elm.cangdu.org/v1/pois?city_id=" +
            this.cityId +
            "&keyword=" +
            this.search_msg
        }).then(res => {
          console.log("搜索的所有信息", res.data);
          this.search_lists = res.data;
          // 判断如果数组长度为0的话, 就显示无法搜索结果页面
          if (this.search_lists.length > 0) {
            this.show_his = true;
          } else {
            this.show_his = false;
          }
        });
      }
    }
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
  z-index: 444;
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
  z-index: 444;
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
  width: 80%;
  font-size: 0.16rem;
  text-indent: 0.1rem;
  padding: 0.1rem 0;
  outline: none;
  border: 1px solid #ddd;
  border-radius: 0.02rem;
  margin-bottom: 0.1rem;
  background: #f2f2f2;
}
.search_wrap .search_button {
  width: 18%;
  height: 0.4rem;
  background: #3190e8;
  border: none;
  border-radius: 0.02rem;
  outline: none;
  font-size: 0.16rem;
  color: #fff;
}

.hint_msg {
  height: 0.35rem;
  line-height: 0.35rem;
  color: #ff883f;
  background: #fff6e4;
  font-size: 0.15rem;
  text-align: center;
}
.message_wrap {
  width: 100%;
  /* height: 2rem; */
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -30%);
}
.message_wrap p {
  width: 100%;
  text-align: center;
  font-size: 0.18rem;
  color: #969696;
  margin-bottom: 0.15rem;
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
</style>
