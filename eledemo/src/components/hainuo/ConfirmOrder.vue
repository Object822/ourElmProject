<template>
    <div>
        <router-view v-if="$route.name=='chooseAddress'" :key="key"></router-view>
        <router-view v-if="$route.name=='remark'"></router-view>
        <router-view v-if="$route.name=='invoice'"></router-view>
        <router-view v-if="$route.name=='register'"></router-view>
        <router-view v-if="$route.name=='search'"></router-view>
    
        <div v-if="$route.name=='confirmOrder'">
            <div class="header">
                <div class="head-top">
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple head-img1" @click="go()">
                                <img src="./img/箭头.png">
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple head-span">
                                <span>确认订单</span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple head-img2">
                                <img src="./img/我的 (1).png">
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <!-- 添加收货地址 -->
                <router-link :to="{name:'chooseAddress'}">
                    <div class="address">
                        <div v-if="!isimg">
                            <img src="./img/定位.png" class="address-img1">
                        </div>
                        <span v-if="!isOnline&&!addData" class="addspan">请添加一个收货地址</span>
                        <div class="title" v-else>
                            <div v-if="content">
                                <div class="title-top">
                                    <span style="color:#333; font-size: 0.18rem;">{{content&&content[index].name}}</span>
                                    <span style="color:#333;">{{setSex(content[index])}}</span>
                                    <span style="color:#333;">{{content&&content[index].phone}}</span>
                                </div>
                                <div class="title-bot">
                                    <span :style="{backgroundColor:setbagcolor(content[index])}" style=" border-radius:0.03rem;  color: white">{{content&&content[index].tag}}</span>
                                    <span style="color:#777;">{{content&&content[index].address}}</span>
                                </div>
                            </div>
                            <div v-else>
                                <div class="title-top">
                                    <span style="color:#333; font-size: 0.18rem;">{{addData&&addData[0].name}}</span>
                                    <span style="color:#333;">{{setSex(addData[0])}}</span>
                                    <span style="color:#333;">{{addData&&addData[0].phone}}</span>
                                </div>
    
                                <div class="title-bot">
                                    <span :style="{backgroundColor:setbagcolor(addData[0])}" style=" border-radius:0.03rem;  color: white">{{addData&&addData[0].tag}}</span>
                                    <span style="color:#777;">{{addData&&addData[0].address}}</span>
                                </div>
                            </div>
                        </div>
    
                        <div class="el-icon-arrow-right address-img2" v-if="!isli"></div>
                    </div>
                </router-link>
    
                <!-- 送达时间 -->
                <div class="time">
                    <el-row :gutter="20">
                        <el-col :span="6" :offset="2">
                            <div class="grid-content bg-purple time-left">
                                <p>送达时间</p>
                            </div>
                        </el-col>
                        <el-col :span="6" :offset="6">
                            <div class="grid-content bg-purple time-right">
                                <p>尽快送达&nbsp;|&nbsp;预计07:00</p>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="time-right-p">
                        <p>蜂鸟专送</p>
                    </div>
                </div>
                <!-- 支付方式 -->
                <div class="pay">
                    <el-row :gutter="20">
                        <el-col :span="6" :offset="1">
                            <div class="grid-content bg-purple">
                                <div class="pay-left">
                                    <span>支付方式</span>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="6" :offset="7">
                            <div class="grid-content bg-purple">
                                <div class="pay-right" @click="show()">
                                    <span>在线支付</span>
                                    <li class="el-icon-arrow-right"></li>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="sold"></div>
                    <div class="pay-bott">
                        <span class="pay-left-1">红包</span>
                        <span class="pay-right-2">暂时只在饿了么App中支持</span>
                    </div>
    
                    <!-- 蒙版 -->
                    <div :class="maskingclass" @click="maskingclick()"></div>
                    <!--支付动画 -->
                    <div v-if="show3" class="anmbig">
                        <div>
                            <el-collapse-transition>
                                <div>
                                    <div class="transition-box">
                                        <div class="animation">
                                            <header>支付方式</header>
                                            <li class="animation-li-1">
                                                货到付款(商家不支持货到付款)
                                                <span class="el-icon-circle-check"></span>
                                            </li>
                                            <li class="animation-li-2" @click="anmbigclick()">
                                                在线支付
                                                <span class="el-icon-circle-check check1"></span>
                                            </li>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-transition>
                        </div>
                    </div>
                </div>
    
                <!-- 效果展示 -->
                <div class="result">
                    <div class="result-1-0">
                        <img src="./img/u=1366704153,4289492387&fm=26&gp=0.jpg">
                        <span>效果展示</span>
                    </div>
                    <div class="sold1"></div>
                    <div class="result-1">
                        <span>哈士奇蛋糕</span>
                        <div class="result-1-1">
                            <span>x&nbsp;2</span>
                            <span>￥20</span>
                        </div>
                    </div>
                    <div class="result-2">
                        <span>餐盒</span>
                        <span>￥14114</span>
                    </div>
                    <div class="result-3">
                        <span>配送费</span>
                        <span>￥4</span>
                    </div>
    
                    <div class="sold2"></div>
                    <div class="result-4">
                        <span>订单￥14158</span>
                        <div class="result-5">
                            <span>待支付</span>
                            <p class="lastspan">￥14158</p>
                        </div>
                    </div>
                </div>
    
                <!-- 订单备注 -->
                <div class="remark-bill">
                    <router-link :to="{name:'remark'}">
                        <div class="remark">
                            <span>订单备注</span>
                            <span>
                            {{kou1}}{{kou}}
                            <li class="el-icon-arrow-right"></li>
                          </span>
                        </div>
                    </router-link>
                    <router-link :to="{name:'invoice'}">
                        <div class="sold"></div>
                        <div class="bill">
                            <span>发票抬头</span>
                            <span>不需要开发票
                            <li class="el-icon-arrow-right"></li>
                          </span>
                        </div>
                    </router-link>
                </div>
                <!-- foot -->
                <div class="foot">
                    <p class="foot1">待支付￥14532
                        <router-link :to="{name:'payment'}">
                            <span class="foot2" @click="quer()">确认下单</span>
                        </router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show3: false,
                headerclass: "header",
                maskingclass: "masking1",
                kou: "口味、偏好等",
                kou1: null,
                content: "",
                index: "",
                iscolor: "",
                addData: "",
                // 用户登录状态
                isOnline: true,
                isimg: false,
                isli: false,
                //确认付款请求
                user_id: "",
                cart_id: "",
                address_id: "",
                restaurant_id: "",
                entities: ""
            };
        },
        methods: {
            show() {
                this.show3 = !this.show3;
                this.maskingclass = "masking";
            },
            maskingclick() {
                this.maskingclass = "masking1";
                this.show3 = false;
            },
            anmbigclick() {
                this.maskingclick();
            },
            foot2() {
                alert("请添加一个收货地址");
            },
            go() {
                this.$router.go(-1);
            },
            setbagcolor(value) {
                if (value && value.tag == "家") {
                    return "#ff3a00";
                } else if (value && value.tag == "公司") {
                    return "#00e459";
                } else if (value && value.tag == "学校") {
                    return "#008bf0";
                } else {
                    return "#ff3a00";
                }
            },
            setSex(sexData) {
                if (sexData && sexData.sex == 1) {
                    return "男士";
                } else if (sexData && sexData.sex == 2) {
                    return "女士";
                } else {
                    return "";
                }
            },
            quer() {
                this.$http({
                    methods: "post",
                    url: "https://elm.cangdu.org/v1/users/:user_id/carts/:cart_id/orders",
                    data: {
                        user_id: this.user_id,
                        cart_id: this.cart_id,
                        address_id: this.address_id,
                        restaurant_id: this.restaurant_id,
                        entities: this.entities
                    }.then((res) => {
                        console.log(res);
    
                    })
                })
            }
    
        },
        computed: {
            key() {
                return this.$route.path + Math.floor();
            }
        },
        created() {
            this.$http({
                methods: "get",
                url: "https://elm.cangdu.org/v1/users/22598/addresses"
            }).then(res => {
                console.log(res);
                this.addData = res.data;
            });
            this.content = this.$route.params.con;
            console.log(this.content);
            this.index = this.$route.params.index;
            console.log(this.index);
            if (this.$route.params.value) {
                this.kou = this.$route.params.value;
            }
            if (this.$route.params.data) {
                let data = this.$route.params.data;
                console.log(data);
                let b = [];
                for (let keys in data) {
                    if (keys == "1" || keys == "6") {
                        for (let keys2 in data[keys]) {
                            b.push(data[keys][keys2]);
                        }
                    } else {
                        b.push(data[keys]);
                    }
                }
    
                console.log(b.join(","));
                this.kou1 = b.join(",") + ",";
                console.log(this.kou1);
                if (this.$route.params.value) {
                    this.kou = this.$route.params.value;
                } else {
                    this.kou = null;
                }
    
            }
    
        },
        // beforeRouteUpdate(to, from, next) {
        //     next();
    
        // }
    };
