<template>
    <div>
        <div class="header">
            <div class="boult">
                <span class="el-icon-arrow-left" @click="go()"></span>
            </div>
            <span class="sp">订单详情</span>
        </div>
        <!-- 等待支付部分 -->
        <div class="wait">
            <div class="waitimg">
                <img src="./img/u=1366704153,4289492387&fm=26&gp=0.jpg" alt>
            </div>
            <div style="margin-left:0.2rem;">
                <p>等待支付</p>
            </div>
            <div>
                <!-- 这里跳转购物车 -->
                <p class="wait-p">再来一单</p>
    
            </div>
        </div>
        <!-- 我的部分 -->
        <div class="mede">
            <div style="width: 96%; padding-top:0.1rem; margin:0 auto;">
                <div class="mede1">
                    <img src="./img/u=1366704153,4289492387&fm=26&gp=0.jpg" alt>
                    <div class="mede1span">
                        <span>我的牛肉面</span>
                    </div>
                    <span class="el-icon-arrow-right"></span>
                </div>
                <div class="sold"></div>
                <div class="mede2">
                    <p>ds</p>
                    <div class="mede2span">
                        <span>x1</span>
                    </div>
                    <span>￥20</span>
                </div>
                <div class="sold"></div>
    
                <div class="mede3">
                    <span>配送费</span>
                    <span>4</span>
                </div>
            </div>
    
            <div class="mede4">实付23383.00</div>
        </div>
        <!-- 配送信息 -->
        <div class="delivery">
            <header>配送信息</header>
            <div class="sold"></div>
            <div class="delivery1">
                <span>送达时间:</span>
                <span>尽快送达</span>
            </div>
            <div class="delivery2">
                <div class="delivery2-1">
                    <span>送货地址:</span>
                </div>
                <div class="delivery2-1">
                    <p>名字</p>
                    <p>地址</p>
                </div>
    
            </div>
            <div class="way">
                <span>配送方式:</span>
                <span>蜂鸟专送</span>
            </div>
        </div>
        <div class="last">
            <header>订单信息</header>
            <div class="sold"></div>
            <div class="last1">
                <span>订单号:</span>
                <span>8058</span>
            </div>
            <div class="last2">
                <span>支付方式:</span>
                <span>在线支付</span>
            </div>
            <div class="last3">
                <span>下单时间:</span>
                <span>2019-2-25 11:42</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                details:""
            }
        },
        methods: {
            go() {
                this.$router.go(-1)
            }
        },
        created () {
            this.$http({
                methods:"get",
                url:"https://elm.cangdu.org/bos/v1/users/22598/orders/:order_id/snapshot"
            }).then((res)=>{
                this.details = res.data
                console.log(this.details);
                
            });
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
        height: 0.4rem;
        background-color: #3190e8;
    }
    
    .sp {
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
    
    .wait {
        width: 100%;
        margin-top: 0.5rem;
        background-color: white;
        height: 2rem;
    }
    
    .wait img {
        width: 0.8rem;
    }
    
    .waitimg {
        width: 0.5rem;
        margin: 0 auto;
    }
    
    .wait p {
        text-align: center;
        font-size: 0.2rem;
        margin: 0.1rem;
        padding: 0.05rem;
    }
    
    .wait .wait-p {
        width: 0.8rem;
        text-align: center;
        border: 0.01rem solid #3190e8;
        color: #3190e8;
        /* height: 0.2rem; */
        line-height: 0.2rem;
        font-size: 0.1rem;
        margin-left: 1.55rem;
        margin-top: 0.2rem;
    }
    
    .mede {
        margin-top: 0.2rem;
        background-color: white;
        height: 1.7rem;
    }
    
    .mede1 img {
        width: 0.4rem;
        height: 0.4rem;
    }
    
    .mede1 {
        display: flex;
        justify-content: space-between;
    }
    
    .mede1span {
        padding-right: 2rem;
        padding-top: 0.1rem;
        font-size: 0.2rem;
    }
    
    .sold {
        border-bottom: 0.01rem solid #aaa;
        width: 100%;
        padding-top: 0.1rem;
    }
    
    .mede2 {
        display: flex;
        justify-content: space-between;
        font-size: 0.15rem;
        margin-top: 0.1rem;
    }
    
    .mede2span {
        margin-left: 2.5rem;
    }
    
    .mede3 {
        display: flex;
        justify-content: space-between;
        margin-top: 0.1rem;
    }
    
    .mede4 {
        float: right;
        margin: 0.1rem;
        color: orange;
    }
    
    .delivery {
        margin-top: 0.2rem;
        background-color: white;
        height: 2rem;
        padding: 0.1rem;
    }
    
    .delivery header {
        font-size: 0.2rem;
        color: #333;
    }
    
    .delivery1 {
        margin-top: 0.3rem;
        font-size: 0.15rem;
        color: #666;
    }
    
    .delivery2 {
        margin-top: 0.3rem;
        font-size: 0.15rem;
        color: #666;
    }
    
    .delivery2 span {
        margin-top: 0.1rem;
    }
    
    .delivery2-1 {
        float: left;
    }
    
    .delivery2-1 p:nth-child(2) {
        margin-top: 0.1rem;
    }
    
    .way {
        margin-top: 1rem;
        font-size: 0.15rem;
        color: #666;
    }
    
    .last {
        margin-top: 0.3rem;
        background-color: white;
        height: 2rem;
        padding: 0.1rem;
    }
    
    .last header {
        font-size: 0.2rem;
        color: #333;
    }
    
    .last1 {
        padding-top: 0.2rem;
        font-size: 0.15rem;
        color: #666;
    }
    
    .last2 {
        padding-top: 0.2rem;
        font-size: 0.15rem;
        color: #666;
    }
    
    .last3 {
        padding-top: 0.2rem;
        font-size: 0.15rem;
        color: #666;
    }
    .el-icon-arrow-right{
        padding-top: 0.15rem;
    }
</style>
