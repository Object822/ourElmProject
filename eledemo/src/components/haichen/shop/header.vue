<template>
  <div>
  
    <div>
      <!-- 
          shopDetail navigation
      -->
      <nav v-on:click="shop_detail" class="shop_detail">
        <span class="el-icon-arrow-right"></span>
      </nav>
      <!-- 
          返回上一级的导航条
      -->
      <nav v-on:click="up" class="navTop">
        <span class="el-icon-arrow-left"></span>
      </nav>
      <!-- 脱离文档里的窗口定位 -->
      <div v-if="show" class="discount_detail">
        <span v-on:click="discount" class="el-icon-circle-close-outline"></span>

        <div
          class="wrap_detail"
          v-if="restaurant_data.activities&&restaurant_data.activities.length>0"
        >
          <div :key="index" v-for="(value,index) in restaurant_data.activities">
            <h1>{{restaurant_data.name}}</h1>
            <section>
              <header>
                <span>优惠信息</span>
              </header>
              <li>
                <span
                  :style="'background:#'+value.icon_color"
                >{{restaurant_data.activities[0].icon_name}}</span>
                <span>{{restaurant_data.activities[0].description}}</span>
                <span>(App专享)</span>
              </li>
            </section>
            <section>
              <header>
                <span>商家公告</span>
              </header>
              <p>{{restaurant_data.promotion_info}}</p>
            </section>
          </div>
        </div>
      </div>
      <!-- 下面为头的内容 -->
      <div v-if="restaurant_data" class="header">
        <img class="header_image" :src="'https://elm.cangdu.org/img/'+restaurant_data.image_path">
        <div class="mask">
          <div>
            <div>
              <img
                class="header_image_top"
                :src="'https://elm.cangdu.org/img/'+restaurant_data.image_path"
              >
            </div>
            <div>
              <h2>{{restaurant_data.name}}</h2>
              <p>
                商家配送/分钟配送/
                {{restaurant_data.piecewise_agent_fee.tips}}
              </p>
              <p>{{restaurant_data.promotion_info}}</p>
            </div>
          </div>
          <div
            class="discount"
            v-on:click="discount"
            v-if="restaurant_data.activities&&restaurant_data.activities.length>0"
          >
            <div>
              <span
                :style="'background:#'+restaurant_data.activities[0].icon_color"
              >{{restaurant_data.activities[0].icon_name}}</span>
              <span>{{restaurant_data.activities[0].description}}</span>
              <span>App专享</span>
            </div>
            <div>
              <span>{{restaurant_data.activities.length}}个活动</span>
              <span class="el-icon-arrow-right"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      restaurant_id: null,
      restaurant_data: null,
      show: false
    };
  },
  methods: {
    discount() {
      this.show = !this.show;
    },
    up() {
      this.$router.go(-1);
    },
    shop_detail() {
      this.$router.push({
        name: "shop_detail",
        params: {
          username: "商家详情",
          restaurant_data: this.restaurant_data
        }
      });
    }
  },
  created() {
    this.restaurant_id = this.$route.query.id;
    this.$http({
      method: "get",
      url: "https://elm.cangdu.org/shopping/restaurant/" + this.restaurant_id
    }).then(res => {
      this.restaurant_data = res.data;
    });
  }
};
</script>
<style scoped>
.shop_detail {
  position: fixed;
  z-index: 23;
  top: 0.7rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
nav > span {
  color: white;
  transform: scale(3);
}
.navTop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 22;
  box-sizing: border-box;
  padding: 0.15rem 0.1rem;
}
section {
  margin-bottom: 0.3rem;
}
header > span {
  border: 0.02rem solid gray;
  box-sizing: border-box;
  padding: 0.1rem 0.12rem;
  border-radius: 0.1rem;
}
header {
  text-align: center;
  margin-bottom: 0.5rem;
}
h1 {
  width: 100%;
  text-align: center;
  overflow: hidden;
  margin-bottom: 0.4rem;
}
.wrap_detail {
  box-sizing: border-box;
  padding: 0.2rem 0.5rem;
}
.discount_detail > span {
  position: fixed;
  left: 50%;
  transform: scale(5);
  bottom: 0.5rem;
}
.discount_detail {
  position: fixed;
  top: 0;
  bottom: 0;
  overflow: auto;
  left: 0;
  right: 0;
  z-index:600;
  color: white;
  background: black;
}
.header_image_top {
  width: 0.8rem;
}
.discount > div:nth-child(2) {
  flex: 1;
  display: flex;
  color: white;
  align-items: center;
  justify-content: flex-end;
}
.discount > div:nth-child(1) {
  width: 80%;
  overflow: hidden;
}
.discount > div:nth-child(1) > span {
  color: white;
}

.discount {
  margin-top: 0.1rem;
  display: flex;
  justify-content: space-between;
}

.mask > div:nth-child(1) > div:nth-child(1) {
  margin-right: 0.1rem;
}
.mask > div:nth-child(1) > div:nth-child(2) {
  flex: 1;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.mask > div:nth-child(1) {
  display: flex;
}
.mask {
  background: rgba(119, 103, 137, 0.43);
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  z-index: 10;
  box-sizing: border-box;
  padding: 0.13rem 0.1rem;
}
.header_image {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 6;
  filter: blur(10px);
}
.header {
  position: relative;
  overflow: hidden;
}
</style>


