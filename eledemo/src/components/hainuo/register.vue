<template>
    <div>
        <router-view  v-if="$route.name=='search'"></router-view>
        <div v-if="$route.name=='register'" class="register">
            <!-- logo -->
            <div class="header">
                <div class="boult">
                    <span class="el-icon-arrow-left" @click="go()"></span>
                </div>
                <span>添加地址</span>
            </div>
            <!-- 中间部分 -->
            <div class="con">
                <!-- 第一行 -->
                <div class="con1">
                    <span>联系人</span>
                    <input type="text" placeholder="你的名字" v-model="userName">
                </div>
                <div class="sold"></div>
                <!-- 第二行 -->
                <div class="con2">
                    <div class="el-icon-success" @click="isCol=!isCol" :class="isCol ? 'col' : '' "></div>
                    <span>先生</span>
                    <div class="el-icon-success" @click="isCol=!isCol" :class="isCol ? '' : 'col' "></div>
                    <span>小姐</span>
                </div>
                <div class="sold1"></div>
                <!-- 第三行 -->
                <div class="con3">
                    <span>联系电话</span>
                    <input type="text" placeholder="你的手机号" v-model="phone">
                    <img src="./img/加号.png" @click="img()">
                </div>
                <div class="sold" v-show="isImg" :class="isImg"></div>
                <input type="text" placeholder="备选电话" class="con3-input" v-show="isImg" :class="isImg">
                <div class="sold1"></div>
                <!-- 第四行 -->
                <div class="con4">
                    <span>送餐地址</span>
                    <router-link :to="{name:'searchcc'}">
                        <input type="text" placeholder="小区/写字楼/学校/等" v-model="shcool">
                    </router-link>
                </div>
                <div class="sold"></div>
                <input type="text" placeholder="详细地址(如门牌号等)" class="con4-input" v-model="detailed">
                <div class="sold1"></div>
                <!-- 第五行 -->
                <div class="con4">
                    <span>标签</span>
                    <input type="text" placeholder="无/家/学校/公司" v-model="label">
                </div>
            </div>
    
            <!-- foot -->
            <div class="foot" @click="hint()">确定</div>
    
            <!-- 弹框 -->
            <!-- 弹框1 -->
            <transition enter-active-class="animated bounceIn ">
                <div class="pop-name" v-if="popName">
                    <img src="./img/感叹号.png" class="pop-hint">
                    <p class="pop-con">请输入姓名</p>
                    <div class="pop-foot" @click="pop1()">确认</div>
                </div>
            </transition>
            <!-- 弹框2 -->
            <transition enter-active-class="animated bounceIn ">
                <div class="pop-phone" v-if="popPhone">
                    <img src="./img/感叹号.png" class="pop-hint">
                    <p class="pop-con">请输入电话号码</p>
                    <div class="pop-foot" @click="pop1()">确认</div>
                </div>
            </transition>
            <!-- 弹框3 -->
            <transition enter-active-class="animated bounceIn ">
                <div class="pop-shcool" v-if="popShcool">
                    <img src="./img/感叹号.png" class="pop-hint">
                    <p class="pop-con">请选择地址</p>
                    <div class="pop-foot" @click="pop1()">确认</div>
                </div>
            </transition>
            <!-- 弹框4 -->
            <transition enter-active-class="animated bounceIn ">
                <div class="pop-detailed" v-if="Detailed">
                    <img src="./img/感叹号.png" class="pop-hint">
                    <p class="pop-con">详细地址信息错误</p>
                    <div class="pop-foot" @click="pop1()">确认</div>
                </div>
            </transition>
            <!-- 弹框5 -->
            <transition enter-active-class="animated bounceIn ">
                <div class="pop-label" v-if="laBel">
                    <img src="./img/感叹号.png" class="pop-hint">
                    <p class="pop-con">标签错误</p>
                    <div class="pop-foot" @click="pop1()">确认</div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isCol: -1,
                isImg: false,
                register: null,
                userName: "",
                phone: "",
                shcool: "",
                detailed: "",
                label: "",
                popName: false,
                popPhone: false,
                popShcool: false,
                Detailed: false,
                laBel: false
            };
        },
        computed: {
            // key() {
            //     return this.$route.path + Math.random();
            // }
        },
        methods: {
            img() {
                this.isImg = true;
            },
            go() {
                this.$router.go(-1);
            },
            hint() {
                if (this.userName == "") {
                    this.popName = true;
                } else if (this.phone == "") {
                    this.popPhone = true;
                } else if (this.shcool == "") {
                    this.popShcool = true;
                } else if (this.detailed == "") {
                    this.Detailed = true;
                } else if (this.label == "") {
                    this.laBel = true;
                }
            },
            pop1() {
                this.popName = false;
                this.popPhone = false;
                this.popShcool = false;
                this.Detailed = false;
                this.laBel = false;
            }
        },
        created() {
            this.shcool = this.$route.params.name;
            // this.$http({
            //     method: "get",
            //     url: "https://elm.cangdu.org/v1/users/:user_id/addresses",
            //     data: {
    
            //     }
            // }).then((res) => {
            //     this.register = res.data.register
            //     console.log(this.register);
    
            // })
        },
    

        beforeRouteUpdate(to, from, next) {
            next()
            this.shcool = this.$route.params.name;
    
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
    
    .con {
        background-color: white;
        /* height: 3.9rem; */
    }
    
    .foot {
        font-size: 0.1rem;
        color: white;
        width: 90%;
        height: 0.4rem;
        text-align: center;
        line-height: 0.5rem;
        margin: 0.1rem auto;
        border-radius: 0.03rem;
        background-color: #4cd964;
        position: absolute;
        bottom: 0.1rem;
        left: 0.2rem;
    }
    
    .sold {
        border-bottom: 0.01rem solid whitesmoke;
        width: 70%;
        padding-top: 0.1rem;
        margin-left: 1.1rem;
    }
    
    .sold1 {
        border-bottom: 0.01rem solid whitesmoke;
        width: 100%;
        padding-top: 0.1rem;
        margin: 0 auto;
    }
    
    .con1 {
        display: flex;
        justify-content: space-between;
        padding-top: 0.8rem;
        margin-left: 0.2rem;
        font-size: 0.15rem;
    }
    
    .con1 input {
        font-size: 0.15rem;
        margin-right: 1rem;
        outline: none;
    }
    
    .con2 {
        margin-top: 0.15rem;
        font-size: 0.15rem;
        margin-left: 1.1rem;
    }
    
    .el-icon-success {
        color: #ccc;
    }
    
    .col {
        color: #4cd964;
    }
    
    .con3 {
        display: flex;
        justify-content: space-between;
        padding-top: 0.15rem;
        margin-left: 0.2rem;
        font-size: 0.15rem;
    }
    
    .con3 span {
        font-size: 0.15rem;
        margin-top: 0.07rem;
    }
    
    .con3 input {
        font-size: 0.15rem;
        margin-right: 0.3rem;
        outline: none;
    }
    
    .con3-input {
        margin-top: 0.15rem;
        font-size: 0.15rem;
        margin-left: 1.1rem;
        outline: none;
    }
    
    .con3 img {
        margin-right: 0.2rem;
        width: 0.2rem;
        height: 0.2rem;
    }
    
    .con4 {
        display: flex;
        justify-content: space-between;
        padding-top: 0.15rem;
        margin-left: 0.2rem;
        font-size: 0.15rem;
    }
    
    .con4 span {
        font-size: 0.15rem;
        margin-top: 0.07rem;
    }
    
    .con4 input {
        font-size: 0.15rem;
        margin-right: 1rem;
        outline: none;
    }
    
    .con4-input {
        margin-top: 0.15rem;
        font-size: 0.15rem;
        margin-left: 1.1rem;
        outline: none;
    }
    
    .con5 {
        display: flex;
        justify-content: space-between;
        padding-top: 0.15rem;
        margin-left: 0.2rem;
        font-size: 0.15rem;
    }
    
    .con5 span {
        font-size: 0.15rem;
        margin-top: 0.07rem;
    }
    
    .con5 input {
        font-size: 0.15rem;
        margin-right: 0.3rem;
        outline: none;
    }
    
    .pop-name {
        position: fixed;
        top: 1.3rem;
        left: 0.6rem;
        width: 70%;
        height: 2rem;
        border-radius: 0.12rem;
        /* animation: tipMove 0.4s; */
        background-color: white;
    }
    
    .pop-phone {
        position: fixed;
        top: 1.3rem;
        left: 0.6rem;
        width: 70%;
        height: 2rem;
        border-radius: 0.12rem;
        /* animation: tipMove 0.4s; */
        background-color: white;
    }
    
    .pop-shcool {
        position: fixed;
        top: 1.3rem;
        left: 0.6rem;
        width: 70%;
        height: 2rem;
        border-radius: 0.12rem;
        /* animation: tipMove 0.4s; */
        background-color: white;
    }
    
    .pop-detailed {
        position: fixed;
        top: 1.3rem;
        left: 0.6rem;
        width: 70%;
        height: 2rem;
        border-radius: 0.12rem;
        /* animation: tipMove 0.4s; */
        background-color: white;
    }
    
    .pop-label {
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
