<template>
  <div>
    <!-- 头部 -->
    <ul class="header">
      <a @click="back_()">
        <i class="header_home el-icon-arrow-left backButton"></i>
      </a>
      <span class="position_city">密码登录</span>
    </ul>
    <!-- 登录框 -->
    <div class="login_wrap">
      <div class="username public_inp">
        <input type="text" placeholder="账号" v-model="username">
      </div>
      <div class="password public_inp">
        <input type="text" v-if="show_psw" placeholder="密码" v-model="password">
        <input type="password" placeholder="密码" v-else v-model="password">
        <el-switch v-model="show_psw" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
      <div class="public_inp verification_code_wrap">
        <input type="text" placeholder="验证码" v-model="codeUser">
        <div class="verification_code">
          <img :src="code&&code" alt>
        </div>
        <div class="code_wrap">
          <p>看不清</p>
          <p class="change_code" @click="getCode()">换一张</p>
        </div>
      </div>
    </div>
    <p class="marked_words">温馨提示：未注册过的账号，登录时将自动注册</p>
    <p class="marked_words">注册过的用户可凭账号密码登录</p>
    <!-- 登录 -->
    <div class="go_btn_wrap">
      <button class="go_btn" @click="login()">登录</button>
    </div>
    <div class="res_psw">
      <router-link to="/forget">
        <p>重置密码?</p>
      </router-link>
    </div>

    <!-- 弹框 -->
    <transition name="show" enter-active-class="animated heartBeat fast">
      <div class="prompt_wrap" v-if="show_prompt">
        <div class="tip_icon">
          <span></span>
          <span></span>
        </div>
        <p class="alert_text">{{alert_text}}</p>
        <button class="OK_btn" @click="suer_btn">确认</button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show_prompt: false,
      show_psw: false,
      alert_text: "密码错误",
      code: "",
      username: "",
      password: "",
      codeUser: "",
    };
  },
  created() {
    this.getCode();
  },
  methods: {
    back_() {
      this.$router.go(-1);
    },
    suer_btn() {
      this.show_prompt = false;
    },
    // 请求验证码
    getCode() {
      this.$http({
        method: "post",
        url: "https://elm.cangdu.org/v1/captchas",
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
        withCredentials: true // 默认false
      }).then(res => {
        console.log("返回请求验证码的信息", res);
        if (res.status == 200 && res.statusText == "OK") {
          this.code = res.data.code;
        }
      });
    },
    // 登录
    login() {
      if (this.username == "") {
        this.show_prompt = true;
        this.alert_text = "请输入手机号/邮箱/用户名";
      } else if (this.password == "") {
        this.show_prompt = true;
        this.alert_text = "请输入密码";
      } else if (this.codeUser == "") {
        this.show_prompt = true;
        this.alert_text = "请输入验证码";
      } else {
        this.$http({
          method: "post",
          url: "https://elm.cangdu.org/v2/login",
          data: {
            username: this.username,
            password: this.password,
            captcha_code: this.codeUser
          },
          withCredentials: true
        }).then(res => {
          console.log("返回的请求登录信息:", res);
          // console.log("返回的请求登录信息:",res.data);
          if (res.data.message == "验证码不正确") {
            // alert(res.data.message);
            this.show_prompt = true;
            this.alert_text = res.data.message;
          } else if (res.data.status == 0) {
            this.show_prompt = true;
            this.alert_text = "密码错误";
          } else {
            // 登录成功后开始跳转到用户信息页面
            this.$router.push({
              // 需要跳转的路由地址
              name: "profile"
            });
            //   存储本地并改变登录状态
            this.$store.state.login = true;
            this.$store.state.user_data = res.data;
            console.log(this.$store.state.user_data);
            let user = JSON.stringify(this.$store.state.user_data);
            localStorage.setItem("user_data", user);
          }
        });
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
/* 登录框 */
.login_wrap {
  width: 100%;
  height: 1.47rem;
  margin-top: 0.6rem;
}
.public_inp {
  width: 100%;
  height: 0.48rem;
  background: #fff;
  padding: 0.1rem 0.2rem;
  border-bottom: 0.01rem solid #f1f1f1;
}
.public_inp input {
  font-size: 0.18rem;
  outline: none;
  border: none;
}
.login_wrap .verification_code_wrap {
  display: flex;
  justify-content: center;
}
.verification_code {
  width: 0.82rem;
  height: 0.35rem;
}
.verification_code img {
  width: 100%;
  height: 100%;
}
.code_wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.1rem;
}
.code_wrap p {
  width: 0.38rem;
  font-size: 0.12rem;
}
.change_code {
  color: #3b95e9;
}
/* 提示语 */
.marked_words {
  height: 0.3rem;
  margin-left: 0.2rem;
  line-height: 0.3rem;
  color: red;
}
.go_btn_wrap {
  text-align: center;
}
.go_btn {
  width: 90%;
  height: 0.45rem;
  background: #4cd964;
  border: none;
  outline: none;
  border-radius: 0.05rem;
  margin-bottom: 0.3rem;
  font-size: .16rem;
  color: #fff;
}
.res_psw {
  display: flex;
  justify-content: flex-end;
  margin-right: 0.2rem;
  font-size: 0.14rem;
  color: #3190e8;
}
/* 弹框样式 */
.prompt_wrap {
  display: flex;
  width: 2.81rem;
  height: 1.85rem;
  background: #fff;
  flex-direction: column;
  align-items: center;
  border-radius: 0.1rem;
  margin: 0 auto;
  position: fixed;
  top: 50%;
  margin-top: -0.92rem;
  left: 50%;
  margin-left: -1.4rem;
  overflow: hidden;
  z-index: 11;
}

.icon-gantanhao {
  font-size: 1rem;
  color: #f8cb86;
}
.prompt_wrap p {
  font-size: 0.18rem;
}
.OK_btn {
  width: 100%;
  height: 0.42rem;
  background: #4cd964;
  border: none;
  outline: none;
  position: absolute;
  bottom: 0;
  font-size: 0.18rem;
  font-weight: bolder;
  color: #fff;
}
/* 感叹号样式 */
.prompt_wrap .tip_icon {
  width: 0.7rem;
  height: 0.7rem;
  border: 0.015rem solid #f8cb86;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.2rem 0;
}
.prompt_wrap .tip_icon span:first-child {
  display: inline-block;
  width: 0.03rem;
  height: 0.35rem;
  background-color: #f8cb86;
  margin-bottom: 0.05rem;
}
.prompt_wrap .tip_icon span:last-child {
  display: inline-block;
  width: 0.04rem;
  height: 0.04rem;
  border: 1px;
  border-radius: 50%;
  margin-top: 0.02rem;
  background-color: #f8cb86;
}
.el-switch {
  margin-left: .72rem;
}
</style>

