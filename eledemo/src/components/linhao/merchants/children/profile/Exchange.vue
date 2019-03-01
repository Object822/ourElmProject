<template>
  <div>
    <div class="info_wrap animated slideInRight fast">
      <!-- 头部 -->
      <ul class="header">
        <a>
          <i class="header_home el-icon-arrow-left backButton" @click="back_()"></i>
        </a>
        <span class="position_city">兑换红包</span>
      </ul>
      <div class="conversion_wrap">
        <div class="username public_inp">
          <input type="text" placeholder="请输入兑换码" v-model="conversion_code">
        </div>
        <div class="code_msg_wrap">
          <div class="code_msg">
            <input type="text" placeholder="验证码" v-model="code_text" minlength="4" maxlength="4">
          </div>
          <div class="code_img_wrap">
            <div class="verification_code">
              <img :src="code&&code" alt>
            </div>
            <div class="code_wrap">
              <p>看不清</p>
              <p class="change_code" @click="getCode()">换一张</p>
            </div>
          </div>
        </div>
      </div>
      <div class="conversion_btn_wrap">
        <button
          class="conversion_btn"
          @click="goConversion()"
          :class="[isActive?btn_color:'']"
          :disabled="!isActive"
        >兑换</button>
      </div>
      <!-- 弹框 -->
      <transition name="show" enter-active-class="animated heartBeat fast">
        <div class="prompt_wrap" v-if="show_prompt">
          <div class="tip_icon">
            <span></span>
            <span></span>
          </div>
          <p class="alert_text">{{alert_erro_msg}}</p>
          <button class="OK_btn" @click="suer_btn">确认</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      conversion_code: "",
      code: "",
      code_text: "",
      isActive: false,
      btn_color: "btn_color",
      user_text: false,
      users_MSG: "",
      userID: "",
      alert_erro_msg: "",
      show_prompt: false,
      show_con: false
    };
  },
  watch: {
    conversion_code(val) {
      if (val.length > 0) {
        if (this.show_con) {
          this.isActive = true;
        }
        this.user_text = true;
      } else if (this.show_con) {
        this.isActive = false;
      } else {
        this.user_text = false;
        this.isActive = false;
      }
    },
    code_text(val) {
      if (val.length == 4 && this.user_text) {
        this.show_con = true;
        this.isActive = true;
      } else {
        this.isActive = false;
        this.show_con = false;
      }
    }
  },
  created() {
    // 从本地获取用户信息
    let usersInfo = localStorage.getItem("user_data");
    this.users_MSG = JSON.parse(usersInfo);
    this.userID = this.users_MSG.user_id;
    //  调用验证码
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
    goConversion() {
      console.log(1111);
      this.$http({
        method: "post",
        url:
          "https://elm.cangdu.org/v1/users/" +
          this.userID +
          "/hongbao/exchange",
        data: {
          exchange_code: this.conversion_code,
          captcha_code: this.code_text
        }
      }).then(res => {
        console.log(res.data);
        if (res.data.status == 0) {
          this.show_prompt = true;
          this.alert_erro_msg = res.data.message;
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
  z-index: 112;
  background: #f5f5f5;
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
  z-index: 113;
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
/* 兑换框 */
.conversion_wrap {
  margin-top: 0.6rem;
  margin-bottom: 0.2rem;
}
.public_inp {
  width: 90%;
  height: 0.48rem;
  margin: 0 auto;
  background: #fff;
  padding: 0.1rem 0.2rem;
  border-bottom: 0.01rem solid #f1f1f1;
  margin-bottom: 0.2rem;
  border-radius: 0.05rem;
}
.public_inp input {
  width: 100%;
  font-size: 0.18rem;
  outline: none;
  border: none;
}

.code_msg_wrap {
  width: 90%;
  height: 0.48rem;
  margin: 0 auto;
  display: flex;
}
.code_msg {
  width: 60%;
  height: 0.48rem;
  background: #fff;
  margin-right: 0.1rem;
  padding-left: 0.2rem;
  border-radius: 0.05rem;
}
.code_msg input {
  width: 100%;
  height: 100%;
  font-size: 0.16rem;
  border: none;
  border-radius: 0.05rem;
  outline: none;
}
.code_img_wrap {
  display: flex;
  background: #fff;
  border-radius: 0.05rem;
}
.verification_code {
  width: 0.82rem;
  height: 0.48rem;
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
.conversion_btn_wrap {
  width: 100%;
  text-align: center;
}
.conversion_btn {
  width: 90%;
  height: 0.38rem;
  border: none;
  outline: none;
  border-radius: 0.05rem;
  font-size: 0.15rem;
  color: #fff;
}
.btn_color {
  background: #4cd964;
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
</style>
