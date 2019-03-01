<template>
  <div>
    <!-- 头部 -->
    <ul class="header">
      <a @click="back_2()">
        <i class="header_home el-icon-arrow-left backButton"></i>
      </a>
      <span class="position_city">搜索</span>
      <!-- <router-link to="/home">
        <li class="header_login">切换城市</li>
      </router-link>-->
    </ul>
    <!-- 搜索框 -->
    <form class="search_wrap" v-on:submit.prevent="search_shop_list()">
      <div class="input_wrap">
        <input
          class="search_input"
          required
          type="text"
          placeholder="请输入商家或美食名称"
          v-model="search_food"
        >
        <input type="submit" value="提交查询" class="search_button">
      </div>
    </form>
    <!-- 搜索出来后的结果 -->
    <div class="search_wrapper">
      <div v-if="isShow">
        <p class="search_shops">商家</p>
        <div>
          <ul class="search_all">
            <li class="search_lists" v-for="(list, index) in shops_all" :key="index">
              <router-link :to="{name: 'shop', query:{id: shops_all[index].id}}">
                <div class="shops_img_wrap">
                  <img class="shops_img" :src="base_url_img + list.image_path" alt>
                </div>
                <div class="shops_text">
                  <span>{{list.name}}</span>
                  <span>支付</span>
                  <p>
                    月销
                    <span>{{list.recent_order_num}}</span>单
                  </p>
                  <p>
                    <span>{{list.float_minimum_order_amount}}</span>元起送 / 距离
                    <span>{{list.distance}}</span>
                  </p>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <p class="clear_history erro_msg" v-if="erro_msg">很抱歉! 无搜索结果</p>
      <div v-if="his_show">
        <p class="search_shops">搜索历史</p>
        <ul class="search_all">
          <li
            class="search_lists history_search"
            v-for="(his_list, index) in local_msg"
            :key="index"
          >
            <span class="show_searchHis" @click="his_search(index)">{{his_list}}</span>
            <span class="remove" @click="remove_history(index)">X</span>
          </li>
          <p class="clear_history" @click="remove_all()">清空历史记录</p>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search_food: "",
      shops_all: [],
      history_lists: [],
      // new_history: [],
      base_url_img: "//elm.cangdu.org/img/",
      isShow: false,
      erro_msg: false,
      his_show: false,
      search_history: [],
      local_msg: []
    };
  },
  watch: {
    search_food(new_msg, old_msg) {
      if (new_msg == "") {
        this.isShow = false;
        this.erro_msg = false;
        this.his_show = true;
      } else {
        this.his_show = false;
      }
    }
  },
  created() {
    // 页面开始渲染的时候就将展示历史记录
    let getLocal_his = localStorage.getItem("shopHistory");
    this.local_msg = JSON.parse(getLocal_his);
  },
  methods: {
    // 返回按钮方法
    back_2() {
      this.$router.go(-1);
    },
    //  删除历史记录方法
    remove_history(index) {
      // console.log(this.local_msg.length);
      if (this.local_msg.length == 1) {
        localStorage.removeItem("shopHistory");
        this.$store.state.new_history = [];
        this.his_show = false;
      }
      this.local_msg.pop(index, 1);
      let his_str = JSON.stringify(this.local_msg);
      localStorage.setItem("shopHistory", his_str);
    },
    // 清空所有历史记录
    remove_all() {
      this.his_show = false;
      this.local_msg = [];
      this.$store.state.new_history = [];
      localStorage.removeItem("shopHistory");
    },
    // 定义搜索的方法
    search_fun(geohash, food) {
      this.$http({
        method: "get",
        url:
          "https://elm.cangdu.org/v4/restaurants?geohash=" +
          geohash +
          "&keyword=" +
          food
      }).then(res => {
        console.log(res);
        this.shops_all = res.data;
        if (this.shops_all.length > 0) {
          this.isShow = !this.isShow;
        } else {
          this.erro_msg = !this.erro_msg;
        }
      });
    },
    // 点击历史记录后搜索
    his_search(index) {
      // this.his_show = false;
      this.search_fun(this.$store.state.geohash, this.local_msg[index]);
      this.search_food = this.local_msg[index];
    },
    // 点击搜索的方法
    search_shop_list() {
      if (this.search_food) {
        this.$store.state.new_history.push(this.search_food);
        console.log(this.$store.state.new_history);
        // var obj = this.$store.state.new_history;
        let temp = [];
        for (
          let index = 0;
          index < this.$store.state.new_history.length;
          index++
        ) {
          if (temp.indexOf(this.$store.state.new_history[index]) == -1) {
            temp.push(this.$store.state.new_history[index]);
          }
        }
        this.$store.state.new_history = temp;
        console.log("搜索页面最原始的历史记录", this.$store.state.new_history);
        // 将搜索的历史记录存进本地内存里
        let his_str = JSON.stringify(this.$store.state.new_history);
        localStorage.setItem("shopHistory", his_str);
        let getLocal_his = localStorage.getItem("shopHistory");
        this.local_msg = JSON.parse(getLocal_his);
        console.log("搜索页面存储后的数据", this.local_msg);

        // 调用搜索请求方法
        this.search_fun(this.$store.state.geohash, this.search_food);
      }
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
/* 搜索样式 */
.search_wrap {
  width: 100%;
  /* border-top: 0.01rem solid #e4e4e4; */
  /* border-bottom: 0.01rem solid #e4e4e4; */
  margin-top: 0.45rem;
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
  width: 78%;
  font-size: 0.15rem;
  text-indent: 0.1rem;
  padding: 0.06rem 0;
  outline: none;
  border: 1px solid #e4e4e4;
  border-radius: 0.02rem;
  margin-bottom: 0.1rem;
  background: #f5f5f5;
  font-weight: bold;
}
.search_wrap .search_button {
  width: 21%;
  height: 0.35rem;
  background: #3190e8;
  border: none;
  border-radius: 0.02rem;
  outline: none;
  font-size: 0.14rem;
  color: #fff;
  padding: 0.06rem 0.04rem;
}
/* 搜索列表展示 */
.search_wrapper {
  margin-bottom: 0.45rem;
}
.search_shops {
  height: 0.45rem;
  line-height: 0.45rem;
  text-indent: 0.2rem;
  font-size: 0.14rem;
  font-weight: bolder;
}
.search_lists {
  border-bottom: 0.01rem solid #e4e4e4;
  padding: 0.2rem 0.2rem;
  overflow: hidden;
}
.shops_img_wrap {
  float: left;
}
.shops_img_wrap .shops_img {
  width: 0.4rem;
}
.shops_text {
  float: left;
  margin-left: 0.1rem;
  width: 85%;
  font-size: 0.14rem;
  border-bottom: 0.01rem solid #e4e4e4;
  color: black;
}
.router-link-active {
  color: black !important;
}
/* 搜索历史记录样式 */
.show_searchHis {
  display: inline-block;
  width: 80%;
}
.search_lists.history_search {
  font-size: 0.18rem;
  padding: 0.1rem;
}
.search_lists.history_search .remove {
  float: right;
  font-size: 0.14rem;
  font-weight: bolder;
  color: rgb(153, 153, 153);
}
/* 清空历史记录 */
.clear_history {
  height: 0.45rem;
  line-height: 0.45rem;
  /* border-top: 0.01rem solid #e4e4e4; */
  text-align: center;
  color: #333;
  font-size: 0.16rem;
  color: #3190e8;
  font-weight: bolder;
}
.clear_history.erro_msg {
  color: #333;
  font-size: 0.15rem;
  background: #fff;
  border-top: 0.02rem solid #e4e4e4;
}
</style>
