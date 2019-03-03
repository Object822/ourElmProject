<template>
  <div class="shopping">
    <!-- 
          购物车
    -->
    <div class="car">
      <div class="car_bottom">
        <div class="patterning">
          <span v-if="this.index_car>0" class="globule">{{this.index_car}}</span>
          购物
        </div>
        <section class="fee">
          <p>
            ¥
            <span>{{calculate?calculate.all_money:0.00}}</span>
          </p>
          <p v-if="pei">配送费¥{{pei}}</p>
        </section>
        <section class="gotopay">
          <span v-if="least">还查¥{{least&&calculate.all_money>0?calculate.all_money-least:least}}元</span>
        </section>
        <section @click="submit()" v-if="(least&&calculate.all_money>least)||calculate.all_money==least" class="gotopay2">
          <span>去结算</span>
        </section>
        
      </div>
    </div>
    <!-- 
           购物车
    -->
    <div v-if="restaurant_data" class="left">
      <ul>
        <li :key="index" v-for="(value,index) in restaurant_data">
          <img v-if="value.icon_url" :src="'https://fuss10.elemecdn.com/'+value.icon_url+'.jpeg'">
          <span>{{value.name}}</span>
        </li>
      </ul>
    </div>
    <div v-if="restaurant_data" class="right">
      <ul>
        <li :key="index" v-for="(value,index) in restaurant_data">
          <header>
            <section>
              <strong>{{value.name}}</strong>
              <span>{{value.description}}</span>
              <span>...</span>
              <div class="alter">{{value.description}}</div>
            </section>
          </header>
          <section class="content" :key="index2" v-for="(value2,index2) in value.foods">
            <div class="menu_link">
              <section>
                <img :src="'https://elm.cangdu.org/img/'+value2.image_path">
              </section>
              <section>
                <h3>{{value2.name}}</h3>
                <p>{{value2.description}}</p>
                <p>{{value2.tips}}</p>
                <p></p>
              </section>
            </div>
            <footer>
              <section>
                <span>¥</span>
                <span>{{value2.specfoods[0].price}}</span>
              </section>
              <section class="one" v-if="value2.specfoods.length==1">
                <div
                  v-if="foods[value2.specfoods[0].food_id]&&foods[value2.specfoods[0].food_id].number>0"
                  class="one_child1"
                  @click="decrease(value2.specfoods[0].food_id,value2.specfoods)"
                >-</div>
                <div
                  v-if="foods[value2.specfoods[0].food_id]&&foods[value2.specfoods[0].food_id].number>0"
                >{{foods[value2.specfoods[0].food_id].number}}</div>
                <div class="one_child3" @click="add(value2.specfoods[0].food_id,value2.specfoods)">+</div>
              </section>
              <section class="lot" v-if="value2.specfoods.length>1">
                <div
                  v-if="specfoods[value2.name]&&specfoods[value2.name].number>0"
                  class="decrease2"
                >-</div>
                <div>{{specfoods[value2.name]&&specfoods[value2.name].number>0?specfoods[value2.name].number:''}}</div>
                <div class="seleted" @click="select(1,value2.specfoods)">选规格</div>
                <!-- 
      规格
                -->
                <div v-if="specs_list" class="specs_list">
                  <header>
                    <span></span>
                    <h3>{{value2.name}}</h3>
                    <i @click.stop="disappear(1)" class="el-icon-close"></i>
                  </header>
                  <section>
                    <h4>规格</h4>
                    <ul>
                      <li
                        :class="number==index3?'check':'no_check'"
                        v-on:click="select_spect(index3)"
                        :key="index3"
                        v-for="(value3,index3) in value2.specfoods"
                      >{{value3.specs_name}}</li>
                    </ul>
                  </section>
                  <footer v-if="specs_list">
                    <div>
                      <span>¥</span>
                      <span v-if="specs_list[number]">{{specs_list[number].price}}</span>
                    </div>
                    <div :disabled="specs_list[number]" @click="join()">加入购物车</div>
                  </footer>
                </div>

                <!-- 
                  规格
                -->
              </section>
            </footer>
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
      specs_list: null,
      number: 0,
      foods: {},
      specfoods: {},
      index_car: 0,
      calculate:{
        all_money:0
      },
      pei: null,
      least: null
    };
  },
  methods: {
    submit(){
      this.$router.push({
        name:'confirmOrder'
      })
    },
    calculate_money() {
      let all_money=0;
      if (Object.keys(this.foods).length > 0) {
        for (let key in this.foods) {
          all_money = this.foods[key].number * this.foods[key].specfoods.price+all_money;
          
        }
      }
    this.calculate.all_money=all_money
    },
    join() {
      if (
        this.specs_list[this.number] &&
        this.specs_list[this.number].food_id &&
        this.specs_list[this.number].name
      ) {
        let id = this.specs_list[this.number].food_id;
        let name = this.specs_list[this.number].name;
        this.index_car++;
        if (!this.foods[id]) {
          this.$set(this.foods, id, {
            number: 1,
            specfoods: this.specs_list[this.number]
          });
           this.calculate_money();
            console.log('+++4444')
        } else {
          this.foods[id].number++;
          console.log('+++++')
           this.calculate_money();
        }
        this.specs_list = null;
        this.number = 0;
        if (this.specfoods[name]) {
          this.specfoods[name].number++;
            console.log('+++333')
           this.calculate_money();
        } else {
          this.$set(this.specfoods, name, {
            number: 1
          });
          console.log('++++222')
           this.calculate_money();
        }
          
      }
     
    },
    decrease(id, specfoods) {
      if (this.foods[id].number == 0) {
        delete this.foods[id];
      } else {
        this.foods[id].number--;
        if (this.index_car == 0) {
          this.index_car == 0;
        } else {
          this.index_car--;
        }
      }
      this.calculate_money();
    },
    add(id, specfoods) {
      this.index_car++;
      let specfoods1 = specfoods[0];
      if (!this.foods[id]) {
        this.$set(this.foods, id, {
          number: 1,
          specfoods: specfoods1
        });
      } else {
        console.log('家里吗')
        this.foods[id].number++;
      }
      this.calculate_money();
      console.log(this.foods)
    },
    select_spect(index) {
      this.number = index;
    },
    select(id, specfoods) {
      console.log(specfoods, id);
      if (!this.specs_list) {
        this.specs_list = specfoods;
      }

      this.$emit("call_back", specfoods);
      console.log("发送了吗到底");
    },
    disappear(id) {
      this.specs_list = null;
      this.index = 0;
      this.number2 = 0;
      this.$forceUpdate();
    }
  },
  created() {
    this.restaurant_id = this.$route.query.id;
    this.$http({
      method: "get",
      url:
        "  https://elm.cangdu.org/shopping/v2/menu?restaurant_id=" +
        this.restaurant_id
    }).then(res => {
      console.log(res);
      this.restaurant_data = res.data;
    });

    this.$http({
      url: " https://elm.cangdu.org/shopping/restaurant/" + this.restaurant_id,
      method: "get"
    }).then(res => {
      console.log(res, "kkk");
      this.pei = res.data.float_delivery_fee;
      this.least = res.data.float_minimum_order_amount;
      // this.least2 = res.data.float_minimum_order_amount;
    });
  },
  mounted() {}
};
</script>
<style scoped>
.check {
  border: 1px solid blue;
  color: blue;
}
.specs_list > footer > div:nth-child(2) {
  color: white;
  background: blue;
  box-sizing: border-box;
  padding: 0.05rem 0.05rem;
  border-radius: 0.02rem;
  font-size: 0.12rem;
  font-weight: 1000;
}
.specs_list > footer > div:nth-child(1) {
  color: orange;
  font-size: 0.16rem;
  font-weight: 1000;
}
.specs_list > footer {
  padding: 0.2rem 0.2rem;
  box-sizing: border-box;
  background: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.specs_list > section > ul > li {
  box-sizing: border-box;
  padding: 0.06rem 0.08rem;
  font-size: 0.15rem;
  margin-right: 0.1rem;
  border: 1px solid #ddd;
}
.specs_list > section > ul {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0.05rem 0 0.05rem 0;
}
.specs_list > section {
  box-sizing: border-box;
  padding: 0.1rem 0.2rem;
  margin-bottom: 0.2rem;
}
.el-icon-close {
  margin-top: 0.06rem;
  transform: scale(2);
}
.specs_list > header {
  box-sizing: border-box;
  padding: 0.1rem 0.2rem;
  display: flex;
  font-size: 0.15rem;
  justify-content: space-between;
}
.specs_list {
  width: 3rem;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 500;
  margin-left: -1.5rem;
  margin-top: -1rem;
  background: white;
}
.gotopay2 {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 1.2rem;
  background: green;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.15rem;
  color: white;
}
.gotopay {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 1.2rem;
  background: #535356;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.15rem;
  color: white;
}
.fee > p:nth-child(1) {
  font-size: 0.2rem;
  font-weight: 800;
}
.fee {
  color: white;
  position: absolute;
  bottom: 0.03rem;
  left: 1rem;
}
.globule {
  background: red;
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0.4rem;
  bottom: 0.3rem;
}
.patterning {
  position: absolute;
  left: 0.2rem;
  bottom: 0.1rem;
  width: 0.6rem;
  height: 0.6rem;
  background: blue;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: 0.04rem solid #444;
  box-sizing: border-box;
  border-radius: 100%;
}
.car_bottom {
  height: 0.5rem;
}
.car {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #3d3d3f;
  z-index: 200;
}
.left::-webkit-scrollbar {
  width: 0 !important;
}
.right::-webkit-scrollbar {
  width: 0 !important;
}
.lot div:nth-child(2) {
  margin: 0 0.1rem 0 0.1rem;
}
.seleted {
  width: 0.6rem;
  padding: 0.05rem 0.05rem;
  box-sizing: border-box;
  background: blue;
  border-radius: 0.1rem;
  display: flex;
  justify-content: center;
  align-content: center;
  color: white;
  font-size: 0.15rem;
}
.decrease2 {
  font-size: 0.15rem;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 0.2rem;
  height: 0.2rem;
  box-sizing: border-box;
  border: 2px solid gray;
  border-radius: 50%;
  color: gray;
}
.lot {
  display: flex;
  align-items: center;
}
.one div:nth-child(2) {
  margin: 0 0.1rem 0 0.1rem;
}
.one_child3 {
  width: 0.2rem;
  height: 0.2rem;
  box-sizing: border-box;
  border-radius: 50%;
  background: blue;
  display: flex;
  justify-content: center;
  align-content: center;
  color: white;
  font-size: 0.15rem;
}
.one_child1 {
  font-size: 0.15rem;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 0.2rem;
  height: 0.2rem;
  box-sizing: border-box;
  border-radius: 50%;
  background: blue;
  color: white;
}
.one {
  display: flex;
}
footer > section:nth-child(1) {
  color: orange;
  font-size: 0.16rem;
}
footer {
  padding: 0.1rem 0 0.1rem 0.6rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.menu_link > section:nth-child(2) h3 {
  font-weight: 1000;
  font-size: 0.2rem;
}
.menu_link > section:nth-child(2) {
  flex: 1;
  overflow: hidden;
}
.menu_link > section:nth-child(1) {
  width: 20%;
  margin-right: 0.1rem;
}
.menu_link > section:nth-child(1) > img {
  width: 100%;
}
.menu_link {
  width: 100%;
  display: flex;
}
.content {
  padding: 0.1rem 0.1rem;
  box-sizing: border-box;
  background: white;
  border-bottom: 0.01rem solid #ededed;
}
.alter {
  width: 40%;
  height: 0.4rem;
  line-height: 0.4rem;
  border-radius: 0.1rem;
  text-align: center;
  z-index: 1;
  position: absolute;
  right: 0;
  color: white;
  background: rgba(0, 0, 0, 0.8);
}
.right header section > span:nth-child(3) {
  float: right;
}
.right header section strong {
  width: 100%;
  font-size: 0.2rem;
  margin-right: 0.1rem;
  font-weight: 1000;
}

.right header section {
}
.right ul {
}
.right header {
  padding: 0.1rem 0.1rem;
  box-sizing: border-box;
  position: relative;
}
.left li {
  width: 0.9rem;
  height: 0.3rem;
  box-sizing: border-box;
  padding: 0.25rem 0.08rem;
  border-bottom: 0.01rem solid #ededed;
  border-left: 0.05rem solid #f8f8f8;
  overflow: hidden;
  overflow: hidden; /*自动隐藏文字*/
  text-overflow: ellipsis; /*文字隐藏后添加省略号*/
  white-space: nowrap; /*强制不换行*/
}
.left img {
  width: 20%;
  margin-right: 0.05rem;
}
.left span {
  font-weight: 1000;
}
.left {
  overflow-x: hidden;
  overflow-y: scroll;
}
.right {
  flex: 1;
  overflow-x: hidden;
  overflow-y: scroll;
}

.shopping {
  flex: 1;
  display: flex;
}
</style>
