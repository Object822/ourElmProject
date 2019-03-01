<template>
  <div class="body222222">
    <transition name="d">
      <router-view v-if="$route.path=='/shop/foodDetail'" height="100%"></router-view>
    </transition>

    <div height="100%" v-if="$route.path=='/shop'" class="content_wrap">
      <div v-if="restaurant" style="height:100%" class="body1">
        <div class="show2"></div>
        <div class="top2">
          <div>
            <!-- <router-link to="###"> -->
            <section :style="'background:url('+image+imag2+')'" class="header">
              <div class="mask">
                <div class="left">
                  <img :src="image+imag2">
                </div>
                <div class="right">
                  <div v-if="restaurant" class="right2">
                    <h4>{{restaurant.name}}</h4>
                    <p>商家配送／{{restaurant.order_lead_time}}分钟送达/{{restaurant.piecewise_agent_fee.tips}}</p>
                    <p>公告:{{restaurant.promotion_info}}</p>
                  </div>
                </div>
                <div v-if="restaurant.activities.length>0" class="footer">
                  <div>
                    <p>
                      <span class="subtract">{{restaurant.activities[0]. icon_name}}</span>
                      <span class="descript">{{restaurant.activities[0]. description}}</span>
                    </p>
                    <p>
                      <span class="descript">{{restaurant.activities.length}}</span>
                      <span>></span>
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <!-- </router-link> -->
            <!-- <router-link class="leftA"> -->
            <i class="el-icon-arrow-left leftA" v-on:click.stop="up22"></i>
            <!-- </router-link> -->
            <router-link class="rightA" to="/">></router-link>
          </div>
          <div class="ssll">
            <div class="shopmenu">
              <div class="oo" v-on:click.stop="xian">
                <span>商品</span>
              </div>
              <div class="oo" @click.stop="xian">
                <span>评价</span>
              </div>
            </div>
          </div>
        </div>

        <div class="comment">
          <div class="commentheader">
            <div class="commentheaderleft">
              <p v-if="score">{{score.overall_score}}</p>
              <p>综合评价</p>
              <p v-if="score">高于{{score.truerate}}%的商家</p>
            </div>
            <div class="commentheaderright">
              <div>
                <span class="com_text">服务态度</span>
                <div>
                  <el-rate v-if="score" v-model="score.attitude" disabled text-color="#ff9900"></el-rate>
                </div>
                <span v-if="score" class="score">{{score.attitude}}</span>
              </div>
              <div>
                <span class="com_text">菜品评价</span>
                <div>
                  <el-rate v-if="score" v-model="score.food_score" disabled text-color="#ff9900"></el-rate>
                </div>
                <span v-if="score" class="score">{{score.food_score}}</span>
              </div>
              <div>
                <span class="com_text">送达时间</span>
                <span v-if="score" class="score2">{{score.time}}分钟</span>
              </div>
            </div>
          </div>
          <div class="trueComment">
            <ul>
              <li
                class="li2"
                v-for="(value,index) in comment"
                :key="index"
              >{{value.name}}({{value.count}})</li>
            </ul>
          </div>
        </div>
        <div></div>
        <div class="shop1">
          <shop></shop>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import merchandise from "./merchandise.vue";