</script>

<style scoped>
    .header {
        background-color: #f5f5f5;
    }
    
    .head-top {
        width: 100%;
        height: 0.45rem;
        font-size: 0.17rem;
        background-color: #3190e8;
        position: fixed;
        z-index: 10;
    }
    
    .head-span {
        line-height: 0.4rem;
        font-size: 0.2rem;
        color: white;
    }
    
    .head-img1 img {
        padding-left: 0.1rem;
        margin-top: 0.1rem;
        width: 0.2rem;
    }
    
    .head-img2 img {
        margin-top: 0.1rem;
        width: 0.25rem;
        padding-left: 0.7rem;
    }
    
    .address {
        background-color: white;
        position: relative;
        border-bottom: 0.02rem dashed rgb(116, 114, 114);
        padding-top: 0.5rem;
        width: 100%;
        display: flex;
        /* height: 0.8rem; */
        align-items: center;
        justify-content: space-around;
        height: 1.5rem;
    }
    
    .address-img1 {
        /* position: absolute;
              left: 0.1rem;
              top: 0.8rem; */
        width: 0.2rem;
    }
    
    .address-img2 {
        /* position: absolute;
              top: 0.8rem;
              right: 0.3rem; */
        width: 0.25rem;
    }
    
    .address span:first-child(1) {
        /* margin-top: 1rem; */
        /* line-height: 0.8rem; */
        /* padding-left: 1rem; */
        font-size: 0.2rem;
        color: black;
    }
    
    .time {
        background-color: white;
        height: 1rem;
        margin-top: 0.2rem;
        border-left: 0.05rem solid #3190e8;
    }
    
    .time-left p {
        position: absolute;
        top: 0.5rem;
        left: 0.3rem;
        font-size: 0.2rem;
    }
    
    .time-right p {
        position: absolute;
        top: 0.2rem;
        left: 1.8rem;
        color: #3190e8;
        font-size: 0.17rem;
    }
    
    .time-right-p {
        width: 0.7rem;
        height: 0.3rem;
        margin: 0.5rem 2.5rem;
        background-color: #3190e8;
        border-radius: 0.05rem;
    }
    
    .time-right-p p {
        color: #fff;
        font-size: 0.15rem;
        line-height: 0.3rem;
        text-align: center;
    }
    
    .pay {
        margin-top: 0.2rem;
        background-color: white;
        height: 1rem;
    }
    
    .pay-bott {
        margin-top: 0.1rem;
    }
    
    .pay-left {
        padding-top: 0.2rem;
        font-size: 0.18rem;
        color: #666;
    }
    
    .pay-right {
        padding-top: 0.2rem;
        font-size: 0.15rem;
        color: #aaa;
    }
    
    .pay-right li {
        position: absolute;
        top: 0.2rem;
        right: 0.6rem;
    }
    
    .sold {
        border-bottom: 0.01rem solid #aaa;
        width: 90%;
        padding-top: 0.09rem;
        margin: 0 auto;
    }
    
    .sold1 {
        border-bottom: 0.01rem solid #aaa;
        width: 100%;
        padding-top: 0.09rem;
        margin: 0 auto;
    }
    
    .sold2 {
        position: relative;
        top: 0.1rem;
        border-bottom: 0.01rem solid #aaa;
        width: 100%;
    }
    
    .pay-left-1 {
        margin-left: 0.2rem;
        font-size: 0.15rem;
        color: #aaa;
    }
    
    .pay-right-2 {
        float: right;
        width: 2rem;
        font-size: 0.15rem;
        color: #aaa;
    }
    
    .animation {
        padding-bottom: 0.5rem;
    }
    
    .animation header {
        background-color: #fafafa;
        text-align: center;
        line-height: 0.4rem;
        color: #666;
        font-size: 0.2rem;
        height: 0.4rem;
    }
    
    .animation-li-1 {
        padding: 0.3rem;
        font-size: 0.2rem;
        color: #ccc;
    }
    
    .el-icon-circle-check {
        position: absolute;
        right: 0;
    }
    
    .animation-li-2 {
        padding: 0.3rem;
        font-size: 0.2rem;
        color: #333;
    }
    
    .check1 {
        color: green;
    }
    
    .anmbig {
        width: 100%;
        position: fixed;
        bottom: 0;
        height: 40%;
        z-index: 3;
        background-color: #fff;
    }
    
    .masking {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
    }
    
    .masking1 {
        display: none;
    }
    
    .result {
        background-color: white;
        margin-top: 0.2rem;
    }
    
    .result img {
        width: 0.4rem;
        height: 0.3rem;
        ;
        margin: 0.1rem;
    }
    
    .result span {
        color: #333;
        font-size: 0.15rem;
        margin-top: 0.15rem;
    }
    
    
    /* .result-1-0 img {
            position: absolute;
            top: 3.8rem;
            width: 0.3rem;
        }
        
        .result-1-0 span {
            position: absolute;
            top: 4rem;
            margin-left: 0.4rem;
            font-size: 0.15rem;
        } */
    
    .result-1-0 {
        height: 0.4rem;
        display: flex;
    }
    
    .result-1 {
        width: 100%;
        color: #333;
        padding-top: 0.4rem;
    }
    
    .result-1 span:nth-child(1) {
        margin-left: 0.3rem;
    }
    
    .result-1-1 span:nth-child(1) {
        color: red;
    }
    
    .result-1-1 {
        float: right;
        margin-right: 0.4rem;
    }
    
    .result-2 {
        color: #333;
        width: 3.1rem;
        margin-left: 0.3rem;
        padding-top: 0.4rem;
        display: flex;
        justify-content: space-between;
    }
    
    .result-2 span:nth-child(2) {
        margin-right: 0.2rem;
    }
    
    .result-3 {
        color: #333;
        width: 3.1rem;
        margin-left: 0.3rem;
        padding-top: 0.4rem;
        display: flex;
        justify-content: space-between;
    }
    
    .result-3 span:nth-child(2) {
        margin-right: 0.5rem;
    }
    
    .result-4 {
        color: #333;
        font-size: 0.2rem;
        padding-top: 0.3rem;
        display: flex;
        justify-content: space-between;
    }
    
    .result-4 span:nth-child(1) {
        margin-left: 0.2rem;
    }
    
    .result-4 span:nth-child(2) {
        padding-right: 0.2rem;
        color: red;
    }
    
    .lastspan {
        color: red;
        font-size: 0.2rem;
        margin-top: 0.3rem;
    }
    
    .result-5 {
        margin-right: 0.4rem;
    }
    
    .remark-bill {
        background-color: #fff;
        height: 1.5rem;
        margin-top: 0.1rem;
    }
    
    .remark {
        padding-top: 0.2rem;
    }
    
    .remark span:nth-child(1) {
        font-size: 0.2rem;
        padding-left: 0.2rem;
        color: #666;
    }
    
    .remark span:nth-child(2) {
        font-size: 0.15rem;
        float: right;
        padding-right: 0.3rem;
        color: #aaa;
    }
    
    .bill {
        padding-top: 0.2rem;
    }
    
    .bill span:nth-child(1) {
        font-size: 0.15rem;
        padding-left: 0.2rem;
        color: #666;
    }
    
    .bill span:nth-child(2) {
        font-size: 0.15rem;
        float: right;
        padding-right: 0.3rem;
        color: #aaa;
    }
    
    .foot {
        width: 100%;
        background-color: #3c3c3c;
        position: fixed;
        bottom: 0;
        height: 0.5rem;
    }
    
    .foot1 {
        margin-left: 0.2rem;
        line-height: 0.5rem;
        color: white;
        font-size: 0.2rem;
    }
    
    .foot2 {
        width: 30%;
        float: right;
        color: white;
        background-color: #56d176;
        line-height: 0.5rem;
        text-align: center;
    }
    
    
    /* 请求下来布局 */
    
    .title-top {
        width: 100%;
        line-height: 0.3rem;
        margin-right: 0.5rem;
    }
</style>



