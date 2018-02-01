<template>
  <div>
      <backHeader message="个人中心" backUrl="/login"></backHeader>
      
      <div class="thrChoose">
          <router-link to="/edPic"><span>头像<img :src=item.thumb alt=""><i class="el-icon-arrow-right"></i></span></router-link>
          <span v-on:click="toEdName()">昵称 <p>{{item.user_name}}</p> <i class="el-icon-arrow-right"></i></span>
          <router-link to="/edPwd"><span>修改密码<i class="el-icon-arrow-right"></i></span></router-link>
          <span v-on:click="out()">退出</span>
      </div>
  </div>
</template>

<script>
    import axios from "axios"
    export default{
        created:function () {
            this.star()
        },
        data(){
            return{
                item:[]
            }
        },
        methods:{
            star(){
                this.item=this.$route.query.msg
                this.item=JSON.parse(this.item)
            },
            out(){
                sessionStorage.clear()
                this.$router.push({name:"login"})
            },
            toEdName(){
                this.$router.push({name:"edName",query:{name:this.item.user_name}})
            }
        }
    }
</script>


<style>
    .thrChoose{
        display: inline-block;
        width: 100%;
        font-family: 微软雅黑;
    }

    .thrChoose span{
        display: inline-block;
        width: 100%;
        line-height: 60px;
        color: #000;
        border-bottom: 1px solid #dadada;
        text-align: left;
        padding-left: 20px;
        position: relative;
    }
    .thrChoose span a{
        text-decoration: none;
        color:#000;
    }
    
    .thrChoose span img{
        float: right;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin: 6px 55px 0 0;
    }
    .thrChoose span i{
        position: absolute;
        right:15px;
        top: 22px;
        font-weight: bold;
        color: #888;
    }
    .thrChoose span p{
        display: inline-block;
        float: right;
        margin: 0 55px;
    }
</style>

