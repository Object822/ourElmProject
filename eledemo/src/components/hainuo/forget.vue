<template>
  <div>
    <div class="header">
      <div class="boult">
        <span class="el-icon-arrow-left" @click="go()"></span>
      </div>
      <span>重置密码</span>
    </div>
    <!-- 中间内容 -->
    <div class="cont">
      <div class="cont1">
        <input type="text" placeholder="账号" v-model="userName">
      </div>
      <div class="sold1"></div>
      <div class="cont1">
        <input type="text" placeholder="旧密码" v-model="oldpassWord">
      </div>
      <div class="sold1"></div>
      <div class="cont1">
        <input type="text" placeholder="请输入新密码" v-model="newpassword">
      </div>
      <div class="sold1"></div>
      <div class="cont1">
        <input type="text" placeholder="请确认密码" v-model="confirmpassword">
      </div>
      <div class="sold1"></div>
      <div class="cont1">
        <input type="text" placeholder="验证码" v-model="captcha_code">
        <div class="code" @click="iscode()">
          <p>看不清</p>
          <p>换一张</p>
        </div>
        <img :src="code&&code" class="isimg">
      </div>
    </div>
    <div class="foot" @click="hint()">确认修改</div>
    <!-- 弹框1 -->
    <transition enter-active-class="animated bounceIn ">
      <div class="pop-name" v-if="popname">
        <img src="./img/感叹号.png" class="pop-hint">
        <p class="pop-con">{{erro_msg}}</p>
        <div class="pop-foot" @click="pop1()">确认</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: null,
      popname: false,
      new_and_odl: false,
      newcode: false,
      userName: "",
      oldpassWord: "",
      newpassword: "",
      confirmpassword: "",
      captcha_code: "",
      erro_msg: ""
    };
  },
  methods: {
    go() {
      this.$router.go(-1);
    },
    iscode() {
      this.$http({
        method: "post",
        url: "https://elm.cangdu.org/v1/captchas",
        withCredentials: true
      }).then(res => {
        this.code = res.data.code;
        console.log(res.data);
      });
    },
    hint() {
      if (this.userName == "") {
        this.popname = true;
        this.erro_msg = "请输入正确的账号";
      } else if (this.oldpassWord == "") {
        this.popname = true;
        this.erro_msg = "请输入旧密码";
      } else if (this.newpassword == "") {
        this.erro_msg = "请输入新密码";
        this.popname = true;
      } else if (this.confirmpassword == "") {
        this.popname = true;
        this.erro_msg = "请输入确认密码";
      } else if (this.captcha_code == "") {
        this.popname = true;
        this.erro_msg = "请输入验证码";
      } else if (this.newpassword !== this.confirmpassword) {
        this.popname = true;
        this.erro_msg = "两次输入的密码不一致";
      } else {
        this.$http({
          method: "POST",
          url: "https://elm.cangdu.org/v2/changepassword",
          withCredentials: true,
          data: {
            username: this.userName,
            oldpassWord: this.oldpassWord,
            newpassword: this.newpassword,
            confirmpassword: this.confirmpassword,
            captcha_code: this.captcha_code
          }
        }).then(res => {
          console.log(res);
          if (res.data.status !== 0) {
            this.popname = true;
            this.erro_msg = res.data.success;
          } else {
            this.popname = true;
            this.erro_msg = res.data.message;
          }
        });
      }
    },
    pop1() {
      this.popname = false;
    }
  },
  created() {
    this.iscode();
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
  line-height: 0.25rem;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 25%;
  margin-left: -25%;
  width: 50%;
  font-size: 0.2rem;
  color: white;
}

.boult {
  position: absolute;
  top: 0.1rem;
  left: 0.2rem;
}

.cont {
  margin-top: 0.6rem;
  height: 2.5rem;
  background-color: white;
}

.cont1 {
  width: 3rem;
  height: 0.5rem;
}

.cont input {
  font-size: 0.16rem;
  outline: none;
  margin-top: 0.1rem;
  padding-left: 0.1rem;
}

.foot {
  font-size: 0.15rem;
  color: white;
  width: 90%;
  height: 0.4rem;
  text-align: center;
  line-height: 0.4rem;
  margin: 0.2rem auto;
  border-radius: 0.05rem;
  background-color: #4cd964;
}

.code {
  float: right;
  margin-right: -0.3rem;
  
}

.code p:nth-child(2) {
  color: #3190e8;
  /* margin-top: 0.01rem; */
}

.code p:nth-child(1) {
  color: #aaa;
}

.sold1 {
  border-bottom: 0.01rem solid whitesmoke;
  width: 100%;
  margin: 0 auto;
}

.pop-name {
  position: fixed;
  top: 1rem;
  left: 0.6rem;
  width: 70%;
  height: 2rem;
  border-radius: 0.12rem;
  /* animation: tipMove 0.4s; */
  background-color: white;
}

.pop-phone {
  position: fixed;
  top: 1rem;
  left: 0.6rem;
  width: 70%;
  height: 2rem;
  border-radius: 0.12rem;
  /* animation: tipMove 0.4s; */
  background-color: white;
}

.pop-shcool {
  position: fixed;
  top: 1rem;
  left: 0.6rem;
  width: 70%;
  height: 2rem;
  border-radius: 0.12rem;
  /* animation: tipMove 0.4s; */
  background-color: white;
}

.pop-detailed {
  position: fixed;
  top: 1rem;
  left: 0.6rem;
  width: 70%;
  height: 2rem;
  border-radius: 0.12rem;
  /* animation: tipMove 0.4s; */
  background-color: white;
}

.pop-label {
  position: fixed;
  top: 1rem;
  left: 0.6rem;
  width: 70%;
  height: 2rem;
  border-radius: 0.12rem;
  /* animation: tipMove 0.4s; */
  background-color: white;
}

.pop-label1 {
  position: fixed;
  top: 1rem;
  left: 0.6rem;
  width: 70%;
  height: 2rem;
  border-radius: 0.12rem;
  /* animation: tipMove 0.4s; */
  background-color: white;
}

.pop-label2 {
  position: fixed;
  top: 1rem;
  left: 0.6rem;
  width: 70%;
  height: 2rem;
  border-radius: 0.12rem;
  /* animation: tipMove 0.4s; */
  background-color: white;
}

.pop-hint {
  width: 0.7rem;
  margin: 0.2rem 1rem;
}

.pop-con {
  text-align: center;
  font-size: 0.15rem;
}

.pop-foot {
  font-size: 0.15rem;
  color: white;
  width: 100%;
  height: 0.4rem;
  text-align: center;
  line-height: 0.4rem;
  margin: 0.35rem auto;
  background-color: #4cd964;
}
</style>