import foodDetail from "./foodDetail.vue";
export default {
  data() {
    return {
      comment: null,
      restaurant: null,
      image: "https://elm.cangdu.org/img/",
      imag2: null,
      score: null,
      value5: 3.7,
      ll: 1,
      background222: "none",
      transition: false,
      restaurantId: null
    };
  },
  components: {
    shop: merchandise
  },
  methods: {
    up22() {
      console.log("走了没");
      this.$router.go(-1);
    },
    xian(even) {
      this.ll = this.ll + 1;
      let gg = document.getElementsByClassName("oo");
      let gg1 = document.getElementsByClassName("comment")[0];
      let gg2 = document.getElementsByClassName("shop1")[0];
      for (let k = 0; k < gg.length; k++) {
        if (even.currentTarget == gg[k]) {
          gg[k].children[0].style =
            "border-bottom:0.05rem solid blue;color:blue";
          if (k == 0) {
            gg2.style = "display:block";
            gg1.style = "display:none";
          } else {
            gg2.style = "display:none";
            gg1.style = "display:block";
          }
        } else {
          gg[k].children[0].style = "border-bottom:0;color:black";
        }
      }
    }
  },
  created() {
    this.restaurantId = this.$route.query.id;
    console.log("餐馆id", this.restaurantId);
    let header2 = document.getElementsByClassName("header");
    console.log(this.$route);
    this.$http({
      url:
        "https://elm.cangdu.org/ugc/v2/restaurants/" +
        this.restaurantId +
        "/ratings/tags",
      method: "get"
    }).then(res => {
      this.comment = res.data;
      console.log(res, "111111111111111111111");
    });

    this.$http({
      url: "https://elm.cangdu.org/shopping/restaurant/" + this.restaurantId,
      method: "get"
    }).then(res => {
      this.restaurant = res.data;
      this.imag2 = res.data.image_path;
      console.log(res, "是是是是是是所所所所所所所所所所所");
    });

    this.$http({
      url:
        "https://elm.cangdu.org/ugc/v2/restaurants/" +
        this.restaurantId +
        "/ratings/scores",
      method: "get"
    }).then(res => {
      console.log("状态",res)
      // let attitude1 = res&&res.data.service_score.toString().substr(0, 3);
      // let food_score1 = res.data&&res.data.food_score.toString().substr(0, 3);
      // let rate = res.data&&res.data.compare_rating.toString().substr(2, 3);
      // let rate2 = rate.substr(2, 1);
      // let rate3 = rate.substr(0, 2);
      // let time = res.data&&res.data.deliver_time.toString();
      // let overall_score = res.data&&res.data.overall_score.toString().substr(0, 3);

      // let truerate = rate3 + "." + rate2;

      // let attitude = parseFloat(attitude1);
      // let food_score = parseFloat(food_score1);
      // this.score = {
      //   attitude: attitude,
      //   food_score: food_score,
      //   truerate: truerate,
      //   time: time,
      //   overall_score: overall_score
      // };
    });
  },
  mounted() {
    console.log("mounted");
    let a1 = document.getElementsByClassName("el-rate__icon");
    console.log(a1[0]);
    for (let b = 0; b < a1.length; b++) {
      a1[b].style.fontSize = "0.12rem";
    }
    let a2 = document.getElementsByClassName(" el-rate__text");

    for (let b1 = 0; b1 < a2.length; b1++) {
      a2[b1].style.display = "none";
    }

    let a3 = document.getElementsByClassName("el-rate__item");

    for (let b3 = 0; b3 < a3.length; b3++) {
      a3[b3].style.width = "0.12rem";
    }
  },
  beforeUpdate() {
    let a1 = document.getElementsByClassName("el-rate__icon");
    console.log("upupupu");
    for (let b = 0; b < a1.length; b++) {
      a1[b].style.fontSize = "0.12rem";
    }

    let a2 = document.getElementsByClassName(" el-rate__text");

    for (let b1 = 0; b1 < a2.length; b1++) {
      a2[b1].style.display = "none";
    }

    let a3 = document.getElementsByClassName("el-rate__item");

    for (let b3 = 0; b3 < a3.length; b3++) {
      a3[b3].style.width = "0.12rem";
    }
  }
};
</script>
<style scoped>
.body222222 {
  margin-top: 1.6rem;
  height: 11rem;
}
.content_wrap {
  height: 11rem;
}
.comment {
  margin-top: -11%;
  background: #fff;
}
.shop1 {
  margin-top: -8%;
  height: 100%;
}
.ssll {
  background: white;
}
.top2 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10000;
}
#shopping {
  position: fixed;
  bottom: 0;
  left: 0;
}
.show2 {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5000;
  background: rgba(0, 0, 0, 0.3);
  display: none;
}
.el-rate {
  transform: scale(0.5);
}
.mask {
  height: 0.7rem;
  padding: 0.09375rem 0 0.09375rem 0.09375rem;
  background: rgba(119, 103, 137, 0.43);
}
.footer span {
  color: white;
}
.footer > div {
  display: flex;
  padding-right: 0.05rem;
  justify-content: space-between;
}
.descript {
  color: white;
  font-size: 0.009rem;
}
.descript {
  color: white;
  font-size: 0.009rem;
}
.subtract {
  background-color: rgb(240, 115, 115);
  border-color: rgb(240, 115, 115);
  color: white;
}
.comment {
  display: none;
}
.li2 {
  float: left;
  height: 0.19rem;
  padding: 0.07031rem 0.07031rem;
  background: #ebf5ff;
  font-size: 0.14rem;
  text-align: center;
  line-height: 0.19rem;
  margin-right: 0.09375rem;
  margin-bottom: 0.04688rem;
}
.trueComment {
  overflow: hidden;
  padding: 0.11719rem 0.11719rem;
}
.score2 {
  color: #999;
  font-size: 0.16rem;
}
.score {
  font-size: 0.16rem;
  color: #f60;
}
.commentheaderright {
  display: flex;
  justify-content: space-between;
}
.commentheaderright .com_text {
  width: 0.6rem;
  font-size: 0.12rem;
}
.commentheaderright > p > div {
  width: 0.57938rem;
}
.commentheaderright > div {
  display: flex;
  justify-content: space-between;
}
.commentheaderleft > p:nth-child(1) {
  font-size: 0.3rem;
  color: #f60;
}
.commentheaderleft > p:nth-child(3) {
  font-size: 0.14rem;
}
.commentheader > div {
  width: 50%;
  height: 0.72344rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
}
.commentheader {
  padding: 0.1875rem 0.11719rem;
  margin-bottom: 0.11719rem;
  border-bottom: 0.14rem solid rgba(119, 103, 137, 0.43);
  display: flex;
  justify-content: space-between;
}

</style>