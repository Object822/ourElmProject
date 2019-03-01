<template>
  <div class="info">
    <div class="info_wrap animated fadeInRight faster">
      <!-- 头部 -->
      <ul class="header">
        <a>
          <i class="header_home el-icon-arrow-left backButton" @click="back_()"></i>
        </a>
        <span class="position_city">账户信息</span>
      </ul>
      <div class="update_info_wrap">
        <ul>
          <li class="head_portrait_wrap">
            <div class="pic_up">
              <input class="upload_inp" type="file">
              <span>头像</span>
            </div>
            <div class="pic_wrap">
              <img :src="base_url + '/img/' + new_avatar" alt>
              <i class="iconfont icon-you"></i>
            </div>
          </li>
          <router-link to="/profile/info/setusername">
            <li class="username_wrap">
              <div class="username">
                <span>用户名</span>
              </div>
              <div class="name">
                <span>{{userInfo.username}}</span>
                <i class="iconfont icon-you"></i>
              </div>
            </li>
          </router-link>
          <router-link to="/profile/info/address">
            <li class="username_wrap">
              <div class="username">
                <span>收货地址</span>
              </div>
              <div class="name">
                <i class="iconfont icon-you"></i>
              </div>
            </li>
          </router-link>
        </ul>
      </div>
      <p class="binding">账号绑定</p>
      <div class="phone_bind_wrap" @click="isShow()">
        <div class="phone_num">
          <i class="iconfont icon-shouji"></i>
          <span>手机</span>
        </div>
        <div>
          <i class="iconfont icon-you"></i>
        </div>
      </div>
      <p class="binding">安全设置</p>
      <router-link to="/forget">
        <div class="phone_bind_wrap">
          <div class="phone_num">
            <span class="psw_text">登录密码</span>
          </div>
          <div>
            <span class="change_psw">修改</span>
            <i class="iconfont icon-you"></i>
          </div>
        </div>
      </router-link>
      <div class="btn_wrap">
        <button class="exit_btn" @click="exit()">退出登录</button>
      </div>
    </div>
    <!-- 弹框 -->
    <transition name="show" enter-active-class="animated heartBeat fast">
      <div class="prompt_wrap" v-if="show_prompt">
        <div class="tip_icon">
          <span></span>
          <span></span>
        </div>
        <p class="alert_text">请在手机APP中设置</p>
        <button class="OK_btn" @click="suer_btn">确认</button>
      </div>
    </transition>
    <!-- 退出弹窗 -->
    <transition name="show1" enter-active-class="animated zoomIn">
      <div class="exit_alert">
        <div class="prompt_wrap" v-if="show_exit">
          <div class="tip_icon">
            <span></span>
            <span></span>
          </div>
          <p class="alert_text">是否退出登录</p>
          <div class="btn_exit">
            <button class="wait" @click="wait()">再等等</button>
            <button class="yes" @click="quit()">退出登录</button>
          </div>
        </div>
      </div>
    </transition>
    <!-- 蒙版 -->
    <transition class="animated zoomIn fast">
      <div class="mask_div" v-if="show_exit"></div>
    </transition>
    <!-- 展示修改用户名的 -->
    <!-- <transition name="router-slid" mode="out-in"> -->
      <router-view :key="key"></router-view>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      show_prompt: false,
      show_exit: false,
      base_url: "//elm.cangdu.org/",
      userInfo: "",
      new_avatar: ""
    };
  },
  computed: {
    key() {
      return this.$route.path + Math.random();
    }
  },
  created() {
    // let get_user = localStorage.getItem("user_data");
    // this.$store.state.user_msg = JSON.parse(get_user);
    // console.log(this.$store.state.user_msg);
    var userId;
    if (localStorage.getItem("user_data")) {
      let get_user = localStorage.getItem("user_data");
      this.user_name = JSON.parse(get_user);
      // console.log(this.user_name);
      userId = this.user_name.user_id;
    }
    // 请求用户信息
    this.$http({
      method: "get",
      url: "https://elm.cangdu.org/v1/user",
      params: {
        user_id: userId
      }
    }).then(res => {
      console.log(res.data);
      if (res.data.status !== 0) {
        this.userInfo = res.data;
        let imgs = res.data.avatar;
        this.new_avatar = imgs;
        console.log("信息",this.new_avatar);
      }
    });
  },
  methods: {
    back_() {
      // this.$router.go(-1);
      this.$router.push({
        name:"profile"
      })
    },
    suer_btn() {
      this.show_prompt = false;
    },
    isShow() {
      this.show_prompt = true;
    },
    exit() {
      this.show_exit = true;
      console.log(this.show_exit);
    },
    wait() {
      this.show_exit = false;
    },
    // 退出账号
    quit() {
      this.show_exit = false;
      this.$http({
        method: "get",
        url: "https://elm.cangdu.org/v2/signout"
      }).then(res => {
        console.log(res.data);
        if (res.data.status == 1 && res.data.message == "退出成功") {
          localStorage.removeItem("user_data");
          this.$router.push({
            name: "profile"
          });
          this.$store.state.login = false;
          this.$store.state.user_data = "";
          this.$store.state.user_msg.usr_name = "";
          this.$store.state.user_msg.count = 0;
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
  z-index: 111;
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
  z-index: 123;
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
/* 用户具体信息 */
.update_info_wrap {
  margin-top: 0.6rem;
}
.head_portrait_wrap {
  width: 100%;
  height: 0.72rem;
  display: flex;
  background: #fff;
  justify-content: space-between;
  border-top: 0.01rem solid #e4e4e4;
  border-bottom: 0.01rem solid #e4e4e4;
}
.upload_inp {
  width: 98%;
  height: 100%;
  opacity: 0;
}
.pic_up {
  position: relative;
}
.pic_up span {
  position: absolute;
  left: 0.1rem;
  line-height: 0.72rem;
  font-size: 0.18rem;
}
.pic_wrap {
  display: flex;
  align-items: center;
}
.pic_wrap img {
  width: 0.46rem;
  height: 0.46rem;
  border-radius: 50%;
}
.pic_wrap .icon-you {
  font-size: 0.22rem;
  color: #e4e4e4;
  margin: 0 0.05rem;
}
.username_wrap {
  width: 100%;
  height: 0.5rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.01rem solid #e4e4e4;
}
.username {
  margin-left: 0.1rem;
  font-size: 0.15rem;
  color: black;
}
.name {
  height: 100%;
  line-height: 0.5rem;
}
.name span {
  font-size: 0.15rem;
  color: #999;
  /* line-height: .5rem; */
}
.name .icon-you {
  font-size: 0.22rem;
  color: #e4e4e4;
  margin: 0 0.05rem;
}
.binding {
  height: 0.42rem;
  line-height: 0.42rem;
  padding-left: 0.1rem;
  font-size: 0.12rem;
  border-bottom: 0.01rem solid #e4e4e4;
}
.phone_bind_wrap {
  height: 0.5rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.phone_num span {
  font-size: 0.18rem;
  color: black;
}
.phone_num .icon-shouji {
  font-size: 0.25rem;
  color: #3190e8;
  margin-left: 0.1rem;
}
.phone_bind_wrap .icon-you {
  font-size: 0.22rem;
  color: #e4e4e4;
  margin: 0 0.05rem;
}
.phone_num .psw_text {
  font-size: 0.14rem;
  padding-left: 0.1rem;
}
.change_psw {
  font-size: 0.18rem;
  color: #999;
}
.btn_wrap {
  width: 100%;
  height: 0.38rem;
  line-height: 0.38rem;
  text-align: center;
  margin-top: 0.38rem;
}
.btn_wrap .exit_btn {
  width: 90%;
  background: #d8584a;
  border-radius: 0.1rem;
  border: none;
  outline: none;
  font-size: 0.15rem;
  color: #fff;
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
  z-index: 222;
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
/* 退出登录弹框样式 */
.exit_alert .prompt_wrap {
  width: 90%;
  height: 3rem;
  margin-left: -1.7rem;
  margin-top: -2rem;
}
.exit_alert .tip_icon {
  width: 1rem;
  height: 1rem;
  border: 0.03rem solid #f8cb86;
}
.exit_alert .alert_text {
  font-size: 0.33rem;
}
.exit_alert .btn_exit {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 0.5rem;
}
.wait {
  width: 1rem;
  height: 0.35rem;
  border: none;
  outline: none;
  background: #c1c1c1;
  color: #fff;
  border-radius: 0.05rem;
  margin-right: 0.2rem;
}
.yes {
  width: 1.2rem;
  height: 0.35rem;
  border: none;
  outline: none;
  background: #dd6b55;
  color: #fff;
  border-radius: 0.05rem;
}
/* 蒙版 */
.mask_div {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
  opacity: 0.5;
  z-index: 155;
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
