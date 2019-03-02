<template>
    <div>
        <ul>
            <li v-for="(isint ,index) in inmit" :key="index">
                
       
        <router-view v-if="$route.name =='indentode'"></router-view>
        <div v-if="$route.name=='indent'" class="indent">
            <div class="header">
                <div class="boult">
                    <span class="el-icon-arrow-left " @click="go()"></span>
                </div>
                <span>订单列表</span>
            </div>
            <!-- 中間部分 -->
            <ul class="cont">
                <div class="cont-img">
                    <img :src=" '//elm.cangdu.org/img/'+ isint.restaurant_image_url" alt="">
                   
                </div>
                <router-link :to="{name:'indentode'}">
                    <div class="cont-sp" @click="ko()">
                        <span>{{isint.restaurant_name}}</span>
                        <p>{{isint.formatted_created_at}}</p>
                    </div>
                    <p class="cont-p">等待支付</p>
                    <div class="sold1"></div>
                    <div class="cont-bot">
                        <p>ds</p>
                        <p>￥{{isint.total_amount}}</p>
                    </div>
                </router-link>
                <div class="sold2"></div>
    
                <span class="cont-span" @click="one()">去支付(還剩00分00秒)</span>
            </ul>
    
        </div>
        <!-- 弹框1 -->
        <transition enter-active-class="animated bounceIn ">
            <div class="pop-name" v-if="contSpan">
                <img src="./img/感叹号.png" class="pop-hint">
                <p class="pop-con">暂不开放支付接口</p>
                <div class="pop-foot" @click="pop1()">确认</div>
            </div>
        </transition>
             </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                contSpan: false,
                inmit:""
            }
        },
        methods: {
            ko() {
                this.$router.push({
                    name: 'indentode'
                })
            },
            one() {
                this.contSpan = true
            },
            pop1() {
                this.contSpan = false
            },
            go(){
                this.$router.go(-1)
            }
        },
        created() {
            this.$http({
                methods:"get",
                url:"https://elm.cangdu.org/bos/orders?offset=0&limit=20"
            }).then((res)=>{
                this.inmit = res.data
                console.log(this.inmit);
                
            })
        },
    }
</script>

<style scoped>
    .header {
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10;
        height: 0.4rem;
        background-color: #3190e8;
    }
    
    .header span {
        text-align: center;
        position: absolute;
        left: 50%;
        top: 25%;
        margin-left: -25%;
        width: 50%;
        font-size: 0.15rem;
        color: white;
    }
    
    .boult {
        position: absolute;
        top: 0.1rem;
        left: 0.2rem;
    }
    
    .sold1 {
        border-bottom: 0.01rem solid #aaa;
        width: 85%;
        padding-top: 0.7rem;
        margin-left: 0.55rem;
    }
    
    .sold2 {
        border-bottom: 0.01rem solid #aaa;
        width: 85%;
        padding-top: 0.2rem;
        margin-left: 0.55rem;
    }
    
    .cont {
        margin-top: 0.5rem;
        background-color: white;
        height: 1.6rem;
        ;
    }
    
    .cont-img {
        margin-top: 0.1rem;
        float: left;
        padding-left: 0.1rem;
    }
    
    .cont img {
        width: 0.5rem;
    }
    
    .cont-sp {
        float: left;
        margin-top: 0.2rem;
    }
    
    .cont-sp span {
        font-size: 0.2rem;
        color: black;
    }
    
    .cont-sp p {
        font-size: 0.1rem;
        color: #aaa;
        /* margin-top: 0.05rem; */
    }
    
    .cont-p {
        float: right;
        padding: 0.2rem;
        color: black;
    }
    
    .cont-bot p:nth-child(1) {
        margin-left: 0.6rem;
        color: black;
    }
    
    .cont-bot p:nth-child(2) {
        margin-right: 0.2rem;
        color: orange;
    }
    
    .cont-bot {
        padding-top: 0.1rem;
        display: flex;
        justify-content: space-between;
    }
    
    .cont-span {
        float: right;
        margin-top: 0.15rem;
        margin-right: 0.1rem;
        border: 0.01rem solid orange;
        color: orange;
        height: 0.2rem;
        line-height: 0.2rem;
    }
    
    .pop-name {
        position: fixed;
        top: 1rem;
        left: 0.6rem;
        width: 70%;
        height: 2rem;
        border-radius: 0.12rem;
        background-color: white;
    }
    
    .pop-hint {
        width: 0.7rem;
        margin: 0.2rem 1rem;
    }
    
    .pop-con {
        text-align: center;
        font-size: 0.15rem;
    }
    
    .pop-foot {
        font-size: 0.15rem;
        color: white;
        width: 100%;
        height: 0.4rem;
        text-align: center;
        line-height: 0.4rem;
        margin: 0.35rem auto;
        background-color: #4cd964;
    }
</style>
