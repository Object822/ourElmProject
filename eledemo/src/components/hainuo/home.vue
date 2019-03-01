<template>
  <!-- logo -->
  <div class="header">
    <div class="head-top">
      <span>ele.me</span>
      <p>登录|注册</p>
    </div>
    <!-- 定位城市 -->
    <div class="city-nav">
      <span class="nav-1">当前定位城市:</span>
      <span class="nav-2">定位不准时,请在城市列表中选择</span>
    </div>
    <!-- 定位城市请求 -->
    <div class="quess">
      <router-link :to="{name:'city',params:{cityId:city.id}}" :v-if="city != null">
        <span>{{city.name}}</span>
      </router-link>
    </div>
    <!-- 热门城市 -->
    <div class="hot">
      <h3>热门城市</h3>
  
      <el-row>
        <el-col :span="6" v-for="(value,index) in hot" :key="index" :v-if="hot != null">
          <router-link :to="{name:'city',params:{cityId:value.id}}">
            <div class="grid-content bg-purple  hotli">{{value.name}}</div>
          </router-link>
        </el-col>
      </el-row>
  
    </div>
    <!-- 所有城市 -->
    <div class="group">
      <span>(按字母排序)</span>
  
      <h4 v-for="(value,index) in abc" :key="index" :v-if="abc != null">
        {{value}}
  
        <el-row>
          <el-col :span="6" v-for="(value,index) in group[value]" :key="index">
            <router-link :to="{name:'city',params:{cityId:value.id}}">
              <div class="grid-content bg-purple groupone">{{value.name}}</div>
            </router-link>
          </el-col>
        </el-row>
  
      </h4>
    </div>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        city: null,
        hot: null,
        group: null,
        abc: null
      };
    },
    created() {
      this.$http({
        method: "get",
        url: "https://elm.cangdu.org/v1/cities?type=guess"
      }).then(res => {
        this.city = res.data;
        console.log(this.city);
  
      });
  
      this.$http({
        method: "get",
        url: "https://elm.cangdu.org/v1/cities?type=hot"
      }).then(ret => {
        this.hot = ret.data;
        console.log(this.hot);
  
      });
      this.$http({
        method: "get",
        url: "https://elm.cangdu.org/v1/cities?type=group"
      }).then(reo => {
        this.group = reo.data;
        this.abc = Object.keys(reo.data).sort();
      });
    }
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
    left: 0.08rem;
    color: aliceblue;
  }
  
  .head-top p {
    position: absolute;
    right: 0.1rem;
    top: 0.15rem;
    color: aliceblue;
  }
  
  .city-nav {
    padding-top: 0.6rem;
    height: 0.4rem;
    border-bottom: 0.01rem solid #e4e4e4;
  }
  
  .nav-1 {
    font-size: 0.1rem;
    line-height: 0.2rem;
    padding-left: 0.1rem;
  }
  
  .nav-2 {
    font-size: 0.1rem;
    line-height: 0.2rem;
    padding-left: 0.8rem;
  }
  
  .quess {
    height: 0.3rem;
    border-bottom: 0.01rem solid #e4e4e4;
  }
  
  .quess span {
    margin-left: 0.2rem;
    font-size: 0.2rem;
    color: #3190e8;
  }
  
  .hotli {
    padding: 0.05rem;
    color: #3190e8;
    border: 0.01rem solid #e4e4e4;
    border-bottom: 0.01rem solid #e4e4e4;
    border-left: 0.01rem solid #e4e4e4;
    height: 0.2rem;
    font-size: 0.2rem;
    text-align: center;
  }
  
  .hot {
    padding-top: 0.2rem;
    padding-left: 0.2rem;
  }
  
  .group {
    padding-top: 0.2rem;
    padding-left: 0.2rem;
  }
  
  .groupone {
    color: black;
    padding-right: 0.1rem;
    border: 0.01rem solid #e4e4e4;
    border-bottom: 0.01rem solid #e4e4e4;
    border-left: 0.01rem solid #e4e4e4;
    line-height: 0.5rem;
    height: 0.5rem;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>



