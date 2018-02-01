<template>
  <div>
      <backHeader message="注册账户" backUrl="/login"></backHeader>

      <el-form  label-width="60px" >
        <el-form-item label="手机号">
            <el-input v-model="phone"></el-input>
        </el-form-item>
        <el-form-item label="验证码" class="sendMessage">
            <el-input v-model="code"></el-input>
            <el-button type="info" v-on:click="sendMsg()" :disabled='isClick'>{{time}}</el-button>
        </el-form-item>
        
        <el-form-item label="密码">
            <el-input v-model="pwd" type="password"></el-input>
        </el-form-item>

        <el-button type="primary" v-on:click="register()">立即注册</el-button>
      </el-form>
  </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    export default{
        created:function(){

        },
        data(){
            return{
                time:'发送验证码',
                isClick:false,
                count:60,
                phone:'',
                code:'',
                pwd:''
            }
        },
        methods:{
            sendMsg(){
                var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
                if(this.phone==""){
                    this.$message.error('请输入手机号')
                    return;
                }else if(!reg.test(this.phone)){
                    this.$message.error('手机号格式错误')
                    return;
                }

                axios.post(api+'/login/sendMessage',qs.stringify({
                    account:this.phone,
                    type:1
                }))
                .then((res)=>{
                    console.log(res.data)
                    if(res.data.status=="1"){
                        this.$message.success("验证码发送成功")
                        let me = this;
                        let interval = window.setInterval(function() {    
                            if (me.count == 0) {
                                me.count = 60;
                                me.isClick = false;
                                me.time='发送验证码'
                                window.clearInterval(interval);
                            }else{
                                me.isClick=true
                                me.count--
                                me.time="重新发送(" + me.count + ")"; 
                                console.log(me.count)
                            }
                        }, 1000);  
                    }else{
                        this.$message.error(res.data.statusMsg)
                    }
                })
                .catch((error)=>{
                    this.$message.error("未知错误，请重试")
                })      
            },
            register(){
                axios.post(api+'/login/register',qs.stringify({
                    account:this.phone,
                    code:this.code,
                    pwd:this.pwd,
                }))
                .then((res)=>{
                    if(res.data.status=="1"){
                        this.$message.success("注册成功，请登入")
                        this.$router.push({name:'login'})
                    }else{
                        this.$message.error(res.data.statusMsg)
                        return
                    }
                })
                .catch((error)=>{
                    this.$message.error("未知错误，请重试")
                })
            }
        }
    }
</script>

<style>
    .sendMessage .el-form-item__content .el-input{
        width: 45%;
        float: left;
    }
    .sendMessage .el-button{
        float: right;
    }
</style>

