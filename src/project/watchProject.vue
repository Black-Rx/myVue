<template>



  <div>
    <backHeader message="项目看板" backUrl="/news"></backHeader>
    
    <div v-for="items in item" class="watchPro">
        <div class="proTop">
            <span><img :src="items.project_avatar" alt=""></span>
            <span>{{items.name}}</span>
        </div>
        <div class="proCenter">
            <span>项目负责人<br>{{items.person_charge}}</span>
            <span>开工日期  <br>{{items.begin_date}}</span>
            <span>竣工日期  <br>{{items.end_date}}</span>
        </div>
    </div>
    
    <el-button type="primary" v-on:click="edit()">修改项目</el-button>
    <el-button type="primary" v-on:click="open()">删除项目</el-button>
  </div>
 
</template>

<script>
    import axios from 'axios'
    export default{
        created:function(){
            this.star()
        },
        data(){
            return{
                item:[],
                id:this.$route.query.id,
                view:true,
            }
        },
        methods: {
            star(){
                axios({
                    headers: {
                        Accept: "application/json, text/plain, */*; charset=utf-8",
                        onlykey:'1_4fdsafd15s6afd'
                    },
                    url:api+'/projectInformation/getProjectKanban',
                    method:'post',
                    params: {
                        project_id: this.id
                    }
                })
                .then((res)=>{
                    this.item=res.data.data
                    console.log(this.item)
                })
                .catch((error)=>{
                    this.$message.error("未知错误，请重试");
                })
            },
            del(){
                axios({
                    headers: {
                        Accept: "application/json, text/plain, */*; charset=utf-8",
                        onlykey:'1_4fdsafd15s6afd'
                    },
                    url:api+'/projectInformation/delpro',
                    method:'post',
                    params: {
                        id: this.id
                    }
                })
                .then((res)=>{
                    if(res.data.status=="1"){
                        this.$router.push({name:'news'})
                    }else{
                        this.$message.error(res.data.statusMsg);
                        return
                    }
                })
                .catch((error)=>{
                    this.$message.error("未知错误，请重试");
                    return
                })
            },
            open() {
                this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    this.del()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            edit(){
                this.$router.push({name:"editProject",query:{id:this.id}})
            }
        }
    }
   
</script>

<style>
.el-message-box{
    width: 95%;
    
}

.proTop img{
    width: 64px;
    height: 64px;
    border-radius: 10px;
}
.proTop{
    padding: 20px;
    background: #377cfe;
    display: inline-block;
    width: 100%;
    float: left;
}
.proTop span{
    display: inline-block;
    float: left;
    color: #fff;
    font-size: 18px;
    line-height: 64px;
    margin-right: 20px;
}
.proCenter{
     display: inline-block;
     width: 100%;
     margin-bottom: 30px;
}
.proCenter span{
    display: inline-block;
    width: 33.3333333333333333%;
    float: left;
    background: #5d94fc;
    color: #fff;
    padding: 8px 0;
    border-right: 1px solid #fff;
    line-height: 26px;
}
.proCenter span:last-child{
    border-right: none;
}
</style>

