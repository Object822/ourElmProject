<template>
  <div>
    <router-view v-if="$route.name=='register'"></router-view>
    <router-view v-if="$route.name=='search'"></router-view>
    <div v-if="$route.name=='chooseAddress'" class="address">
      <!-- logo -->
      <div class="header">
        <div class="boult">
          <span class="el-icon-arrow-left" @click="go()"></span>
        </div>
        <span>选择地址</span>
      </div>
      <!-- 新增地址 -->
      <div class="newaddress">
        <!-- 新增内容 -->
        <!-- <router-link :to="{name:'confirmOrder'}"> -->
          <ul class="content"  v-if="isOnline">
             <span class="el-icon-success"></span>
             <div class="el-success">
            <li v-for="(gep ,index) in ged " :key="index" class="conli" @click="success(ged,index)" >
             
              <div class="content-top">
                <p style="line-height:.2rem;">
                  <span>{{gep.name}}</span>
                  <span>{{setSex(gep)}}</span>
                  <span>{{gep.phone}}</span>
                </p>
                <p style="line-height:.2rem;">
                  <span
                    :style="{backgroundColor:setbagcolor(gep)} "
                    style="font-size:0.1rem;  border-radius:0.03rem;  color: white;"
                    class="back"
                  >{{gep.tag}}</span>
                  <span style="font-size: 0.1rem;color: #777;">{{gep.address}}</span>
                </p>
              </div>
            </li>
            </div>
          </ul>
        <!-- </router-link> -->
      </div>
      <router-link :to="{name:'register'}">
        <div class="newadd">
          <img src="./img/添加.png">
          <span>添加后货地址</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ged: "",
      isOnline: true
    };
  },

  methods: {
    go() {
      this.$router.go(-1);
    },
    // 封装标签颜色方法
    setbagcolor(value) {
      if (value.tag == "家") {
        return "#ff3a00";
      } else if (value.tag == "公司") {
        return "#00e459";
      } else if (value.tag == "学校") {
        return "#008bf0";
      } else {
        return "#ff3a00";
      }
    },
    setSex(sexData) {
      if (sexData.sex == 1) {
        return "先生";
      } else if (sexData.sex == 2) {
        return "女士";
      } else {
        return "";
      }
    },
    success(con, index) {
      this.$router.push({
        name: "confirmOrder",
        params: {
          con: con,
          index
        }
      });
    }
  },
  created() {
    this.$http({
      methods: "get",
      url: "https://elm.cangdu.org/v1/users/22598/addresses"
    }).then(res => {
      console.log(res,'ress');
      this.ged = res.data;
    });
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  height: 0.5rem;
  background-color: #3190e8;
}

.header span {
  text-align: center;
  position: absolute;
  left: 50%;
  top: 25%;
  margin-left: -25%;
  width: 50%;
  font-size: 0.18rem;
  color: white;
}

.boult {
  position: absolute;
  top: 0.1rem;
  left: 0.2rem;
}

.newadd {
  position: fixed;
  bottom: 0.3rem;
  z-index: 10;
}

.newadd img {
  margin-left: 1rem;
  width: 0.2rem;
  height: 0.2rem;
}

.newadd span {
  font-size: 0.18rem;
  color: #3190e8;
}

.newaddress {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  /* height: 5rem; */
  background-color: white;
  top: .45rem;
}

.content {
  padding: 0.1rem;
  margin-left: 0.2rem;
}

.conli {
  display: flex;
  flex-wrap: wrap;
  line-height: 0.5rem;
  align-items: top;
  height: 0.65rem;
  border-bottom: 0.1px solid #f5f5f5;
}

.el-icon-success {
  float: left;
  padding-top: 0.15rem;
  color: #4cd964;
  font-size: 0.2rem;
  /* margin: 0.05rem; */
}
.el-success{
  padding-left: 0.3rem;
}

.content-top span:nth-child(1) {
  font-size: 0.2rem;
  color: black;
}

.content-top span:nth-child(2) {
  font-size: 0.15rem;
  color: black;
}

.content-top span:nth-child(3) {
  font-size: 0.15rem;
  color: black;
}

.content-bot {
  margin-top: 0.1rem;
}

.content-bot span {
  font-size: 0.1rem;
  color: #777;
}

.content-top {
  margin-top: 0.1rem;
}
</style>
