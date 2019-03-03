<template>
  <div class="remark">
    <!-- logo -->
    <div class="header">
      <div class="boult">
        <span class="el-icon-arrow-left" @click="go()"></span>
      </div>
      <span>订单备注</span>
    </div>
    <!-- 备注 -->
    <div class="remark-but">
      <header class="reamrk-header">快速备注</header>
      <div class="remark-box">
        <ul class="reamrk-box1">
          <li :class="[isShow==index?isActive:'']" v-for="(value,index ) in remarks[0]" :key="value" @click="box1(index)">{{value}}</li>
        </ul>
        <ul class="remark-box2">
          <li v-for="(value,index ) in remarks[1]" :key="value" :class="[isActive1==index?isActive:'']" @click="box2(index)" class="no-coriander">{{value}}</li>
          <li v-for="(value,index ) in remarks[2]" :key="value" class="no-onion" :class="[isActive2==index?isActive:'']" @click="box3(index)">{{value}}</li>
          <li v-for="(value,index ) in remarks[3]" :key="value" class="vinegar" :class="[isActive3==index?isActive:'']" @click="box4(index)">{{value}}</li>
          <li v-for="(value,index ) in remarks[4]" :key="value" class="shallot" :class="[isActive4==index?isActive:'']" @click="box5(index)">{{value}}</li>
        </ul>
        <ul class="remark-box3">
          <li v-for="(value,index ) in remarks[5]" :key="value" class="remark-box3li" :class="[isShow1==index?isActive:'']" @click="box6(index)">{{value}}</li>
        </ul>
      </div>
      <!-- 其他备注 -->
      <div class="remark-else">
        <div class="else">
          <span>其它备注</span>
          <textarea class="write" placeholder="请输入备注内容(可不填)" autofocus v-model="index1"></textarea>
        </div>
      </div>
    </div>
    <!-- foot -->
    <router-link :to="{name:'confirmOrder',params:{value:index1,data:value1}}">
      <div class="foot">确定</div>
    </router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        radio3: "",
        radio4: "",
        remarks: "",
        isActive: "isActive",
        isShow: -1,
        isActive1: -1,
        isActive2: -1,
        isActive3: -1,
        isActive4: -1,
        isShow1: -1,
        value1: {},
        index1: null
      };
    },
  
    created() {
      this.$http({
        method: "get",
        url: "https://elm.cangdu.org/v1/carts/1/remarks"
      }).then(res => {
        this.remarks = res.data.remarks;
        console.log(this.remarks);
      });
    },
  
    methods: {
      go() {
        this.$router.go(-1);
      },
      box1(index) {
        this.isShow = index;
  
        if (this.value1[1]) {
          console.log("搜索", this.value1[1], index);
          if (this.value1[1][index]) {
            console.log("11111111111");
          } else {
            console.log("22", this.value1[1] == null, this.value1[1]);
            if (this.value1[1] == null) {} else {
              delete this.value1[1];
              this.$set(this.value1, 1, {});
              this.$set(this.value1[1], index, this.remarks[0][index]);
            }
          }
        } else {
          this.$set(this.value1, 1, {});
          this.$set(this.value1[1], index, this.remarks[0][index]);
        }
        this.remarks;
        console.log(this.value1, "最后");
      },
      box2(index) {
        if (this.isActive1 == index) {
          this.isActive1 = -1;
        } else {
          this.isActive1 = index;
        }
        if (this.value1[2]) {} else {
          this.$set(this.value1, 2, this.remarks[1][0]);
        }
      },
      box3(index) {
        if (this.isActive2 == index) {
          this.isActive2 = -1;
        } else {
          this.isActive2 = index;
        }
        if (this.value1[3]) {} else {
          this.$set(this.value1, 3, this.remarks[2][0]);
        }
      },
      box4(index) {
        if (this.isActive3 == index) {
          this.isActive3 = -1;
        } else {
          this.isActive3 = index;
        }
        if (this.value1[4]) {} else {
          this.$set(this.value1, 4, this.remarks[3][0]);
        }
      },
      box5(index) {
        if (this.isActive4 == index) {
          this.isActive4 = -1;
        } else {
          this.isActive4 = index;
        }
        if (this.value1[5]) {} else {
          this.$set(this.value1, 5, this.remarks[4][0]);
        }
      },
      box6(index) {
        this.isShow1 = index;
  
        if (this.value1[6]) {
          if (this.value1[6][index]) {
            console.log("11");
          } else {
            console.log("22", this.value1[6] == null, this.value1[6]);
            if (this.value1[6] == null) {} else {
              delete this.value1[6];
              this.$set(this.value1, 6, {});
              this.$set(this.value1[6], index, this.remarks[5][index]);
            }
          }
        } else {
          this.$set(this.value1, 6, {});
          this.$set(this.value1[6], index, this.remarks[5][index]);
        }
        console.log(this.value1);
      }
    }
  };
