<template>
  <div class="commnents_html">
    <div class="comments_body">
      <header class="header" v-if="restaurant_data">
        <div>
          <p>{{restaurant_data.overall_score.toString().substr(0,3)}}</p>
          <p>综合评价</p>
          <p>高于周边商家{{restaurant_data.compare_rating.toString().substr(2,2)}}%</p>
        </div>
        <div>
          <p>
            <span>服务态度</span>
            <el-rate
              v-model="restaurant_data.service_score"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
          </p>
          <p>
            <span>菜品评价</span>
            <el-rate
              v-model="restaurant_data.food_score"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
          </p>
          <p>
            <span>送达时间</span>
            <span>{{restaurant_data.deliver_time}}分钟</span>
          </p>
        </div>
      </header>
      <ul class="click">
        <li
          @click="change_color(index)"
          :class="a==index?'liColor':'liColor2'"
          :key="index"
          v-for="(value,index) in restaurant_comments"
        >{{value.name}}( {{value.count}})</li>
      </ul>
      <ul v-if="restaurant_comments_information" class="restaurant_comments_information">
        <li class="detail" :key="index" v-for="(value,index) in restaurant_comments_information">
          <img
            :src="value.avatar==''?'https://elm.cangdu.org/img/default.jpg':'https://fuss10.elemecdn.com/'+value.avatar+'.jpeg'"
          >
          <section>
            <header>
              <section>
                <p>{{value.username}}</p>
                <div>
                  <el-rate v-model="value.rating_star" disabled text-color="#ff9900"></el-rate>
                  <span>{{value.time_spent_desc}}</span>
                </div>
              </section>
              <time>{{value.rated_at}}</time>
            </header>
            <ul class="food_img_ul">
              <li :key="index" v-for="(value,index) in value.item_ratings">
                <img
                  v-if="value.image_hash&&value.image_hash!=''"
                  class="shop_image"
                  :src="'https://fuss10.elemecdn.com/'+value.image_hash+'.jpeg'"
                >
              </li>
            </ul>
            <ul class="food_name_ul">
              <li :key="index" v-for="(value,index) in value.item_ratings">{{value.food_name}}</li>
            </ul>
          </section>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      restaurant_id: null,
      restaurant_data: null,
      restaurant_comments: null,
      restaurant_comments_information: null,
      a: 0,
      image_url: null
    };
  },
  methods: {
    change_color(index) {
      this.a = index;
    }
  },
  mounted() {
    console.log(document.getElementsByClassName("el-rate__item")[0]);
    // document.getElementsByClassName('el-rate')[0].style="float:left;"
  },
  updated() {
    //  document.getElementsByClassName('el-rate')[0].style="float:left;"
    console.log(document.getElementsByClassName("el-rate__item")[0]);
  },
  created() {
    this.restaurant_id = this.$route.query.id;
    this.$http({
      method: "get",
      url:
        "https://elm.cangdu.org/ugc/v2/restaurants/" +
        this.restaurant_id +
        "/ratings/scores"
    }).then(res => {});

    this.$http({
      method: "get",
      url:
        "https://elm.cangdu.org/ugc/v2/restaurants/" +
        this.restaurant_id +
        "/ratings/tags"
    }).then(res => {
      this.restaurant_comments = res.data;
    });

    this.$http({
      method: "get",
      url:
        "https://elm.cangdu.org/ugc/v2/restaurants/" +
        this.restaurant_id +
        "/ratings"
    }).then(res => {
      //elm.cangdu.org/img/default.jpg
      this.restaurant_comments_information = res.data;
      console.log(this.restaurant_comments_information, "ssssss");
    });
  }
};
</script>
<style scoped>
.shop_image {
  width: 0.7rem;
}
.commnents_html {
  overflow: auto;
}
.comments_body {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: scroll;
}
.food_name_ul > li {
  width: 0.5rem;
  height: 0.2rem;
  margin-right: 0.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 0.01rem solid white;
}
.food_name_ul {
  display: flex;
}
.food_img_ul {
  display: flex;
}
.detail > section > header > section > div span {
}
.el-rate {
  margin-left: -0.24rem;
  transform: scale(0.5);
}
.detail > section > header > section > div {
  display: flex;
}
.detail > section > header p {
  margin-bottom: 0.05rem;
}
.detail > section > header {
  display: flex;
  justify-content: space-between;
}
.detail > section {
  flex: 1;
}
.detail {
  display: flex;
  margin-bottom: 0.3rem;
}
.detail > img {
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  margin-right: 0.2rem;
}
.restaurant_comments_information {
  box-sizing: border-box;
  padding: 0.1rem 0.15rem;
  flex: 1;
  overflow: auto;
}
.liColor {
  background: blue;
  color: white;
}
.liColor2 {
  background: #ebf5ff;
  color: #6d7885;
}
.click > li {
  font-size: 0.12rem;

  padding: 0.05rem 0.05rem;
  box-sizing: border-box;
  border-radius: 0.04rem;
  border: 1px;
  margin: 0.05rem 0.07rem;
}
.click {
  margin-top: 0.05rem;
  margin-bottom: 0.05rem;
  box-sizing: border-box;
  padding: 0.1rem 0.15rem;
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
}
.header > div:nth-child(2) > p > span {
  font-size: 0.13rem;
  flex: 3;
}
.header > div:nth-child(2) > p > div {
  font-size: 0.13rem;
  flex: 8;
  overflow: hidden;
}
.el-rate {
  transform: scale(0.6);
}
.header > div:nth-child(2) > p {
  font-size: 0.13rem;
  display: flex;
}
.header > div:nth-child(1) > p:nth-child(3) {
  color: gray;
  text-align: center;
  font-size: 0.12rem;
}
.header > div:nth-child(1) > p:nth-child(2) {
  color: gray;
  text-align: center;
  font-size: 0.17rem;
}
.header > div:nth-child(1) > p:nth-child(1) {
  color: red;
  text-align: center;
  font-size: 0.25rem;
}
.header > div:nth-child(2) {
  flex: 4;
  box-sizing: border-box;
}
.header > div:nth-child(1) {
  flex: 3;
  box-sizing: border-box;
}
.header {
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 0.1rem 0.1rem;
  background: white;
  margin-top: 0.03rem;
}
</style>