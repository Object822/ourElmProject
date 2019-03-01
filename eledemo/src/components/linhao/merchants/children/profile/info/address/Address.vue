<template>
  <div>
    <div class="info_wrap animated fadeInRight faster">
      <!-- 头部 -->
      <ul class="header">
        <a>
          <i class="header_home el-icon-arrow-left backButton" @click="back_()"></i>
        </a>
        <span class="position_city">编辑地址</span>
        <li class="header_login" v-if="done" @click="doneOrwrite()">完成</li>
        <li class="header_login" v-else @click="doneOrwrite()">编辑</li>
      </ul>
      <ul class="adress_wrap">
        <li
          class="address_lists"
          v-for="(shop, index) in shipping_address"
          :key="index"
          :class="[index==0?orange_color:'']"
        >
          <div>
            <p>{{shop.address}}</p>
            <p>{{shop.phone}}</p>
            <p class="remove" v-if="done" @click="remove_addr(index)">X</p>
          </div>
        </li>
      </ul>
      <router-link to="/profile/info/address/add">
        <p class="add_address">
          <span>新增地址</span>
          <i class="iconfont icon-you"></i>
        </p>
      </router-link>
      <!-- <transition name="router-slid" mode="out-in"> -->
      <router-view :key="key"></router-view>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      done: false,
      users_MSG: "",
      userID: "",
      shipping_address: "",
      orange_color: "orange_color"
    };
  },
  created() {
    // 从本地获取用户信息
    let usersInfo = localStorage.getItem("user_data");
    this.users_MSG = JSON.parse(usersInfo);
    this.userID = this.users_MSG.user_id;

    this.$http({
      method: "GET",
      url: "https://elm.cangdu.org/v1/users/" + this.userID + "/addresses"
    }).then(res => {
      if (res.status !== 0 && res.statusText == "OK") {
        this.shipping_address = res.data;
        this.shipping_address = this.shipping_address.reverse();
        console.log(this.shipping_address);
      }
    });
  },
  computed: {
    key() {
      return this.$route.path + Math.random();
    }
  },
  methods: {
    back_() {
      // this.$router.go(-1);
      this.$router.push({
        name: "info"
      });
    },
    doneOrwrite() {
      this.done = !this.done;
    },
    remove_addr(index) {
      console.log(index);
      this.$http({
        method: "DELETE",
        url:
          "https://elm.cangdu.org/v1/users/" +
          this.userID +
          "/addresses/" +
          this.shipping_address[index].id
      }).then(res => {
        console.log(res.data);
        if (res.status !== 0 && res.statusText == "OK") {
          this.shipping_address.splice(index, 1);
        }
      });
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
  /* overflow-y: scroll;
  overflow-x: hidden; */
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
.header_login {
  float: right;
}
/* 地址列表 */
.adress_wrap {
  margin-top: 0.6rem;
  margin-bottom: 0.1rem;
  border-top: 0.01rem solid #e4e4e4;
}
.add_address {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  border-top: 0.01rem solid #e4e4e4;
  border-bottom: 0.01rem solid #e4e4e4;
  display: flex;
  justify-content: space-between;
  background: #fff;
}
.address_lists {
  width: 100%;
  height: 0.6rem;
  /* line-height: .6rem; */
  border-bottom: 0.01rem solid #e4e4e4;
  background: #fff;
  position: relative;
}
.address_lists p {
  font-size: 0.14rem;
  margin-left: 0.1rem;
  height: 0.2rem;
  /* margin-top: 0.05rem; */
  padding: 0.1rem 0;
}
.address_lists .remove {
  width: 0.1rem;
  height: 80%;
  position: absolute;
  right: 4%;
  top: 11%;
  z-index: 123;
}
.add_address span {
  font-size: 0.17rem;
  margin-left: 0.1rem;
  color: black;
}
.add_address .icon-you {
  font-size: 0.2rem;
  margin-right: 0.1rem;
  color: #999;
}
.orange_color {
  background: #fff8c3;
}

/* .router-slid-enter-active,
.router-slid-leave-active {
  transition: all 0.4s;
}
.router-slid-enter,
.router-slid-leave-active {
  transform: translate(100%);
  opacity: 0;
} */
</style>
