<template>
  <div>
      <header class="evaluate-header"><i class="back" v-on:click="cancel()"></i>{{title}}</header>
      <p v-if='noItem'>暂无数据，请添加</p>
      <div v-for="items in item" class="project" :data-id="items.id" v-on:click="chooseOver(items.id,items.name)">
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
        created () {
            this.star()
        },
        data(){
            return{
                item:[],
                backUrl:'',
                noItem:false,
                title:"选择项目"
            }
        },
        methods: {
            star(){
                axios({
                    headers:{
                        Accept: "application/json, text/plain, */*; charset=utf-8",
                        onlykey:sessionStorage.onlykey
                    },
                    method:'get',
                    url:api+'/projectInformation'
                })
                .then((res)=>{
                    // console.log(res.data.data)
                    if(res.data.status=="1"){
                        this.item=res.data.data
                        if(this.item==""){
                            this.noItem=true
                        }
                    }
                    
                })
                .catch((error)=>{
                    this.$message.error('未知错误，请重试')
                })
            },
            chooseOver(id,name){
                this.$parent.cPro=false
                this.$parent.choose=true
                this.$parent.name=name
                this.$parent.id=id
            },
            cancel(){
                this.$parent.cPro=false
                this.$parent.choose=true
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
  p{
    margin: 0; 
  }
  .pull-left{
    float: left;
  }
  .pull-right{
    float: right;
  }
</style>

