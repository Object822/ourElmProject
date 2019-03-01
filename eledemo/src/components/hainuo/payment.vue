<template>
    <div class="payment">
        <!-- logo -->
        <div class="header">
            <div class="boult">
                <span class="el-icon-arrow-left" @click="go()"></span>
            </div>
            <span>在线支付</span>
        </div>
        <!-- 计时器 -->
        <div class="time">
            <p>支付剩余时间</p>
            <p>00&nbsp;:&nbsp;{{minute}}&nbsp;:&nbsp;{{second}}</p>
        </div>
        <p class="con">选择支付方式</p>
        <!-- 选择支付 -->
        <div class="select">
            <div class="select-1">
                <img src="./img/支付宝.png">
                <span class="el-icon-circle-check" @click="isCol=!isCol" :class=" isCol ? 'col' : '' "></span>
            </div>
            <div class="sold"></div>
            <div class="select-2">
                <img src="./img/微信支付.png">
                <span class="el-icon-circle-check" @click="isCol=!isCol" :class="isCol? '' : 'col' "></span>
            </div>
        </div>
        <!-- foot -->
        <div class="foot" @click="pop3()">确认支付</div>
    
        <!-- 弹框 -->
        <transition enter-active-class="animated bounceIn ">
            <div class="pop-up" @click="pop" v-if="pop1">
                <img src="./img/感叹号.png" class="pop-hint">
                <p class="pop-con">暂不开放支付功能</p>
                <div class="pop-foot">确认</div>
            </div>
        </transition>
        <!-- 支付超时弹框 -->
        <transition enter-active-class="animated bounceIn ">
            <div class="pop-up" @click="pop2" v-if="timeout">
                <img src="./img/感叹号.png" class="pop-hint">
                <p class="pop-con1">支付超时</p>
                <div class="pop-foot">确认</div>
            </div>
        </transition>
        <!-- 当前环境无法支付 -->
        <transition enter-active-class="animated bounceIn ">
            <div class="pop-up" @click="pop4" v-if="popno">
                <img src="./img/感叹号.png" class="pop-hint">
                <p class="pop-con2">当前环境无法支付,请打开官方App进行付款</p>
                <router-link :to="{name:'indent'}">
                    <div class="pop-foot">确认</div>
                </router-link>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                minutes: 15,
                seconds: 0,
                colorCol: "col",
                isCol: -1,
                pop1: true,
                timeout: false,
                popno: false,
            };
        },
        mounted() {
            this.add();
        },
        methods: {
            num(n) {
                return n < 10 ? "0" + n : "" + n;
            },
            go() {
                this.$router.go(-1);
            },
    
            add() {
                var _this = this;
                var time = window.setInterval(function() {
                    if (_this.seconds === 0 && _this.minutes !== 0) {
                        _this.seconds = 59;
                        _this.minutes -= 1;
                    } else if (_this.minutes === 0 && _this.seconds === 0) {
                        _this.seconds = 0;
                        window.clearInterval(time);
                        _this.timeout = true;
                    } else {
                        _this.seconds -= 1;
                    }
                }, 1000);
            },
            pop() {
                this.pop1 = false;
            },
            pop2() {
                this.timeout = false;
            },
            pop3() {
                this.popno = true;
            },
            pop4() {
                this.popno = false
            }
    
        },
        watch: {
            second: {
                handler(newVal) {
                    this.num(newVal);
                }
            },
            minute: {
                handler(newVal) {
                    this.num(newVal);
                }
            }
        },
        computed: {
            second: function() {
                return this.num(this.seconds);
            },
            minute: function() {
                return this.num(this.minutes);
            }
        }
    };
</script>

<style scoped>
    .payment {
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
    
    .time {
        background-color: white;
        height: 2rem;
    }
    
    .time p:nth-child(1) {
        padding-top: 0.8rem;
        text-align: center;
        font-size: 0.15rem;
        color: #666;
    }
    
    .time p:nth-child(2) {
        padding-top: 0.2rem;
        text-align: center;
        font-size: 0.35rem;
    }
    
    .con {
        margin: 0.1rem;
        font-size: 0.18rem;
        color: #666;
    }
    
    .sold {
        border-bottom: 0.01rem solid #aaa;
        width: 100%;
        padding-top: 0.09rem;
        margin: 0 auto;
    }
    
    .select {
        height: 2rem;
        background-color: white;
    }
    
    .select-1 {
        padding-top: 0.2rem;
        margin: 0.2rem;
    }
    
    .select-1 img {
        width: 0.5rem;
    }
    
    .select-1 span {
        float: right;
        font-size: 0.25rem;
        color: #aaa;
    }
    
    .select-2 {
        margin: 0.2rem;
    }
    
    .select-2 img {
        width: 0.5rem;
    }
    
    .select span {
        float: right;
        font-size: 0.25rem;
        color: #aaa;
    }
    
    .select .col {
        color: #4cd964;
    }
    
    .foot {
        font-size: 0.2rem;
        color: white;
        width: 90%;
        height: 0.5rem;
        text-align: center;
        line-height: 0.5rem;
        margin: 0.15rem auto;
        border-radius: 0.07rem;
        background-color: #4cd964;
    }
    
    .pop-up {
        position: fixed;
        top: 1.3rem;
        left: 0.6rem;
        width: 70%;
        height: 2rem;
        border-radius: 0.12rem;
        /* animation: tipMove 0.4s; */
        background-color: white;
    }
    
    .pop-hint {
        width: 0.7rem;
        margin: 0.2rem 1rem;
    }
    
    .pop-con {
        margin-left: 0.7rem;
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
    
    .pop-con1 {
        margin-left: 1.05rem;
        font-size: 0.15rem;
    }
    
    .pop-con2 {
        text-align: center;
        margin-left: 0.1rem;
        font-size: 0.18rem;
    }
</style>
