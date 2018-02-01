<template>
  <div>
      <backHeader :message="title" backUrl='/auto'></backHeader>
      <el-input placeholder="请输入子部门名称" v-model="name"></el-input>

      <el-button type="primary" @click="add" v-if="addBtn">添加</el-button>
      <el-button type="primary" @click="newName" v-if="f2Btn">提交</el-button>
  </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    export default{
        created () {
            this.star()
        },
        data(){
            return{
                title:this.$route.query.title,
                pid:this.$route.query.pid,
                company_id:this.$route.query.company_id,
                name:'',
                f2Btn:false,
                addBtn:false,
            }
        },
        methods:{
            star(){
                if(this.title=="添加子部门"){
                    this.addBtn=true
                }else{
                    this.f2Btn=true
                    this.name=this.$route.query.name
                }
            },
            add(){   //添加子部门
                if(this.name==""){
                    this.$message.error("请输入部门名")
                }else{
                    axios.post(api+'/MemberFramework/add',qs.stringify({
                        pid:this.pid,
                        company_id:this.company_id,
                        name:this.name
                    }),{
                        headers:{
                            Accept: "application/json, text/plain, */*; charset=utf-8",
                            onlykey:sessionStorage.onlykey
                        },
                    })
                    .then((res)=>{
                        if(res.data.status=="1"){
                            this.$message.success(res.data.statusMsg)
                            this.$router.push({name:'auto'})
                        }else{
                            this.$message.error(res.data.statusMsg)
                        }
                    })
                    .catch((error)=>{
                        this.$message.error("未知错误，请重试")
                    })
                }
                
            },
            newName(){  //重命名子部门
                if(this.name==""){
                    this.$message.error("请输入部门名")
                }else{
                    axios.post(api+'/MemberFramework/editName',qs.stringify({
                        id:this.pid,
                        name:this.name,
                    }),{
                        headers:{
                            Accept: "application/json, text/plain, */*; charset=utf-8",
                            onlykey:sessionStorage.onlykey
                        },
                    })
                    .then((res)=>{
                        if(res.data.status=="1"){
                            this.$message.success(res.data.statusMsg)
                            this.$router.push({name:'auto'})
                        }else{
                            this.$message.error(res.data.statusMsg)
                        }
                    })
                    .catch((error)=>{
                        this.$message.error("未知错误，请重试")
                    })
                }    
            },
        }
    }
</script>
<style>
    .el-button{
        margin-top: 30px;
    }
</style>

