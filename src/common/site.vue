<template>
  <div id="site">
        <noBackHeader message="工程管理" ></noBackHeader>
        <span @click="fun"><router-link to="news"><img src="../img/xiangmu.png" alt=""><br> 项目</router-link></span>
        <span @click="fun"><router-link to="tiyu"><img src="../img/kuaijian.png" alt=""><br>人员</router-link></span>
        <span @click="fun"><router-link to="auto"><img src="../img/kuangjia.png" alt=""><br>部门</router-link></span>
        <span @click="fun"><router-link to="junshi"><img src="../img/gonggao.png" alt=""><br>日志</router-link></span>
        <allFooter manage="工程管理" backUrl="/" login="个人中心" addUrl="/login"></allFooter>
  </div>
  
</template>

<script>
  export default{
    created () {
      
    },
    methods:{
      fun(){
       if(sessionStorage.onlykey==undefined){
         this.$message.error("请先登入")
         this.$router.push({name:'login'})
       }
      }
    }
  }
</script>

<style>
  #site>span{
    display: inline-block;
    width: 50%;
    float: left;
    margin: 20px 0;
  }
  a{
    text-decoration: none;
    color: #000;
  }
</style>
