<template>
  <div>
      <backHeader message="修改密码" backUrl="/login"></backHeader>

      <el-form label-width="80px" >
        <el-form-item label="旧密码">
            <el-input type="password" v-model="oldPwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
            <el-input type="password" v-model="newPwd1"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
            <el-input type="password" v-model="newPwd2"></el-input>
        </el-form-item>
         <el-button type="primary" v-on:click="editPwd()">确认修改</el-button>
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
                oldPwd:'',
                newPwd1:'',
                newPwd2:'',
            }
        },
        methods:{
            editPwd(){
                if(this.newPwd1!=this.newPwd2){
                    this.$message.error("2次密码输入不同，请重新输入");
                    return
                }else{
                    axios.post(api+'/login/editPwd',qs.stringify({
                        old_pwd:this.oldPwd,
                        new_pwd:this.newPwd1
                    }),{
                        headers:{
                            Accept: "application/json, text/plain, */*; charset=utf-8",
                            onlykey:sessionStorage.onlykey
                        }
                    })
                    .then((res)=>{
                        if(res.data.status=="1"){
                            this.$message.success("修改秘密成功")
                            this.$router.push({name:'login'})
                        }else{
                            this.$message.error(res.data.statusMsg)
                        }
                    })
                    .catch((error)=>{
                        this.$message.error("未知错误，请重试")
                    })
                }
            }
        }
    }
</script>
