<template>
  <div>
    <title1></title1>
    <div class="content">
      <div class="banner">
        <div>
          <div>
            成功兑换后将关联到当前账号:
            <span class="username">{{username}}</span>
          </div>
        </div>
      </div>

      <div class="input1">
        <div>
          <input type="text" placeholder="请输入10位卡号">
        </div>
      </div>
      <div class="input1">
        <div>
          <input type="text" placeholder="请输入6位卡密">
        </div>
      </div>
      <div class="input2">
        <div>
          <input type="button" value="兑换">
        </div>
      </div>
      <div class="prompt">
        <div class="title3">
          <div>温馨提示</div>
        </div>
        <div class="footer">
          <div>新兑换的会员服务，权益以「会员说明」为准。</div>
          <div>月卡：30次减免配送费。</div>
          <div>季卡：90次减免配送费。</div>
          <div>年卡：360次减免配送费。</div>
          <div>＊仅限蜂鸟专送订单，每日最多减免3单，每单最高减免4元（一个月按31天计算）</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import title1 from "./title.vue";
export default {
  data() {
    return {
      username: null
    };
  },
  components: {
    title1
  },
  created() {
    let userInfo = localStorage.getItem('user_data');
    this.username = JSON.parse(userInfo).username;
    // this.username = this.$route.params.username;
  }
};
</script>
<style scoped>
.footer {
  width: 83%;
  margin-left: 0.5rem;
  height: 1.2rem;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.12rem;
  color: gray;
}
.title3 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0.5rem;
  color: gray;
}
.input2 input {
  width: 100%;
  height: 80%;
  outline: none;
  border-radius: 0.05rem;
  color: white;
}
.input2 > div {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input2 {
  height: 0.5rem;
  margin-bottom: 0.02rem;
}
.input1 input {
  outline: none;
}
.input1 > div {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
}
.input1 {
  background: white;
  height: 0.5rem;
  margin-bottom: 0.02rem;
}
.username {
  font-size: 0.18rem;
  font-weight: 1000;
  color: black;
}
.banner > div {
  width: 90%;
  height: 100%;
  margin: 0.5rem auto;
  display: flex;
  align-items: center;
  color: gray;
  font-size: 0.14rem;
}
.banner {
  width: 100%;
  height: 0.5rem;
  background: rgb(245, 245, 245);
}
.content {
  height: 90%;
  background: rgb(245, 245, 245);
}
</style>


