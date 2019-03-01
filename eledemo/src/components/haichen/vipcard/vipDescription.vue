<template>
  <div>
    <title1></title1>
    <div class="content">
      <div
        class="prompt"
      >尊敬的用户，随着会员体系逐渐完善，自2016年10月10日起，饿了么会员权益将做如下优化： 购卡后31天内，累积享有30单减免配送费服务（每日最多3单，每单最高减免4元）。 注：已购买的会员服务不受影响，当前会员服务失效前无法购买新卡。</div>
      <div class="content2">
        <div>
          <h3>Q1: 特权介绍</h3>
          <p>
            身份标识：饿了么会员服务有效期内，享有专属皇冠标识。
            减免配送费： 饿了么会员卡自绑定账户之日起31天内，在「蜂鸟专送」标识商家下单，享有30次减免配送费特权，每日最多减免3单，每单最高可减4元。
            更多特权，敬请期待！
          </p>
        </div>
        <div>
          <h3>Q2: 资费介绍</h3>
          <p>饿了么会员卡：20元</p>
        </div>
        <div>
          <h3>Q3: 使用说明</h3>
          <div>当用户满足以下任一条件，会员服务自动失效：
            <p class="ss">
              自绑定之日起超过31天；
              在31天内累计使用减免配送费的蜂鸟订单数量达到30单；
            </p>
          </div>
        </div>
        <div>
          <h3>Q4: 购卡说明</h3>
          <p>在线购买：饿了么App>我的>饿了么会员卡</p>
        </div>
        <div>
          <h3>Q5: 温馨提示</h3>
          <p>
            用户在当前会员服务失效前，无法购买新卡。
            请认准饿了么官方渠道，任何从其他第三方途径获得的会员卡，饿了么不保证其可用性。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import title1 from "./title.vue";
export default {
  components: {
    title1
  }
};
</script>
<style scoped>
p {
  color: gray;
  font-size: 0.14rem;
  line-height: 0.18rem;
}
h3 {
  font-weight: 1000;
}
.ss {
  width: 70%;
  margin-top: 0.1rem;
  margin-left: 0.4rem;
}
h3 {
  margin-bottom: 0.1rem;
}
.content2 {
  width: 90%;
  height: 85%;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
}
.prompt {
  width: 65%;
  margin: 0.2rem auto;
  line-height: 0.18rem;
  font-size: 0.12rem;
  color: black;
}
.content {
  margin-top: 15%;
  width: 100%;
  height: 91%;
  background: white;
}
</style>


