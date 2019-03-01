<template>
  <div class="body1">
    <div class="header">
      <div class="asideIn">
        <div class="one" v-on:click="previousPage"></div>
        <div class="mine">密码登录</div>
        <div></div>
      </div>
    </div>
    <div class="login">
      <section>
        <input v-model="username" type="text" placeholder="搜索">
      </section>

      <section>
        <input v-model="passwold3" type="text" placeholder="密码">
      </section>
      <section>
        <input v-model="captcha_code" type="text" placeholder="验证码">
        <div class="tow">
          <img :src="code">
          <div v-on:click="change()">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
    </div>

    <p class="prompt">温馨提示:没有登录过的账号;登录将自动注册</p>
    <p class="prompt">注册过的用户可凭账号密码登录</p>
    <div @click="loginLast()" class="loginLast">登录</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: null,
      passwold3: null,
      captcha_code: null,
      code: null
    };
  },
  methods: {
    previousPage() {
      this.$router.go(-1);
    },
    change() {
      this.$http({
        method: "post",
        url: "https://elm.cangdu.org/v1/captchas",
        withCredentials: true
      }).then(response => {
        this.code = response.data.code;
      });
    },
    loginLast() {
      if (this.username && this.passwold3 && this.captcha_code) {
        this.$http({
          method: "post",
          url: "https://elm.cangdu.org/v2/login",
          data: {
            username: this.username,
            password: this.passwold3,
            captcha_code: this.captcha_code
          },
          withCredentials: true
        }).then(response => {
          console.log(response);
          if (response.data.status == "0") {
            alert(response.data.message);
          } else {
            let myJsonString = JSON.stringify(response.data);
            let user = localStorage.setItem("userInfo", myJsonString);

            this.$router.push({ path: "profile" });
          }
        });
      }
    }
  },
  created() {
    this.$http({
      method: "post",
      url: "https://elm.cangdu.org/v1/captchas",
      withCredentials: true
    }).then(response => {
      this.code = response.data.code;
    });
  }
};
</script>
<style scoped>
.one {
  color: white;
}
.loginLast {
  width: 93.6%;
  height: 0.21rem;
  padding: 0.1179rem 0;
  margin: 0 auto;
  background: green;
  color: white;
  text-align: center;
  line-height: 0.21rem;
  border-radius: 0.1rem;
}
.prompt {
  height: 0.11rem;
  padding: 0.09375rem 0.14063rem;
  color: red;
  font-size: 0.015rem;
}
section > input {
  height: 0.19rem;
  font-size: 0.15rem;
}
.tow {
  width: 1.33594rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.login > section > input {
  border: 0px;
  outline: none;
}
.login > section {
  height: 0.19rem;
  padding: 0.14063rem 0.1875rem;
  display: flex;
  align-items: center;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
}
.login {
  margin-top: 0.2rem;
  background: white;
}
.body1 {
  background: #f5f5f5;
}
.mine {
  color: white;
  font-weight: 700;
}
.header {
  height: 0.545rem;
  background: blue;
  overflow: hidden;
}
.asideIn > span {
  color: white;
  font-size: 0.2rem;
}
.asideIn a {
  color: white;
  font-size: 0.2rem;
}
.asideIn {
  width: 95%;
  height: 0.545rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>