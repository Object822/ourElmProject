<template>
    <div>
        <div v-if="infoFlag">
             <router-view></router-view>
        </div>
       
        <div v-else> 
             <div class="header">
                    <div class="asideIn">
                            <div v-on:click="previousPage" class="oneclick"></div>
                            <div class="mine">我的</div>
                            <div></div>
                    </div>
            </div>
        <div>
                <div  class="banner">
                    <img src="https://elm.cangdu.org/img/default.jpg">
                    <div v-on:click="login1" class="prompt">
                        <p>{{userName.id}}</p>
                        <p>
                            <span class="el-icon-phone-outline"></span>
                            <span>暂无手机号绑定</span>
                        </p>
                    </div>
                    <router-link to="###">></router-link>
                </div>
        </div>
        
        </div>
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            userName:null,
            infoFlag:false


        }
    },
    methods:{
        previousPage(){
            this.$router.go(-1);
        },
         login1(){
              
            if(this.userName){
                    this.infoFlag=true;
                  this.$router.push({
                    name:'info',
                     params:{
                         userInfo:this.userName
                     }
                })

            }else{
               
            }
        }
    },
   
    created(){
        let userInfo = localStorage.getItem("userInfo");
         this.userName = JSON.parse(userInfo);
             this.$store.state.infoFlag
              
           if(this.$router,this.$route.name=="profile"){
             
                this.infoFlag=false;
           }else{
               this.infoFlag=true;
           }
         
    }
}
</script>

<style scoped>
.oneclick{
    color:white;
}
.prompt{
    display:flex;
   flex-direction:column;
    justify-content:space-around;
}
.prompt>p:nth-child(1){
   font-size:0.2rem;
   font-weight:700;
}
.prompt>p{
   color:white; 
   display:flex;
   align-items:flex-start;
}
.banner>a{
    color:white;
    font-size:0.2rem;
}
.banner>div{
       width:76.710%;
        height:0.58594rem;
}
.banner>img{
    width:16.8919%;
    height:0.58594rem;
    border-radius:0.58594/2rem;
}
.banner>img{
    width:16.8919%;
    height:0.58594rem;
    border-radius:0.58594/2rem;
}
.banner{
    width:92.5%;
    height:0.58594rem;
    padding:0.15625rem 0.14063rem;
    background:blue;
    display:flex;
     align-items:center;
     justify-content:space-between;

}
    .mine{
        color:white;
    }
     .header{
        height:0.545rem;
        background:blue;
    }
    .asideIn>span{
        color:white;
        font-size:0.2rem
    }
    .asideIn a{
         color:white;
        font-size:0.2rem
    }
    .asideIn{
        width:95%;
     height:0.545rem;
     margin:0 auto;
      display:flex;
        align-items:center;
        justify-content:space-between;
    }
</style>