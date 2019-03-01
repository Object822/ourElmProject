<template>
  <div style="height:100%" class="body1">
    <div class="show"></div>

    <span class="render">{{render1}}</span>
    <el-container style="height:100%">
      <el-aside width="0.9rem">
        <div>
          <!-- 外层盒子 -->
          <div style="height:5.3rem;background-color:#ccc;">
            <!-- 这里的标签名称要和main.js文件中定义的组件名称保持一致 -->
            <!-- 内层盒子——内容区 -->
            <div class="con">
              <div v-if="fatOption">
                <div
                  :key="index"
                  v-on:click.stop="up1"
                  class="fatOption"
                  v-for="(value,index) in fatOption"
                >
                  <div v-if="index1[index]" class="xiaoll">{{index1[index].quantity}}</div>
                  <!-- <img v-if="value.icon_url" :src="value.icon_url"> -->
                  <span>{{value.name}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-aside>
      <div v-if="display2" class="chu">多規格商品只能在購物車上刪除</div>
      <el-main width="3.1rem" style="padding:0">
        <div style="height:5.3rem;">
          <!-- 这里的标签名称要和main.js文件中定义的组件名称保持一致 -->
          <!-- 内层盒子——内容区 -->
          <div class="con" @mousewheel="imgScroll">
            <div v-if="fatOption">
              <div class="sonOption" :key="index1" v-for="(value,index1) in fatOption">
                <div class="header-menu">
                  <section>
                    <strong>{{value.name}}</strong>
                    <span>{{value.description}}</span>
                  </section>
                </div>
                <section
                  :key="index2"
                  v-for="(value2,index2) in value.foods"
                  class="menu-detail"
                  v-on:click="foodDetail(index1,value2,'https://elm.cangdu.org/img/'+value2.image_path,)"
                >
                  <div class="menuDa">
                    <section class="food-img">
                      <img :src="'https://elm.cangdu.org/img/'+value2.image_path">
                    </section>

                    <section class="food-de">
                      <h3>
                        <strong>{{value2.name}}</strong>
                        <ul>
                          <li class="new1" v-if="value2.attributes[0]">
                            <p>新品</p>
                          </li>
                          <li class="zhao" v-if="value2.attributes[2]">
                            <p>{{value2.attributes[2].icon_name}}</p>
                          </li>
                        </ul>
                      </h3>
                      <p>{{value2.description}}</p>
                      <div>{{value2.tips}}</div>
                      <section v-if="value2.activity">
                        <span
                          :style="'color:#'+value2.activity.image_text_color"
                          class="ll"
                        >{{value2.activity.image_text}}</span>
                      </section>
                    </section>
                  </div>
                  <div class="footer">
                    <section class="foodPrice">
                      <span>¥</span>
                      <span>{{value2.specfoods[0].price}}</span>
                      <span v-if="value2.specifications.length>0">起</span>
                    </section>
                    <section class="fatdecrease2" v-if="value2.specfoods.length>1">
                      <div
                        v-on:click.stop="gui"
                        :name="value2.name"
                        :information="value2.specfoods"
                        class="select2"
                      >选规格
                        <div
                          @click.stop="chuli"
                          v-if="foods[value2.specfoods[0].food_id]&&foods[value2.specfoods[0].food_id].quantity>0"
                          class="decrease2"
                        >-</div>
                        <span
                          v-if="foods[value2.specfoods[0].food_id]&&foods[value2.specfoods[0].food_id].quantity>0"
                          class="span1"
                        >{{foods[value2.specfoods[0].food_id].quantity}}</span>
                      </div>

                      <div class="option">
                        <div class="fatTitle">
                          <span>1</span>
                          <h3 class="title">{{value2.name}}</h3>
                          <div v-on:click.stop="delete1" class="delete1">
                            <i class="el-icon-close"></i>
                          </div>
                        </div>
                        <div class="gg">规格</div>
                        <ul class="fat11">
                          <li
                            v-for="(va,inde) in value2.specfoods"
                            v-on:click.stop="guiItems"
                            :attrs="value2.attrs"
                            :name="va.name"
                            :stock="va.stock"
                            :id="va.food_id"
                            :information="va"
                            :index1="index1"
                            :price="va.price"
                            :sku_id="va.sku_id"
                            :packing_fee="va.packing_fee"
                            :specs_name="va.specs_name"
                            :store1="value.id"
                            :food1="value.item_id"
                            :key="inde"
                          >{{va.specs_name}}</li>
                        </ul>

                        <div class="footer11">
                          <div class="footer111">
                            <div>¥{{guimoney}}</div>
                            <div v-on:click.stop="jiaru">加入购物车</div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section v-else class="selectFood">
                      <div class="buy">
                        <div
                          v-if="foods[value2.specfoods[0].food_id]&&foods[value2.specfoods[0].food_id].quantity>0"
                          v-on:click.stop="de"
                          class="decrease"
                        >-</div>
                        <div
                          v-if="foods[value2.specfoods[0].food_id]&&foods[value2.specfoods[0].food_id].quantity>0"
                          class="number"
                        >{{foods[value2.specfoods[0].food_id].quantity}}</div>
                        <div
                          :attrs="value2.attrs"
                          :name="value2.specfoods[0].name"
                          :stock="value2.specfoods[0].stock"
                          :id="value2.specfoods[0].food_id"
                          :information="value2.specfoods[0]"
                          :price="value2.specfoods[0].price"
                          :sku_id="value2.specfoods[0].sku_id"
                          :packing_fee="value2.specfoods[0].packing_fee"
                          :specs_name="value2.specfoods[0].specs_name"
                          :store1="value.id"
                          :index1="index1"
                          :food1="value.item_id"
                          v-on:click.stop="add"
                          class="add"
                        >+</div>
                      </div>
                    </section>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>

    <section class="shopping">
      <section>
        <div class="cart_icon_container">
          <div v-on:click.stop="display1" :style="'background:'+background" class="tow1">
            <span class="tu">购物</span>
          </div>
          <div class="l">
            <span>¥:{{all.allPrice}}</span>
            <div>{{pei}}</div>
          </div>

          <div v-if="all.jie" class="s">还查¥{{least}}起送</div>
          <div v-else class="jie" @click="to_pay()">去结算</div>
        </div>
      </section>
      <section></section>
    </section>
    <div v-if="Object.keys(foods).length>0" :style="'display:'+disp" class="car">
      <div class="items">
        <div v-if="shop.length>0">
          <div class="itemsLeft">购物车</div>
          <div v-on:click="clear" class="itemsRight">
            <i class="el-icon-delete"></i>
            <span>清空</span>
          </div>
        </div>
      </div>
      <div/>
      <ul>
        <li class="items2" v-for="(va,in1) in foods" :key="in1">
          <div class="kk">
            <div class="licheng">
              <div>{{va.name}}</div>
              <div v-if="va.specs_name">{{va.specs_name}}</div>
            </div>

            <div>
              <span class="money">¥{{va.price}}</span>
              <div class="handle">
                <div @click.stop="de2(va.id,va.index1)">-</div>
                <div>{{va.quantity}}</div>
                <div v-on:click="add2(va.id,va.index1)">+</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="all.number>0" class="sNumber">{{all.number}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      donghua: false,
      fatOption: null,
      number: null,
      money: 0.0,
      pei: null,
      least: null,
      restaurant: null,
      shop: [
        { name: "sss", price: "sss", number: "10" },
        { name: "2", price: "20", number: "20" }
      ],
      foods: {},
      foods2: {},
      render1: 0,
      least2: null,
      all: { number: 0, allPrice: "0.00", jie: true },
      background: "transparent",
      disp: "none",
      guimoney: null,
      display2: false,
      index1: {},
      scrollTop: 0,
      res_id: null
    };
  },
  computed: {
    fatOption2() {
      return {};
    }
  },
  methods: {
    // 结算
    to_pay(){
      this.$router.push({
        name: 'confirmOrder',
        params: {
          foods:this.foods,
          pei: this.pei,
          all: this.all,
          username: "确认订单"
        }
      });
    },
    foodDetail(index1, foods, image, least2) {
      this.$router.push({
        name: "foodDetail",
        params: {
          all: this.all,
          background: this.background,
          pei: this.pei,
          foods: foods,
          image: image,
          least: this.least
        }
      });
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(scrollTop);
    },
    imgScroll(even) {
      let main = document.getElementsByTagName("main")[0];
      // console.log(even);

      let ll = document.getElementsByClassName("sonOption");
      let b;
      for (let a = 0; a < ll.length; a++) {
        // console.log(ll[a].offsetTop);
        // console.log(main.scrollTop, "scrooll");
        if (a > 0) {
          if (
            ll[a - 1].offsetTop < main.scrollTop &&
            main.scrollTop < ll[a].offsetTop
          ) {
            document.getElementsByClassName("fatOption")[a - 1].style =
              "background:white;border-left:0.05rem solid #3190e8";
            b = a - 1;
            document.getElementsByTagName(
              "aside"
            )[0].scrollTop = document.getElementsByClassName("fatOption")[
              b
            ].offsetTop;
            break;
          }
        } else {
          // console.log("main.scrollTop", main.scrollTop);
          // console.log(
          //   "ll[a].offsetTop",
          //   ll[a].offsetTop,
          //   ll[a].offsetTop == main.scrollTop
          // );

          if (ll[a].offsetTop == main.scrollTop) {
            document.getElementsByClassName("fatOption")[0].style =
              "background:white;border-left:0.05rem solid #3190e8";
            // console.log("似懂非懂");
            break;
          }
        }
      }
      let ko = document.getElementsByClassName("fatOption");
      for (let g = 0; g < ko.length; g++) {
        if (g != b) {
          ko[g].style =
            "background:#f5f5f5;border-left:0.03156rem solid #f8f8f8";
        }
      }
    },
    chuli() {
      this.display2 = true;
      setTimeout(() => {
        this.display2 = false;
      }, 1500);
    },
    jiaru(even) {
      let id = this.foods2.store1.id;
      let name = this.foods2.store1.name;
      let stock = this.foods2.store1.stock;
      let packing_fee = this.foods2.store1.packing_fee;
      let sku_id = this.foods2.store1.sku_id;
      let price = this.foods2.store1.price;
      let specs_name = this.foods2.store1.specs_name;
      let index1 = this.foods2.store1.index1;
      if (this.index1[index1]) {
        this.index1[index1].quantity++;
      } else {
        this.$set(this.index1, index1, {
          index1: index1,
          quantity: 1
        });
      }

      if (this.foods[id]) {
        this.foods[id].quantity++;
      } else {
        this.$set(this.foods, id, {
          id: id,
          name: name,
          stock: stock,
          packing_fee: packing_fee,
          sku_id: sku_id,
          price: price,
          specs_name: specs_name,
          quantity: 1,
          index1: index1
        });
      }
      this.ad();
      let option = even.target.parentElement.parentElement.parentElement;
      option.style = "display:none";
      document.getElementsByClassName("show2")[0].style = "display:none";
    },
    guiItems(even) {
      this.guimoney = even.currentTarget.attributes.price.value;
      even.currentTarget.style = "border:1px solid #3190e8;color:#3190e8";
      for (
        let a = 0;
        a < even.currentTarget.parentElement.children.length;
        a++
      ) {
        if (
          even.currentTarget.parentElement.children[a] != even.currentTarget
        ) {
          even.currentTarget.parentElement.children[a].style =
            "border:1px solid gray;color:black";
        }
      }

      let number = event.currentTarget;

      let id = number.attributes.id.value;
      let name = number.attributes.name.value;
      let stock = number.attributes.stock.value;
      let packing_fee = number.attributes.packing_fee.value;
      let sku_id = number.attributes.sku_id.value;
      let price = number.attributes.price.value;
      let specs_name = number.attributes.specs_name.value;
      let index1 = number.attributes.index1.value;
      // console.log(price, "price", specs_name, "specs_name");
      let store1;
      if (this.foods2[store1]) {
        delete this.foods2[store1];
      }

      this.$set(this.foods2, "store1", {
        id: id,
        name: name,
        stock: stock,
        packing_fee: packing_fee,
        sku_id: sku_id,
        price: price,
        specs_name: specs_name,
        index1: index1
      });

      // console.log(this.foods2, "foods2222");
    },
    delete1(even) {
      let option = even.target.parentElement.parentElement.parentElement;
      option.style = "display:none";
      // console.log("option", option);
      // console.log(document.getElementsByClassName("show2")[0]);
      document.getElementsByClassName("show2")[0].style = "display:none";
    },
    gui(event) {
      document.getElementsByClassName("show2")[0].style = "display:block";
      event.currentTarget.nextElementSibling.style = "display:block";
      let jj = event.currentTarget.nextElementSibling;

      document.getElementsByClassName("show2")[0].onclick = function() {
        jj.style = "display:none";
        this.style = "display:none";
      };
      let op = event.currentTarget.nextElementSibling;
      op.children[2].children[0].style =
        "border:1px solid #3190e8;color:#3190e8";
      // console.dir(op.children[2].children[0]);
      this.guimoney = op.children[2].children[0].attributes.price.value;
      let number =
        event.currentTarget.nextElementSibling.children[2].children[0];
      // console.dir(number, "number");
      // console.log(this.foods, "foods");
      // console.dir(number.attributes);

      // console.log("restaurant", this.restaurant);
      let id = number.attributes.id.value;
      let name = number.attributes.name.value;
      let stock = number.attributes.stock.value;
      let packing_fee = number.attributes.packing_fee.value;
      let sku_id = number.attributes.sku_id.value;
      let price = number.attributes.price.value;
      let specs_name = number.attributes.specs_name.value;
      let index1 = number.attributes.index1.value;
      let store1;
      if (this.foods2[store1]) {
        delete this.foods2[store1];
      }

      this.$set(this.foods2, "store1", {
        id: id,
        name: name,
        stock: stock,
        packing_fee: packing_fee,
        sku_id: sku_id,
        price: price,
        specs_name: specs_name,
        index1: index1
      });

      // console.log(this.foods2);
    },
    display1() {
      // console.log("啊");
      if (this.disp == "none") {
        this.disp = "block";
      } else {
        this.disp = "none";
      }
      document.getElementsByClassName("show")[0].display = "block";
      // console.log(this.disp);
    },
    clear() {
      this.foods = {};
      this.index1 = {};
      let quantity2 = 0;
      let allPrice = 0;
      let jie = true;
      // console.log(this.least, "least");
      // console.log(this.foods);
      for (let key1 in this.foods) {
        quantity2 = quantity2 + this.foods[key1].quantity;
        allPrice =
          allPrice +
          parseFloat(this.foods[key1].quantity) *
            parseFloat(this.foods[key1].price)+parseFloat(this.foods[key1].packing_fee);
      }

      if (this.least > allPrice) {
        this.least = this.least - allPrice;
        jie = true;
      } else {
        jie = false;
      }
      this.all.allPrice = allPrice;
      this.all.jie = jie;
      this.all.number = quantity2;
      if (this.all.number > 0) {
        this.background = "#3190e8";
      } else {
        this.background = "transparent";
      }

      this.disp = "none";
    },
    add2(index, index2) {
      // console.log();
      this.foods[index].quantity++;
      // console.log(this.foods[index]);
      this.index1[index2].quantity++;
      this.render1++;

      let quantity2 = 0;
      let allPrice = 0;
      let jie = true;
      // console.log(this.least, "least");
      // console.log(this.foods);
      for (let key1 in this.foods) {
        quantity2 = quantity2 + this.foods[key1].quantity;
        allPrice =
          allPrice +
          parseFloat(this.foods[key1].quantity) *
            parseFloat(this.foods[key1].price)+parseFloat(this.foods[key1].packing_fee);
      }

      if (this.least > allPrice) {
        this.least = this.least - allPrice;
        jie = true;
      } else {
        jie = false;
      }
      this.all.allPrice = allPrice;
      this.all.jie = jie;
      this.all.number = quantity2;
      if (this.all.number > 0) {
        this.background = "#3190e8";
      } else {
        this.background = "transparent";
      }
    },
    de2(index, index2) {
      if (this.foods[index].quantity > 1) {
        this.foods[index].quantity--;
        this.index1[index2].quantity--;
      } else {
        // console.log("搜索");
        delete this.foods[index];
        delete this.index1[index2];
        this.render1++;
      }

      let quantity2 = 0;
      let allPrice = 0;
      let jie = true;

      for (let key1 in this.foods) {
        quantity2 = quantity2 + this.foods[key1].quantity;
        allPrice =
          allPrice +
          parseFloat(this.foods[key1].quantity) *
            parseFloat(this.foods[key1].price)+parseFloat(this.foods[key1].packing_fee);
      }

      if (this.least > allPrice) {
        this.least = this.least - allPrice;
        jie = true;
      } else {
        jie = false;
      }
      this.all.allPrice = allPrice;
      this.all.jie = jie;
      this.all.number = quantity2;
      if (this.all.number > 0) {
        this.background = "#3190e8";
      } else {
        this.background = "transparent";
      }
    },
    de(event) {
      // console.dir(event.target);
      let number = event.target.nextElementSibling.nextElementSibling;
      // console.dir(number);

      let id = number.attributes.id.value;

      let name = number.attributes.name.value;
      let stock = number.attributes.stock.value;

      let packing_fee = number.attributes.packing_fee.value;
      let sku_id = number.attributes.sku_id.value;
      let price = number.attributes.price.value;
      let index1 = number.attributes.index1.value;

      if (this.foods[id].quantity > 1) {
        this.foods[id].quantity--;
      } else {
        delete this.foods[id];
        this.render1++;
        // console.log(this.foods);
      }
      if (this.index1[index1].quantity > 1) {
        this.index1[index1].quantity--;
      } else {
        delete this.index1[index1];
        this.render1++;
      }
      // console.log(this.index1);
      let quantity2 = 0;
      let allPrice = 0;
      let jie = true;

      for (let key1 in this.foods) {
        quantity2 = quantity2 + this.foods[key1].quantity;
        allPrice =
          allPrice +
          parseFloat(this.foods[key1].quantity) *
            parseFloat(this.foods[key1].price)+parseFloat(this.foods[key1].packing_fee);
      }

      if (this.least > allPrice) {
        this.least = this.least - allPrice;
        jie = true;
      } else {
        jie = false;
      }
      this.all.allPrice = allPrice;
      this.all.jie = jie;
      this.all.number = quantity2;
      if (this.all.number > 0) {
        this.background = "#3190e8";
      } else {
        this.background = "transparent";
      }
    },
    add(event) {
      let number = event.currentTarget;
      //   console.log(this.foods, "foods");
      //   console.dir(number.attributes,'attributes');

      //   console.log("restaurant", this.restaurant);
      let id = number.attributes.id.value;
      let name = number.attributes.name.value;
      let stock = number.attributes.stock.value;
      let packing_fee = number.attributes.packing_fee.value;
      let sku_id = number.attributes.sku_id.value;
      let price = number.attributes.price.value;
      let specs_name = number.attributes.specs_name.value;
      let index1 = number.attributes.index1.value;
      //   console.log("你哈");

      this.$http({
        url:
          "https://elm.cangdu.org/shopping/v2/menu?restaurant_id=" +
          this.res_id,
        method: "get"
      }).then(res => {
        if (this.foods[id]) {
          this.foods[id].quantity++;
        } else {
          this.$set(this.foods, id, {
            id: id,
            name: name,
            stock: stock,
            packing_fee: packing_fee,
            sku_id: sku_id,
            price: price,
            quantity: 1,
            index1: index1
          });
        }

        if (this.index1[index1]) {
          this.index1[index1].quantity++;
        } else {
          this.$set(this.index1, index1, {
            quantity: 1,
            index1: index1
          });
        }
        // console.log(typeof price, "price2");
        let quantity2 = 0;
        let allPrice = 0;
        let jie = true;
        // console.log(this.least, "least");
        // console.log(this.foods);
        for (let key1 in this.foods) {
          quantity2 = quantity2 + this.foods[key1].quantity;
          allPrice =
            allPrice +
            parseFloat(this.foods[key1].quantity) *
              parseFloat(this.foods[key1].price)+parseFloat(this.foods[key1].packing_fee);
        }

        if (this.least > allPrice) {
          this.least = this.least - allPrice;
          jie = true;
        } else {
          jie = false;
        }
        this.all.allPrice = allPrice;
        this.all.jie = jie;
        this.all.number = quantity2;
        // console.log(this.all.number, "number");
        if (this.all.number > 0) {
          this.background = "#3190e8";
        } else {
          this.background = "transparent";
        }
        //   let  specs= res.data[store1].foods[food1].specfoods._id
        // console.log(this.index1);
        this.$http({
          url: "https://elm.cangdu.org/v1/carts/checkout",
          method: "post",
          data: {
            restaurant_id: this.restaurant.id,
            geohash: this.restaurant.latitude + "," + this.restaurant.longitude,
            entities: [
              [
                {
                  attrs: [],
                  extra: {},
                  id: id,
                  name: name,
                  packing_fee: packing_fee,
                  price: price,
                  quantity: this.foods.quantity,
                  sku_id: sku_id,
                  specs: "默认",
                  stock: stock
                }
              ]
            ]
          }
        }).then(res => {
          //   console.log("购物车", res);
          console.log(res)
        });
      });
    },
    ad() {
      let quantity2 = 0;
      let allPrice = 0;
      let jie = true;
      // console.log(this.least, "least");
      // console.log(this.foods);
      for (let key1 in this.foods) {
        quantity2 = quantity2 + this.foods[key1].quantity;
        allPrice =
          allPrice +
          parseFloat(this.foods[key1].quantity) *
            parseFloat(this.foods[key1].price)+parseFloat(this.foods[key1].packing_fee);
      }

      if (this.least > allPrice) {
        this.least = this.least - allPrice;
        jie = true;
      } else {
        jie = false;
      }
      this.all.allPrice = allPrice;
      this.all.jie = jie;
      this.all.number = quantity2;
      // console.log(this.all.number, "number");
      if (this.all.number > 0) {
        this.background = "#3190e8";
      } else {
        this.background = "transparent";
      }
    },
    up1(event) {
      let b = document.getElementsByClassName("fatOption");
      var k;
      let b1 = document.getElementsByClassName("sonOption");
      // console.log(event.currentTarget, "本身");
      for (let aa = 0; aa < b.length - 1; aa++) {
        if (event.currentTarget == b[aa]) {
          event.currentTarget.style.cssText =
            "background:white; border-left:0.05rem solid #3190e8";
          k = aa;
          // console.log(aa, "aa");
          // console.log(
          //   b1[aa].parentElement.parentElement.parentElement.parentElement,
          //   "父親"
          // );
          // console.log(
          //   b1[aa].parentElement.parentElement.parentElement.parentElement
          //     .scrollTop
          // );
          b1[
            aa
          ].parentElement.parentElement.parentElement.parentElement.scrollTop =
            b1[aa].offsetTop;
          //    b1[k].parentElement.parentElement.scollTop=22222;
        } else {
          b[aa].style.cssText = "background:#f5f5f5;border-left:0;";
        }
      }
    }
  },
  created() {
    console.log("foods", this.foods);
    this.res_id = this.$route.query.id;
    this.$http({
      url:
        "https://elm.cangdu.org/shopping/v2/menu?restaurant_id=" + this.res_id,
      method: "get"
    }).then(res => {
      console.log("aaa", res.data);
      this.fatOption = res.data;
    });
    this.$http({
      url: " https://elm.cangdu.org/shopping/restaurant/" + this.res_id,
      method: "get"
    }).then(res => {
      this.restaurant = res.data;
      console.log("bbb",res.data)
      this.pei = res.data.piecewise_agent_fee.tips;
      this.least = res.data.float_minimum_order_amount;
      this.least2 = res.data.float_minimum_order_amount;
    });
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    // console.log("凱撒啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊");
  }
};
</script>
<style scoped>
.fatOption {
  position: relative;
}
.xiaoll {
  position: absolute;
  z-index: 8000;
  top: 0.03rem;
  left: 0.6rem;
  background: red;
  border-radius: 50%;
  width: 0.2rem;
  height: 0.2rem;
  text-align: center;
  line-height: 0.2rem;
  color: white;
  font-size: 0.13rem;
}
.chu {
  position: absolute;
  top: 2rem;
  left: 0.4rem;
  color: white;
  background: rgba(0, 0, 0, 0.9);
  width: 80%;
  height: 10%;
  text-align: center;
  line-height: 3;
}
.span1 {
  position: absolute;
  color: black;
  left: -0.17rem;
  font-size: 0.15rem;
}
.select2 {
  position: relative;
}
.decrease2 {
  position: absolute;
  top: -0.00001rem;
  left: -0.45rem;
  color: gray;
  text-align: center;
  border: 0.01rem solid gray;
  width: 0.16rem;
  height: 0.16rem;
  font-size: 0.2rem;
  line-height: 0.13rem;
  border-radius: 0.087rem;
}

