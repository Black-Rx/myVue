<template>
  <div>
      <backHeader message="修改名称" backUrl="/login"></backHeader>
      <el-input v-model="name"></el-input>

      <el-button type="primary" v-on:click="newName()" class="edBtn">修改</el-button>
  </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    export default{
        created:function(){
            this.name=this.$route.query.name
        },
        data(){
            return{
                name:""
            }
        },
        methods:{
            newName(){
                axios.post(api+"/user/updateInfo",qs.stringify({
                    user_name:this.name
                }))
                .then((res)=>{
                    if(res.data.status=="1"){
                        this.$message.success("修改成功");
                        this.$router.push({name:'login'})
                    }
                })
                .catch((error)=>{
                    this.$message.error("未知错误，请重试");
                    return
                })
            }
        }
    }
</script>

<style>
    .edBtn{
        margin-top: 40px;
    }
</style>