</script>

<style scoped>
  .remark {
    background-color: #f5f5f5;
  }
  
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
  
  .remark-but {
    background-color: white;
    height: 2.3rem;
    margin-top: 0.4rem;
  }
  
  .reamrk-header {
    font-size: 0.15rem;
    line-height: 0.5rem;
    color: #333;
    margin-left: 0.2rem;
  }
  
  .reamrk-box1 {
    margin-left: 0.2rem;
  }
  
  .reamrk-box1 li {
    float: left;
    border: 0.01rem solid #3190e8;
    width: 0.7rem;
    height: 0.33rem;
    text-align: center;
    line-height: 0.33rem;
    border-radius: 0.03rem;
  }
  
  .remark-box2 {
    position: absolute;
    right: 0.3rem;
    top: 1.2rem;
    color: #333;
  }
  
  .no-coriander {
    position: absolute;
    top: -0.1rem;
    right: 0.2rem;
    border: 0.01rem solid #3190e8;
    width: 0.7rem;
    height: 0.33rem;
    text-align: center;
    line-height: 0.33rem;
    border-radius: 0.03rem;
  }
  
  .no-onion {
    position: absolute;
    top: 0.7rem;
    right: 2.55rem;
    border: 0.01rem solid #3190e8;
    width: 0.7rem;
    height: 0.33rem;
    text-align: center;
    line-height: 0.33rem;
    border-radius: 0.03rem;
  }
  
  .vinegar {
    position: absolute;
    top: 0.7rem;
    right: 1.5rem;
    border: 0.01rem solid #3190e8;
    width: 0.7rem;
    height: 0.33rem;
    text-align: center;
    line-height: 0.33rem;
    border-radius: 0.03rem;
  }
  
  .shallot {
    position: absolute;
    top: 0.7rem;
    right: 0.5rem;
    border: 0.01rem solid #3190e8;
    width: 0.7rem;
    height: 0.33rem;
    text-align: center;
    line-height: 0.33rem;
    border-radius: 0.03rem;
  }
  
  .remark-box3li {
    position: absolute;
    top: 2.4rem;
    left: 0.15rem;
    border: 0.01rem solid #3190e8;
    width: 0.7rem;
    height: 0.33rem;
    text-align: center;
    line-height: 0.33rem;
    border-radius: 0.03rem;
  }
  
  .remark-box3 li:nth-child(2) {
    position: absolute;
    top: 2.4rem;
    left: 0.86rem;
  }
  
  .isActive {
    color: white;
    background-color: #3190e8;
  }
  
  .else {
    position: relative;
    top: 2rem;
    background-color: white;
    height: 1.75rem;
  }
  
  .else span {
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    font-size: 0.15rem;
  }
  
  .write {
    background-color: #f5f5f5;
    width: 90%;
    height: 1rem;
    margin: 0.2rem;
    border: none;
    overflow: hidden;
    outline: none;
  }
  
  
  /* .write::-webkit-input-placeholder{
                      padding:  0.1rem;
                  } */
  
  .foot {
    font-size: 0.2rem;
    color: white;
    width: 90%;
    height: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
    margin: 0.4rem auto;
    border-radius: 0.07rem;
    background-color: #4cd964;
    position: fixed;
    bottom: -0.4rem;
    left: 0.2rem;
  }
</style>
