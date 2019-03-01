<template>
  <div>
    <div class="info_wrap animated fadeInRight faster">
      <!-- 头部 -->
      <ul class="header">
        <a>
          <i class="header_home el-icon-arrow-left backButton" @click="back_()"></i>
        </a>
        <span class="position_city">修改用户名</span>
      </ul>

      <div class="change_username">
        <div class="user_wrap">
          <input
            :class="{red_border: show_erro}"
            type="text"
            placeholder="输入用户名"
            v-model="change_username"
          >
        </div>
        <p class="erro_text" v-if="show_erro">用户名长度在5到24位之间</p>
        <p class="black_text" v-else>用户名只能修改一次（5-24字符之间）</p>
        <div class="make_sure_wrap">
          <button class="make_sure" @click="make_sure()" :disabled="show_erro">确认修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      change_username: "",
      show_erro: false,
      red_border: "red_border",
      user_name: ""
    };
  },
  created() {
    var userName;
    if (localStorage.getItem("user_data")) {
      let get_user = localStorage.getItem("user_data");
      this.user_name = JSON.parse(get_user);
      // console.log(this.user_name);
      // userName = this.user_name.username;
    }
  },
  watch: {
    change_username(val) {
      if (val.length < 5) {
        this.show_erro = true;
      } else {
        this.show_erro = false;
      }
    }
  },
  methods: {
    back_() {
      // this.$router.go(-1);
      this.$router.push({
        name:"info"
      });
    },
    make_sure() {
      console.log("点击");
      if (this.change_username.length >= 5) {
        this.user_name.username = this.change_username;
        let user = JSON.stringify(this.user_name);
        localStorage.setItem("user_data", user);
        this.$router.push({
          name: "info"
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
  z-index: 333;
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
/* 修改框 */
.change_username {
  margin-top: 0.55rem;
}
.user_wrap {
  width: 95%;
  height: 0.45rem;
  margin: 0 auto;
}
.user_wrap input {
  width: 100%;
  height: 100%;
  font-size: 0.2rem;
  background: #f5f5f5;
  border: 0.01rem solid #e4e4e4;
  outline: none;
}
.change_username .black_text {
  height: 0.3rem;
  line-height: 0.3rem;
  padding-bottom: 0.4rem;
  font-size: 0.1rem;
  transform: scale(0.7);
  color: black;
  margin-left: -0.5rem;
}
.erro_text {
  margin-left: 0.1rem;
  font-size: 0.15rem;
  color: red;
  padding: 0.1rem 0 0.3rem;
}
.make_sure_wrap {
  text-align: center;
}
.make_sure {
  width: 95%;
  height: 0.42rem;
  background: #3199e8;
  color: #fff;
  border: none;
  outline: none;
}
.user_wrap .red_border {
  border: 0.01rem solid red;
}
</style>
