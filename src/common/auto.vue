<template>
  <div id="auto">
      <backHeader message="部门框架" backUrl="/"></backHeader>
    

      <p v-for="items in item" class="memberFramework" >
        <span>
          <em  @click="darkUp(items.name,items.id,items.company_id)">{{items.name}}</em>
          <span v-for="w2 in items.son_">
            <em  @click="darkUp(w2.name,w2.id,w2.company_id)">{{w2.name}}</em>
            <span v-for="w3 in w2.son_">
              <em @click="darkUp(w3.name,w3.id,w3.company_id)">{{w3.name}}</em>
              <span v-for="w4 in w3.son_">
                <em @click="darkUp(w4.name,w4.id,w4.company_id)">{{w4.name}}</em>
                <span v-for="w5 in w4.son_">
                  <em @click="darkUp(w5.name,w5.id,w5.company_id)">{{w5.name}}</em>
                  <span v-for="w6 in w5.son_">
                    <em @click="six(w6.name,w6.id,w6.company_id)">{{w6.name}}</em>
                  </span>
                </span>
              </span>
            </span>
          </span>
        </span>
      </p>

      <div class="bgDark" v-if="dark"></div>
      <div class="caoz" v-if="caoz">
          <p>{{name}}</p>
          <p @click="add">添加子部门</p>
          <p @click="newName">重命名</p>
          <p @click="del">删除部门</p>
          <p @click="off">取消</p>
      </div>
      <div class="caoz" v-if="cao6">
          <p>{{name}}</p>
          <p @click="newName">重命名</p>
          <p @click="del">删除部门</p>
          <p @click="off">取消</p>
      </div>
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
          item:[],
          dark:false,
          caoz:false,
          cao6:false,
          name:'',
          pid:'',
          company_id:'',
          id:'',
      }
    },
    methods:{
      star(){  //页面渲染
        axios({
          headers:{
            Accept: "application/json, text/plain, */*; charset=utf-8",
            onlykey:sessionStorage.onlykey
          },
          method:'get',
          url:api+'/MemberFramework'
        })
        .then((res)=>{
          this.item=res.data.data
        })
        .catch((error)=>{
          this.$message.error("未知错误，请重试")
        })
      },
      darkUp(name,id,cid){   //点击打开操作按钮
        this.dark=true
        this.caoz=true
        this.name=name
        this.id=id
        this.company_id=cid
      },
      six(name,id,cid){
        this.dark=true
        this.cao6=true
        this.name=name
        this.id=id
        this.company_id=cid
      },
      off(){   //取消按钮
        this.dark=false
        this.caoz=false
        this.cao6=false
      },
      del(){    //删除部门
        axios.post('http://sdtapi.xmwula.com/MemberFramework/delSon',qs.stringify({
          id:this.id
        }),{
          headers:{
            Accept: "application/json, text/plain, */*; charset=utf-8",
            onlykey:sessionStorage.onlykey
          },
        })
        .then((res)=>{
          if(res.data.status=="1"){
            this.$message.success(res.data.statusMsg)
            this.dark=false
            this.caoz=false
            this.star()
          }else{
            this.$message.error(res.data.statusMsg)
          }
        })
        .catch((error)=>{
          this.$message.error("未知错误，请重试")
        })
      },
      add(){
        this.$router.push({name:"addEditFarmeWork",query:{pid:this.id,company_id:this.company_id,title:'添加子部门'}})
      },
      newName(){
        this.$router.push({name:"addEditFarmeWork",query:{pid:this.id,company_id:this.company_id,name:this.name,title:'重命名部门'}})
      }
    }
  }
</script>
<style>
  .memberFramework{
    text-align: left;
    margin: 0;
  }
  .memberFramework span{
    display: inline-block;
    width: 100%;
    margin-top:16px;
    padding-left: 20px;
  }
  .memberFramework span em{
    width: 100%;
    font-style: normal;
    display: inline-block;
  }
  .memberFramework span i{
    font-style: normal;
    width: 100%;
    display: inline-block;
  }
  .bgDark{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.6);
    z-index: 999;
  }
  .caoz{
    background: #fff;
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 10px;
    z-index: 1000;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
  .caoz p{
    border-bottom: 1px solid #dadada;
    margin: 0;
    padding: 15px 0;
  }
</style>
