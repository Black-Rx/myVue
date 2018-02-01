<template>
  <div>
      <noBackHeader message="个人中心"></noBackHeader>

      <el-form ref="form"  label-width="40px" v-if="isLogin" class="loginForm">
        <el-form-item label="账号">
            <el-input v-model="account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="pwd" type="password"></el-input>
        </el-form-item>
        <el-button type="primary" v-on:click="newId()">注 册</el-button>
        <el-button type="primary" v-on:click="login()">登 入</el-button>
      </el-form>


       <div v-if="loginDone">
            <div class="userMsg" :data-uid="item.user_id" v-on:click="toUser()">
                <span><img :src="item.thumb" alt=""></span>
                <span>
                    <p>{{item.user_name}}</p>
                    <p>{{item.create_time}}</p>
                </span>
                <i class="el-icon-arrow-right toRight"></i>
            </div>
       </div> 
        


      <allFooter manage="工程管理" backUrl="/" login="个人中心" addUrl="/login"></allFooter> 
  </div>
</template>

<script>
    import axios from "axios"
    import qs from "qs"
    export default{
        created:function() {
            if(sessionStorage.onlykey!=undefined){
                this.isLogin=false
                this.user()
            }
        },
        data(){
            return{
                account:'',
                pwd:'',
                isLogin:true,
                loginDone:false,
                item:[]
            }
        },
        methods:{
            login(){
                axios.post(api+'/login', qs.stringify({
                    account:this.account,
                    pwd:this.pwd,      
                }))
                .then((res)=>{
                    if(res.data.status=="1"){
                        this.$message.success("登入成功"); 
                        this.isLogin=false     
                        sessionStorage.onlykey = res.data.onlykey
                        this.user()
                    }else{
                        this.$message.error(res.data.statusMsg);
                        return
                    }
                })
                .catch((error)=>{
                    this.$message.error("未知错误，请重试");
                })
            },

            user(){
                axios({
                    headers: {
                        Accept: "application/json, text/plain, */*; charset=utf-8",
                        onlykey:sessionStorage.onlykey
                    },
                    method:'get',
                    url:api+'/user'
                })
                .then((res)=>{
                    if(res.data.status=="1"){
                        this.loginDone=true
                        this.item=res.data.data
                        if(this.item.thumb=="http://img.cxyuns.com/"){
                            this.item.thumb='./src/img/noHead.png'
                        }
                    }
                })
                .catch((error)=>{
                     this.$message.error("未知错误，请重试");
                })
            },

            toUser(){
                this.item=JSON.stringify(this.item)
                
                this.$router.push({name:'user',query:{msg:this.item}})
            },

            newId(){
                this.$router.push({name:"register"})
            }
        }
    }
</script>

<style>
.loginForm {
  padding: 20px 40px;
  margin-top: 30px;
}
.userMsg{
    padding: 20px;
    display: inline-block;
    width: 100%;
    background: #377cfe;
    position: relative;
}
.userMsg span{
    float: left;
}
.userMsg img{
    width: 64px;
    height: 64px;
}
.userMsg span p{
    margin: 0;
    text-align: left;
    line-height: 30px;
    padding-left: 15px;
    color: #fff;
}
.toRight{
    position: absolute;
    right: 20px;
    top: 38px;
    font-size: 32px;
    color:#fff;
}
</style>
