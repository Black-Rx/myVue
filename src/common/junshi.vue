<template>
  <div id="junshi">
      <addHeader message="施工日志" backUrl="/" addUrl="/addDiary"></addHeader>
      
      <p v-if="noItem">暂无数据，请添加</p>

      <div v-for="items in item" class="diaryList" :data-id=items.id  @click="diaryDetail(items.id)">
        <p class="diaryDate"><img src="../img/li.png" alt="">{{items.date}}</p>
        <span class="line"></span>
        <div class="diaryDetail">
            <p class="pjName">{{items.project_name}}</p>
            <p class="pjDate"><span>{{items.name}}</span>{{items.date}}</p>
            <el-progress type="circle" :percentage="25" :width="54" class="Sche_val"></el-progress>
        </div>
      </div>
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
        noItem:false,
      }
    },
    methods:{
      star(){
        axios({
          headers:{
            Accept: "application/json, text/plain, */*; charset=utf-8",
            onlykey:sessionStorage.onlykey
          },
          url:api+'/ConstructionLog/getLogList',
          method:'get',
        })
        .then((res)=>{
          this.item=res.data.data
          if(this.item==""){
            this.noItem=true
          }
          console.log(this.item)
        })
        .catch((error)=>{
          this.$message.error("未知错误，请重试")
        })
      },
      diaryDetail(id){
        this.$router.push({name:'watchDiary',query:{Id:id}}) 
      }
    }
  }
</script>

<style>
.diaryList{
  padding: 20px;
  position: relative;
  display: inline-block;
  width: 100%;
}
.diaryList .diaryDate{
  line-height: 24px;
  text-align: left;
  margin-top: 0;
  margin-bottom: 10px;
}
.diaryList .diaryDate img{
  float: left;
  margin-right: 10px;
}
.diaryList .diaryDetail{
  width: calc(100% - 34px);
  float: right;
  border: 1px solid #dadada;
  border-radius: 3px;
  padding: 20px 15px;
  position: relative;
}
.diaryList .diaryDetail .pjName{
  text-align: left;
  margin-top: 0;
}
.diaryList .diaryDetail .pjDate{
  text-align: left;
  margin: 0;
  font-size: 14px;
}
.diaryList .diaryDetail .pjDate span{
  margin-right: 15px;
}
.diaryList .diaryDetail .Sche_val{
  position: absolute;
  right: 20px;
  top: 20px;
}
.diaryList .line{
  display: inline-block;
  height: 99px;
  width: 1px;
  background-color: #dadada;
  position: absolute;
  left: 32px;
}
</style>
