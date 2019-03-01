<template>
  <div>
    <!-- 头部 -->
    <ul class="header">
      <a @click="back_5()">
        <i class="header_home el-icon-arrow-left backButton"></i>
      </a>
      <span class="position_city">下载</span>
    </ul>
    <!-- 下载饿了么 -->
    <div class="down_wrap">
      <div class="down_img">
        <img :src="img1" alt>
      </div>
      <p>下载饿了么APP</p>
      <button class="down_btn" @click="isShow">下载</button>
    </div>
    <!-- 弹框 -->
    <transition name="show"
    enter-active-class="animated heartBeat fast"
    >
      <div class="prompt_wrap" v-if="show_prompt">
        <div class="tip_icon">
          <span></span>
          <span></span>
        </div>
        <p>IOS用户请前往AppStore下载</p>
        <button class="OK_btn" @click="suer_btn">确认</button>
      </div>
    </transition>
  </div>
</template>

<script>
import img1 from '../../../../../../static/imgs/elm.jpg'
export default {
  data() {
    return {
      show_prompt: false,
      img1: img1
    };
  },
  methods: {
    back_5() {
      this.$router.go(-1);
    },
    isShow() {
      this.show_prompt = true;
    },
    suer_btn() {
      this.show_prompt = false;
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

/* 下载饿了么 */
.down_wrap {
  width: 100%;
  margin-top: 0.45rem;
  text-align: center;
}
.down_img {
  width: 1.8rem;
  height: 1.8rem;
  margin: .60rem auto .2rem;
}
.down_img img {
  width: 100%;
  border-radius: .15rem;
}
.down_wrap p {
  font-size: 0.22rem;
  margin-bottom: 0.2rem;
}
.down_btn {
  width: 90%;
  height: 0.42rem;
  border: none;
  outline: none;
  background: #4cd964;
  border-radius: 0.05rem;
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
