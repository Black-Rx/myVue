<template>
  <div id="news">
      <addHeader message="项目列表" backUrl="/" addUrl="/addProject"></addHeader>
      <p v-if='noItem'>暂无数据，请添加</p>
      <div v-for="items in item" class="project" :data-id="items.id" v-on:click="toDetail(items.id)">
        <span class="pull-left projectImg">
          <img :src="items.project_avatar" alt="">
        </span>
        <span class="pull-left projectTxt">
          <p>{{items.name}}</p>
          <p>项目负责人：{{items.person_charge}}</p>
          <p>开工日期：{{items.begin_date}}</p>
          <p>竣工日期：{{items.end_date}}</p>
        </span>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
 export default{
   created:function () {
     this.star();
   },
   data(){
     return{
       item:[],
       noItem:false,
     }
   },
   methods:{
     star(){
       axios({
         headers: {
          Accept: "application/json, text/plain, */*; charset=utf-8",
          onlykey:sessionStorage.onlykey
         },
         method:"get",
         url:api+'/projectInformation',
       })
       .then((res)=>{
         this.item=res.data.data
         if(this.item==""){
           this.noItem=true
         }
       })
       .catch((error)=>{
         alert("数据获取失败,请重试")
       })
     },
     toDetail(id){
       this.$router.push({name:'watchProject',query:{id:id}})
     }
   }
 }
</script>

<style>
  .project{
    max-width: 450px;
    display: inline-block;
    width: 100%;
  }
  .project p:nth-child(1){
    font-size: 16px;
    color: #000;
    margin-bottom: 10px;
  }
  .project p{
    color: #686868;
    font-size: 14px;
    text-align: left;
    margin-bottom: 5px;
  }
  .projectImg{
    height: 81px;
  }
  .project img{
    width: 64px;
    height: 64px;
    border-radius: 10px;
  }
  .projectTxt{
    padding: 15px;
  }
  .projectImg{
    padding: 15px;
  }
  #news p{
    margin: 0; 
  }
  .pull-left{
    float: left;
  }
  .pull-right{
    float: right;
  }
</style>
