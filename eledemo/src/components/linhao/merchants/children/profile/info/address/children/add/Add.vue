<template>
  <div>
    <div class="info_wrap  animated fadeInRight faster">
      <!-- 头部 -->
      <ul class="header">
        <a>
          <i class="header_home el-icon-arrow-left backButton" @click="back_()"></i>
        </a>
        <span class="position_city">新增地址</span>
      </ul>
      <ul class="add_address_wrap">
        <li class="lists_input_wrap">
          <input
            :class="[erro_username ? erro_border_color:'']"
            type="text"
            placeholder="请填写你的姓名"
            v-model="uername"
          >
        </li>
        <p class="erro_msg" v-if="erro_username">请填写您的姓名</p>
        <li class="lists_input_wrap">
          <input type="text" placeholder="小区/写字楼/学校等" v-model="addr" @focus="addAddress()">
        </li>
        <li class="lists_input_wrap">
          <input
            type="text"
            placeholder="请填写详细送餐地址"
            v-model="det_addr"
            :class="[show_erro_adr||show_address_det ? erro_border_color:'']"
          >
        </li>
        <p class="erro_msg" v-if="show_erro_adr">送餐地址太短了，不能辨识</p>
        <p class="erro_msg" v-if="show_address_det">请详细填写送餐地址</p>
        <li class="lists_input_wrap">
          <input
            type="text"
            placeholder="请填写能够联系到您的手机号"
            v-model="phone"
            :class="[show_erro_pho||null_phone ? erro_border_color:'']"
          >
        </li>
        <p class="erro_msg" v-if="show_erro_pho">请输入正确的手机号</p>
        <p class="erro_msg" v-if="null_phone">手机号不能为空</p>
        <li class="lists_input_wrap">
          <input
            type="text"
            placeholder="备用联系电话（选填）"
            v-model="other_phone"
            :class="[show_other_phone ? erro_border_color:'']"
          >
        </li>
        <p class="erro_msg" v-if="show_other_phone">请输入正确的手机号</p>
      </ul>
      <div class="add_btn_wrap">
        <button class="add_btn" @click="add_newAddr()">新增地址</button>
      </div>
      <!-- 弹框 -->
      <transition name="show" enter-active-class="animated heartBeat">
        <div class="prompt_wrap" v-if="show_erro_MSG">
          <div class="tip_icon">
            <span></span>
            <span></span>
          </div>
          <p class="alert_text">{{res_erro_msg}}</p>
          <button class="OK_btn" @click="suer_btn">确认</button>
        </div>
      </transition>
      <!-- <transition name="router-slid" mode="out-in"> -->
        <router-view :key="key"></router-view>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show_erro: false,
      show_erro_adr: false,
      show_erro_pho: false,
      erro_username: false,
      show_address_det: false,
      null_phone: false,
      show_other_phone: false,
      show_erro_MSG: false,
      uername: "",
      addr: "",
      det_addr: "",
      phone: "",
      other_phone: "",
      erro_border_color: "erro_border_color",
      users_MSG: "",
      userID: "",
      addr_His: "",
      geohash: "",
      res_add_addr: "",
      res_erro_msg: ""
    };
  },
  computed: {
    key() {
      return this.$route.path + Math.random();
    }
  },
  created() {
    this.addr = this.$store.state.city_address.name;
    // console.log(this.addr);
    // 从本地获取用户信息
    let usersInfo = localStorage.getItem("user_data");
    this.users_MSG = JSON.parse(usersInfo);
    this.userID = this.users_MSG.user_id;

    // 从本地获取地址经纬度
    let addInfo = localStorage.getItem("History");
    this.addr_His = JSON.parse(addInfo);
    this.geohash = this.addr_His[0].geohash;
    console.log(this.geohash);
  },
  watch: {
    uername(val) {
      if (val == "") {
        this.erro_username = true;
      } else {
        this.erro_username = false;
      }
    },
    det_addr(val) {
      if (val == "") {
        this.show_address_det = true;
        this.show_erro_adr = false;
      } else if (val.length < 2) {
        this.show_erro_adr = true;
        this.show_address_det = false;
      } else {
        this.show_erro_adr = false;
        this.show_address_det = false;
      }
    },
    phone(val) {
      if (val == "") {
        this.null_phone = true;
        this.show_erro_pho = false;
      } else if (!/^1[34578]\d{9}$/.test(val)) {
        this.show_erro_pho = true;
        this.null_phone = false;
      } else {
        this.null_phone = false;
        this.show_erro_pho = false;
      }
    },
    other_phone(val) {
      if (!/^1[34578]\d{9}$/.test(val)) {
        this.show_other_phone = true;
      } else {
        this.show_other_phone = false;
      }
    }
  },
  methods: {
    back_() {
      // this.$router.go(-1);
      this.$router.push({
        name: "address"
      });
    },
    addAddress() {
      this.$router.push({
        name: "addDetail"
      });
    },
    add_newAddr() {
      this.$http({
        method: "POST",
        url: "https://elm.cangdu.org/v1/users/" + this.userID + "/addresses",
        data: {
          address: this.det_addr,
          address_detail: this.addr,
          geohash: this.geohash,
          name: this.uername,
          phone: this.phone,
          tag: "家",
          sex: 2,
          phone_bk: this.other_phone,
          tag_type: 2
        }
      }).then(res => {
        console.log(res.data);
        this.res_add_addr = res.data;
        if (res.data.status !== 0 && res.data.success == "添加地址成功") {
          this.$router.push({
            name: "address"
          });
        } else {
          this.show_erro_MSG = true;
          this.res_erro_msg = res.data.message;
        }
      });
    },
    suer_btn() {
      this.show_erro_MSG = false;
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
  z-index: 333;
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
  z-index: 333;
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

/* 新增地址框 */
.add_address_wrap {
  width: 100%;
  /* height: 2.31rem; */
  background: #fff;
  margin: 0.55rem 0 0.2rem;
  padding: 0.1rem 0.15rem;
}
.lists_input_wrap {
  width: 100%;
  height: 0.35rem;
  margin: 0 auto 0.1rem;
}
.lists_input_wrap input {
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  border: 0.01rem solid #ddd;
  outline: none;
  text-indent: 0.1rem;
  border-radius: 0.05rem;
}
.add_btn_wrap {
  width: 100%;
  height: 0.35rem;
  text-align: center;
}
.add_btn {
  width: 92%;
  height: 100%;
  border: none;
  outline: none;
  background: #4cd964;
  color: #fff;
  border-radius: 0.05rem;
}
.erro_msg {
  color: red;
  font-size: 0.12rem;
  transform: scale(0.7);
  margin-left: -0.6rem;
  margin-top: -0.1rem;
  font-weight: bolder;
}
.lists_input_wrap .erro_border_color {
  border-color: red;
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

/* .router-slid-enter-active,
.router-slid-leave-active {
  transition: all 0.4s;
}
.router-slid-enter,
.router-slid-leave-active {
  transform: translate3d(3rem, 0, 0);
  opacity: 0;
} */
</style>
