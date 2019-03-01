<template>
  <!-- logo -->
  <div class="header">
    <div class="head-top">
      <span>ele.me</span>
      <p>登录|注册</p>
      <b>{{cityinfo.name}}</b>
    </div>
    <!-- 搜索页面 -->
    <form class="formone">
      <div class="city_form1">
        <input v-model="search" type="text" placeholder="输入学校 商务楼 地址" class="city_formt">
      </div>
      <div class="city_form2">
        <button class="city_forms" @click="search_msg()">提交</button>
      </div>
    </form>
    <!-- 历史记录 -->
    <ul class="getpois_ul">搜索历史</ul>
  
    <div>
      <li v-for="(value,index) in city" :key="index">
        {{value.address}}
      </li>
    </div>
    
  </div>
</template>


<script>
  export default {
    name: "city",
    data() {
      return {
        city: null,
        search: null,
        geohash: null,
        cityinfo: null
      };
    },
    created() {
      // this.cityguess();
      this.$http({
        method: "get",
        url: "https://elm.cangdu.org/v1/cities/" +
          this.$route.params.cityId
  
      }).then(res => {
        this.cityinfo = res.data;
        console.log(res.data);
      });
    },
    methods: {
  
      // cityguess() {
      //   this.$http({
      //     method: "get",
      //     url: "https://elm.cangdu.org/v1/cities?type=guess"
      //   }).then(res => {
      //     this.city = res.data.id;
      //     console.log(res.data);
      //     this.geohash = res.data.latitude+","+res.data.longitude
      //   });
  
      // },
  
  
      search_msg() {
        if (this.search != "") {
          this.$http({
            method: "get",
            url: "https://elm.cangdu.org/v1/pois?city_id=" +
              this.$route.params.cityId +
              "&keyword=" +
              this.search
          }).then(res => {
            this.city = res.data;
            console.log(res.data);
          });
  
  
        }
  
      },
  
    },
  
  };
</script>

<style scoped>
  .head-top {
    width: 100%;
    height: 0.5rem;
    font-size: 0.17rem;
    background-color: #3190e8;
    position: fixed;
    z-index: 10;
  }
  
  .head-top span {
    position: absolute;
    top: 0.15rem;
    left: 0.2rem;
    color: aliceblue;
  }
  
  .head-top p {
    position: absolute;
    right: 0.1rem;
    top: 0.15rem;
    color: aliceblue;
  }
  
  .formone {
    padding-top: 0.7rem;
  }
  
  .city_form1 {
    margin: 0 auto;
    text-align: center;
  }
  
  .city_form2 {
    margin: 0.1rem auto;
    text-align: center;
  }
  
  .city_formt {
    border: 0.01rem solid #e4e4e4;
    font-size: 0.2rem;
    width: 90%;
    color: black;
    height: 0.4rem;
  }
  
  .city_forms {
    border: 0.01rem solid #e4e4e4;
    width: 90%;
    font-size: 0.15rem;
    background-color: #3190e8;
    color: white;
    height: 0.4rem;
  }
  
  .getpois_ul {
    margin-left: 0.2rem;
  }
</style>

