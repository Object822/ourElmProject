<template>
  <div>
    <router-view v-if="$route.name=='questionDetail'"></router-view>
    <div v-if="$route.name=='service'">
      <tit>{{username}}</tit>
      <div class="content">
        <div class="banner">
          <a href="###">
            <div class="left">
              <div class="ss">
                <i class="el-icon-service"></i>
                <div>在线客服</div>
              </div>
            </div>
          </a>
          <a href="###">
            <div class="right">
              <div class="ss">
                <i class="el-icon-phone"></i>
                <div>在线客服</div>
              </div>
            </div>
          </a>
        </div>
        <div class="hot">热门问题</div>
        <div v-on:click.stop="lp(value)" :key="index" v-for="(value,index) in data1" class="ko">
          <div>
            <p>{{value}}</p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<<script>
import tit from './title.vue'
export default {
    data(){
        return{
            username:null,
            data1:[
                '超级会员权益说明',
                '签到规则',
                '用户等级说明',
                '积分问题',
                '教我拍大片',
                '支付问题',
                '其它问题',
                '准时达问题',
                '会员说明',
                '会员问题'
            ],
            
        }
    },
    components:{
        tit,
    },
    methods:{
        lp(value){
            this.$router.push({
                name:'questionDetail',
                params:{
                    username:value,
                    content:'搜索'
                }
            })
        }
    },
    created() {
        console.log(this.$route)
        this.username=this.$route.params.username
    },
}
</script>
<style scoped>
.ko > div {
  width: 90%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ko {
  width: 100%;
  margin: 0 auto;
  border-bottom: 0.02rem solid rgb(245, 245, 245);
  display: flex;
  height: 0.45rem;
}
.hot {
  width: 90%;
  height: 0.5rem;
  margin: 0 auto;
  border-bottom: 0.02rem solid rgb(245, 245, 245);
  display: flex;
  align-items: center;
  font-weight: 1000;
}
.ss {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.banner > a {
  width: 100%;
  color: black;
}
.right {
  width: 100%;
  height: 1rem;
  box-sizing: border-box;
  border-left: 0.02rem solid rgb(245, 245, 245);
  border-bottom: 0.02rem solid rgb(245, 245, 245);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 0.16rem;
}
.left {
  width: 100%;
  height: 1rem;
  box-sizing: border-box;
  border-left: 0.02rem solid rgb(245, 245, 245);
  border-bottom: 0.02rem solid rgb(245, 245, 245);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 0.16rem;
}
.banner {
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 20%;
  background: white;
}

.content {
  width: 100%;
  margin-top: 0.5rem;
  background: #fff;
}
</style>