.licheng > div:nth-child(2) {
  font-size: 0.12rem;
  text-align: center;
}
.licheng > div:nth-child(1) {
  font-weight: 2900;
  font-size: 0.18rem;
}
.licheng {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  overflow: hidden;
}
.footer111 > div:nth-child(2) {
  color: white;
  background: #3190e8;
  width: 50%;
  text-align: center;
  line-height: 0.27rem;
  border-radius: 5% 5%;
  height: 60%;
}
.footer111 > div:nth-child(1) {
  color: orangered;
}
.footer111 {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  margin: auto auto;
  width: 90%;
}
.footer11 {
  background: #f5f5f5;
  width: 100%;
  height: 30%;
}
.fat11 > li {
  border-radius: 5% 5%;
  border: 1px solid gray;
  padding: 0.05rem 0.1rem;
  margin-right: 3%;
}
.fat11 {
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0.1rem auto;
}
.gg {
  width: 90%;
  margin: 0 auto;
}
.fatTitle > span {
  color: transparent;
}
.fatTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0.1rem auto;
}
.delete1 {
  float: right;
  transform: scale(2);
}

.title {
  position: absolute;
  left: 45%;
}
.option {
  height: 1.4rem;
  width: 60%;
  display: none;
  position: absolute;
  top: 16%;
  left: 20%;
  background: white;
  z-index: 7000;
}
.jie {
  width: 1.3rem;
  height: 0.44rem;
  position: relative;
  top: -0.36rem;
  color: white;
  text-align: center;
  line-height: 0.44rem;
  right: -2.3rem;
  background: #4cd964;
}
.render {
  position: absolute;
  visibility: hidden;
  color: red;
}
.money {
  color: orange;
  font-size: 0.15rem;
  font-weight: 1000;
}
.handle > div:nth-child(3) {
  color: #3190e8;
  text-align: center;
  border: 0.01rem solid #3190e8;
  width: 0.16rem;
  height: 0.16rem;
  font-size: 0.2rem;
  line-height: 0.13rem;
  border-radius: 0.087rem;
}
.handle > div:nth-child(2) {
  font-size: 0.15rem;
}
.handle > div:nth-child(1) {
  color: #3190e8;
  text-align: center;
  border: 0.01rem solid #3190e8;
  width: 0.16rem;
  height: 0.16rem;
  font-size: 0.2rem;
  line-height: 0.13rem;
  border-radius: 0.087rem;
}
.handle {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.kk > p {
  font-size: 0.15rem;
}
.kk > div:nth-child(2) {
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.kk {
  width: 95%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.items2 {
  height: 0.5rem;
  z-index: 1000;
  background: white;
  font-size: 0.2rem;
  font-weight: 1000;
}
.s {
  width: 1.3rem;
  height: 0.44rem;

  position: relative;
  top: -0.36rem;
  color: white;
  text-align: center;
  line-height: 0.44rem;
  right: -2.3rem;
}
.l {
  width: 1.4rem;
  height: 100%;
  color: white;

  position: relative;
  top: 0.2rem;
  left: 0.8rem;
}
.happy-scroll-container {
  height: 5.3rem;
}
.itemsRight {
  float: right;
}
.itemsLeft {
  float: left;
}
.items {
  padding: 0.07031rem 0.14063rem;
  height: 0.3rem;
  background: #f5f5f5;
}
.car {
  width: 3.75rem;
  z-index: 100;
  position: fixed;
  left: 0;
  bottom: 0.4rem;
}
.select2 {
  width: 0.45rem;
  height: 0.2rem;
  background: #3190e8;
  color: white;
  float: right;
  border-radius: 0.1rem 0.1rem;
  text-align: center;
  line-height: 0.2rem;
  font-size: 0.1rem;
}
.sNumber {
  width: 0.2rem;
  height: 0.2rem;
  position: fixed;
  top: 6rem;
  left: 0.5rem;
  z-index: 11111;
  color: white;
  font-size: 0.12rem;
  text-align: center;
  line-height: 0.2rem;
  background: red;
  border-radius: 50%;
}
.tu {
  color: white;
}
.tow1 {
  width: 0.45rem;
  height: 0.45rem;
  text-align: center;
  line-height: 0.45rem;
  border-radius: 50%;
  background: transparent;
  position: absolute;
  top: -0.05rem;
  left: -0.01rem;
}
.cart_icon_container {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #3d3d3f;
  border: 0.04218rem solid #444;
  position: absolute;
  bottom: 0.07rem;
  left: 0.2rem;
}
.body1 {
  position: relative;
}
.shopping {
  width: 100%;
  height: 0.46875rem;
  background-color: #3d3d3f;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 200;
  font-size: 0.12rem;
}
.zhao {
  color: orange;
}
.new1 > p {
  text-align: center;
  flex: 1;
  color: white;
  font-weight: 600;
  width: 0.42188rem;
  font-size: 0.12rem;
}
.new1 {
  width: 0.42188rem;
  height: 0.42188rem;
  background: #4cd964;
  display: flex;
  align-items: flex-end;
  text-align: center;
  z-index: 4;
  position: relative;
  top: 65px;
  left: -156px;
  transform: rotate(-45deg) translate(-0.1rem, -1.5rem);
}

.add {
  color: white;
  text-align: center;
  position: relative;
  border: 0.01rem solid #3190e8;
  width: 0.16rem;
  height: 0.16rem;
  background: #3190e8;
  font-size: 0.2rem;
  border-radius: 0.087rem;
  line-height: 0.13rem;
}
.decrease {
  color: #3190e8;
  text-align: center;
  border: 0.01rem solid #3190e8;
  width: 0.16rem;
  height: 0.16rem;
  font-size: 0.2rem;
  line-height: 0.13rem;
  border-radius: 0.087rem;
}
.buy {
  display: flex;
  justify-content: space-between;
}
.selectFood {
  float: right;
}
.foodPrice > span:nth-child(3) {
  font-size: 0.12rem;
}
.foodPrice > span:nth-child(1) {
  color: orange;
  font-size: 0.12rem;
}
.foodPrice > span:nth-child(2) {
  color: orange;
  margin-right: 0.03rem;
}
.selectFood {
  float: right;
}
.foodPrice {
  float: left;
}
.footer {
  padding-left: 0.5625rem;
  margin-top: 0.07031rem;
}
.ll {
  color: rgb(241, 136, 79);
  border: 0.01rem solid rgb(241, 136, 79);
  border-radius: 0.08rem;
  font-size: 0.12rem;
}
.food-de > div {
  font-weight: 700;
  font-size: 0.12rem;
  color: black;
}
.food-de > p {
  font-weight: 700;
  font-size: 0.12rem;
  color: gray;
}
.food-de > h3 > strong {
  height: 0.21rem;
  font-weight: 700;
  font-size: 0.18rem;
  float: left;
}
.food-de > h3 > ul {
  height: 0.21rem;
  float: right;
}
.food-de {
  width: 2.10938rem;
  height: 0.78563rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.food-img > img {
  width: 0.46875rem;
  height: 0.46875rem;
}
.food-img {
  width: 0.46875rem;
  height: 0.78563rem;
}
.menuDa {
  display: flex;
  justify-content: space-between;
  height: 0.78563rem;
}
.menu-detail {
  padding: 0.14063rem 0.09375rem;
  border-bottom: 0.01rem solid #f8f8f8;
  overflow: hidden;
  background: #fff;
}
.header-menu > section > span {
  color: gray;
  font-size: 0.12rem;
}
.header-menu > section > strong {
  color: #666;
  font-weight: 700;
  margin-right: 0.1rem;
  font-size: 0.18rem;
}
.header-menu > section {
  width: 2.55578rem;
  height: 0.31rem;
  display: flex;
  align-items: flex-end;
}
.header-menu {
  width: 2.67188rem;
  /* height: 0.31rem; */
  padding: 0.09375rem 0.09375rem;
  background: #f5f5f5;
}

.fatOption {
  border-left: 0.03156rem solid #f8f8f8;
  background: #f5f5f5;
  border-bottom: 0.00578rem solid #ededed;
  padding: 0.16046rem 0.07031rem 0.16046rem 0.07031rem;
  font-weight: 500;
  line-height: 0.31rem;
  color: #333;
  font-size: 0.15rem;
}
.el-aside {
  background: gray;
}
.el-main {
  margin-bottom: 0.45rem;
}
</style>
