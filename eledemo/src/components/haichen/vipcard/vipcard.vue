<template>
  <div>
    <transition name="router-slid" mode="out-in">
      <router-view :key="key" v-if="$route.path=='/vipcard/vipDescription'"></router-view>
    </transition>
    <transition name="router-slid" mode="out-in">
      <router-view :key="key" v-if="$route.path=='/vipcard/invoiceRecord'"></router-view>
    </transition>
    <transition name="router-slid" mode="out-in">
      <router-view :key="key" v-if="$route.path=='/vipcard/useCart'"></router-view>
    </transition>
    <div v-if="$route.path=='/vipcard'">
      <div class="header">
        <div>
          <div @click="back_()">
            <i class="el-icon-arrow-left"></i>
          </div>
          <div>会员中心</div>
        </div>
      </div>
      <div class="banner">
        <div>
          为账户为{{username}}
          <span>购买会员</span>
        </div>
      </div>
      <div v-on:click.stop="special" class="special">
        <div>
          <h3>会员特权</h3>
          <div>
            会员说明
            <span class="el-icon-arrow-right"></span>
          </div>
        </div>
      </div>
      <div class="free">
        <div>
          <div class="middle">
            <div class="img">
              <img
                src="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABQCAMAAACTf/MwAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACHUExURUxpcVGm/1Kn/1Kn/1Gm/1Gm/6f//1Gm/1ao/1Wq/1Gm/1Gm/1Gm/1Kn/1qx/1Gm/1Gm/2C2/1Gm/1Gm/2O2/1Om/1Sq/1Wq/1Sp/1Gm/1Ko/1er/1Gn/1Gm/1Gn/1Kn/1Kn/1Kn/1Kn/1Kn/1Gn/1Gm/1Gm/1Sp/1Gm/1Gm/1Kn/1Gm/1Gm/0Kn+j4AAAAsdFJOUwCKSJH+1gH4JSD1+6C3Du2ZBKflCSsaKC7BNhSwb8pmeEJWT7zGgzzR2l7fYL3NXQAAA75JREFUeNrFlmtzgjoQQMNDwaC8Kw9B8Vltz///fbfFXOoItUFn7j0fjCNwzO6GZMV/QroPiyQ4zj/85x3+rpIovMVm9Yxj9bFwuGKroaiX4xzLzcGjZd2UflrWhXc1rZuZrmNWFzYA9rHuHlptFkp8brK/HW6zVsk4bO5C8D8qFebklD9y5KczLY5KaD/psaTl0ying47SuNAiq0flTffzgJbE2kZ3F9+tT1qCeJeKP4jMUJmC0LyZk7lWv873qdAi2lqJytPuX1EDQBKqOWoyLY1rBOHVUwOB9T4V4ylPCWC1K0JC7IsnSS2wv8tvQBGJ54mh+hoK2IrxuN2ih+RrCOCJkEppqWQqATjjLVkAhvo+gZmGxq/3vR0ggWQ2TtOAeyeeQPAmdDVmuyWEYH4N+0PeTeaM8y50NQ3O8keT4HQV9Yu90NWUHs5Kaa6DLEWHria9QHMTVFqohIzTWHCMbjTCP6vyjNHsbaQrbjWRBVxWozRbBzbiVpOfAThEIzRbCbG40USNA4QSLH3Nzrn5Wwsy9wjIjdjZsNPVmB4c/W6xGVboAMV3ek8g3zQ1MRzSn+2+sgFZT9s8F7DW1JRrI+1OyyMAhXvzVqZ6GkVUNuooX5uiIz802pWKsp2xCGhx4t7uqKPZh4dPjw4ZWz8Ym1RTM+Mh66meJrcBj1950wwqM9/dFILyrUe+hq2ORjGFiRhgDub/osEbwP5V4+ENa4bpay6txsEe1MjFAMmwZimEhOlLufmEVXsEpy9pElipzwFNYAwwGdBIiFSiX0mx3ZZ6DfkrGh+Cr6ECc0jz6Q4wcHMG5+uOvXklxVtYXPsOQ/TwCHK3Rzbwam4g/Br2UPU1Cb+R9Q/pumsB7zG0ty3Vgk4DcPvJ2RnzAcLav288HOyVOpU24mlMWKsccex1vNrM4XQ90Rx463W8mviyeziGuNfxanL6CaUEO+91vFos5U2HEcM56nW8OlS3K8CVYPU6Xg1qsG9u3wB11/Fqs/fu8hiD/SFGsnVUs9oRHcBuxll2Dkz8u/ofgTDVl0xPNlyWvaa8As7aK3h1ANYr0SOyVIenwy4A4nT4mgSOmcaiqwCvFr/gFoBn+I8lUSOBSfkgb7UEko9Hke0vgHeKxCNmFcD51zX4fgQocvEX5gWgGHwl8op2tkKDqA4ADr3gs9gG5MkXevgnCbAo+xIvXAl9lpbTirrQ8lZix64YxzL0AIrtd9XK6irJxHhmoQOQVNWFVtIvj35oCk/N5EmRkQAEliteY5qZZh6JP/gH4pi+7mLJkZ4AAAAASUVORK5CYII="
                alt
              >
            </div>

            <div class="ko">
              <h4>减免配送免费</h4>
              <p>每月减免30单,每月减免39单,每单最高减4元</p>
              <p>蜂鸟送专免</p>
            </div>
          </div>
        </div>
      </div>

      <div class="free">
        <div>
          <div class="middle">
            <div class="img">
              <img
                src="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABQCAMAAACTf/MwAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAB+UExURUxpcVKn/1qw/1Or/1Gm/1Gm/1Gm/1Gm/1Or/1Gm/1Ws/3DU/1Gm/161/1Gn/1Gm/1Op/1Kn/1Gn/1Oo/1Gn/1Kn/1Gn/1Sq/1Gn/1Kn/1Gm/1Gn/1Gn/1Sp/1Gm/1Gm/1Gm/1Gm/1Kn/1Kn/1Gm/1Gn/1Gm/1Gn/1Kn/1Gm/xLw9zUAAAApdFJOUwBEDxz9w/T5ItYWA+0IbeUtTZo2tJPMJ9N+pHZVPa7bvOFcY4SNialmEIpfyAAAA5pJREFUeNq9l+mSojAYRdlRZEdRVFBc+7z/C45DUhZtFCJTNfdPbJXjt+UmbfwXRfvcTUI3P1nTGdap8ZDyjz/BFEZwXvoIOXJxY/s7hh0f5bPlrrCiInYdQSp3M13G7PGQ8vPBz9GX4Go9zljvSrUYz1JJ0vySDjHSaiMZy3Pwtuj7uyx6eyveM4rbgU5eM9TeKNuGdEpW9eLlw/raSsZ2HxkjWpi5JIW52SOZJfLdTDJGSfUqkXXaG1KViFGQ9VXIDHLxZwyEVyVPLdIlAVbdRHhwtyZvuis4f9t/A3dhTNcW7o/FBXPC0+vn0EPyWEKYkFLhrWQKEgD+hFhCuMnXc5hNw9gtJPa/Yqw5hKnxrxh7g18bo5is5aOS7G84bmaMYhYhAwpFh8YxAYMKNDE2JMYHJWBrYmZw+IQ5wEwTk8LmE2YDqSamgPKxVFXVr/uqih9LCYUmpgb3sfgQ/ap7KDZyrYkx4Sique6FKAp2BFMTk8FSlKE3ZCcR4hIyTcwemseSw9V4KhdbuoG9JuYEWxGU/2zu2hfZbOGkiTkLt18cwLXlKJWwkUGdNTGxNHvTAW9XB0G988DpOrSCWBOzg6t44fCUI56+wk4TU8FFFjvp+UOnC1SjGOWr0blpPa9tzpHyE4MYNXA1YQ2MWka1/HoYtanqMKgYR8EoI6aOpmpBPo7RkzLw6kZRMbZheGD0pG4/ddv+VtvZcyhtRUoxA9VEVHu2JKwv1ZpUS+vLg4UsdE+qUaoG25fsUQnpgG2P2r0FoehLNnCIjB4+awFewXngSBs9Ck3Ru51wx55CBhUav/QD+dtJmDOo+dsdOIP2JcyWAbWmMh6mzGFtTFbk43RX0DvE0zEmcpDOL4P5XWhbpB1aPqyVG6+mLA/SJ3Cr3Hg1deGZSgFOqtx4tWR7PW+6QxkpN14dLfs7debBVbnxaigGp+4PtGi6uPFqK/Nf6ngH5/T1yPiv/4pFR3B231H2Psytl/67QB7pQxaVAwelp9ESKLUnODgCZfAGvwK8WDOhELhH7z/zAFcjILsB/Pij0bqAf7NGrGHnAZtioG6xByTnxdCwHAD/MtyNWQOw+TiDtQvgpuNDdQBw326JtAFITloTEYcARyX59d0BvMrS9aKLB7AsfkG2DuDngaEve+UDHOtnOl0kzvZb87dzATI7Y2s6yH3KCTIToLZpDnQQpT3fpUYvnYmgWwsQriRkutZmlo6eOH8AyHKn4WUusgUAAAAASUVORK5CYII="
                alt
              >
            </div>

            <div class="ko">
              <h4>减免配送免费</h4>
              <p>每月减免30单,每月减免39单,每单最高减4元</p>
              <p>蜂鸟送专免</p>
            </div>
          </div>
        </div>
      </div>
      <div class="kai2">
        <div class="kai">
          <div>开通会员</div>
          <div>
            <div>
              1个月
              <span>¥20</span>
            </div>
            <div class="buy">购买</div>
          </div>
        </div>
      </div>
      <div v-on:click="one" class="card">
        <div>
          <div>兑换会员</div>
          <div>
            使用卡号加密
            <span class="el-icon-arrow-right"></span>
          </div>
        </div>
      </div>
      <div v-on:click.stop="record" class="fapiao">
        <div>
          <div>购买记录</div>
          <div>开发票</div>
        </div>
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "急急急"
    };
  },
  computed: {
    key() {
      return this.$route.path + Math.random();
    }
  },
  methods: {
    back_() {
      this.$router.go(-1);
    },
    special() {
      this.$router.push({
        //useCard1
        name: "vipDescription",
        params: {
          name: "我的优惠",
          username: this.username
        }
      });
    },
    record() {
      this.$router.push({
        //useCard1
        name: "invoiceRecord",
        params: {
          name: "购买记录",
          username: this.username
        }
      });
    },
    one() {
      this.$router.push({
        //useCard1
        name: "useCard",
        params: {
          name: "兑换会员",
          username: this.username
        }
      });
    }
  },
  created() {
    console.log(this.$route);
  }
};
</script>
<style scoped>
.footer {
  width: 100%;
  height: 10%;
  background: rgb(245, 245, 245);
  position: fixed;
  bottom: 0;
  left: 0;
}
.fapiao > div {
  width: 90%;
  margin: 0 auto;
  height: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.fapiao {
  width: 100%;
  height: 0.4rem;
}
.card > div {
  width: 90%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card {
  width: 100%;
  height: 0.4rem;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.3rem solid rgb(245, 245, 245);
}
.buy {
  color: orangered;
  backface-visibility: white;
  width: 0.5rem;
  height: 0.3rem;
  border: 1px solid orangered;
  border-radius: 0.02rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.kai2 {
  border-bottom: 0.3rem solid rgb(245, 245, 245);
}
.kai > div:nth-child(2) span {
  color: orangered;
}
.kai > div:nth-child(2) {
  height: 0.53rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.kai > div:nth-child(1) {
  height: 0.53rem;
  display: flex;
  align-items: center;
}
.kai {
  width: 100%;
  height: 1.2rem;
  padding: 0 0.2rem;
  margin: auto;
  background: #fff;
}
.middle {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
}
.ko {
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.img {
  height: 100%;
}
.free p {
  font-size: 0.12rem;
  color: gray;
}
.free > div img {
  float: left;
  height: 0.3rem;
  margin-right: 0.2rem;
}
.free > div {
  width: 90%;
  margin: auto;
  height: 100%;
  display: flex;
  align-items: center;
  border-bottom: 0.03rem solid rgb(245, 245, 245);
}
.free {
  width: 100%;
  height: 1rem;
  background: #fff;
}
.special > div {
  width: 90%;
  margin: auto;
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.03rem solid rgb(245, 245, 245);
}
.special {
  width: 100%;
  height: 0.5rem;
  display: flex;
  align-items: center;
}
.banner span {
  color: white;
  background: gray;
}
.banner > div {
  width: 50%;
  margin-left: 0.2rem;
}
.banner {
  height: 0.5rem;
  background: rgb(245, 245, 245);
  display: flex;
  align-items: center;
}
.header {
  width: 100%;
  background: #3190e8;
  height: 0.5rem;
  display: flex;
  align-items: center;
}
.header > div {
  width: 50%;
  margin-left: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header div {
  color: white;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
}

.router-slid-enter-active,
.router-slid-leave-active {
  transition: all 0.4s;
}
.router-slid-enter,
.router-slid-leave-active {
  transform: translate(100%);
  opacity: 0;
}
</style>