<template>
  <div id="tiyu">
      <addHeader message="人员列表" backUrl="/" addUrl="/addMan"></addHeader>
      <el-tabs v-model="activeName" >
        <el-tab-pane label="按人员显示" name="first">
          <div class="man" v-for="items in item" :data-id="items.id" >
            <span class="imgSpan">
              <img src="../img/noHead.png" alt="">
            </span>
            <span class="txtSpan">
              <p>{{items.name}}</p>
              <p>{{items.position}}</p>
              <p>{{items.telephone}}</p>
            </span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="按组织构架显示" name="second">
          <p v-for="w1 in work" class="work">
            <i class="el-icon-caret-right"></i>{{w1.name}}
            <span v-for="w2 in w1.son_">
              <i class="el-icon-caret-right"></i>{{w2.name}}
              <span v-for="w3 in w2.son_">
               
                <span v-if="w3.telephone" class="workMan">
                  <img src="../img/noHead.png" alt="">
                   {{w3.name}} <br>
                   {{w3.position}} {{w3.telephone}}
                </span> 
                <span v-if="w3.status">
                  <i class="el-icon-caret-right"></i>{{w3.name}}
                  <span v-for="w4 in w3.son_">
                    <span v-if="w4.telephone" class="workMan">
                      <img src="../img/noHead.png" alt="">
                      {{w4.name}} <br>
                      {{w4.position}} {{w4.telephone}}
                    </span>
                    <span v-if="w4.status">  
                      <i class="el-icon-caret-right"></i>{{w4.name}} 
                      <span v-for="w5 in w4.son_">
                         <span v-if="w5.telephone" class="workMan">
                            <img src="../img/noHead.png" alt="">
                            {{w5.name}} <br>
                            {{w5.position}} {{w5.telephone}}
                        </span>      
                         <span v-if="w5.status">
                            <i class="el-icon-caret-right"></i>{{w5.name}} 
                            <span v-for="w6 in w5.son_">
                              <span v-if="w6.telephone" class="workMan">
                                <img src="../img/noHead.png" alt="">
                                {{w6.name}} <br>
                                {{w6.position}} {{w6.telephone}}
                              </span>
                              <span v-if="w6.status">
                                <i class="el-icon-caret-right"></i>{{w6.name}}
                                <span v-for="w7 in w6.son_">
                                  <span v-if="w7.telephone" class="workMan">
                                  <img src="../img/noHead.png" alt="">
                                  {{w7.name}} <br>
                                  {{w7.position}} {{w7.telephone}}
                                </span> 
                              </span>
                            </span>

                        </span>
                      </span> 
                    </span>  
                  </span>
                </span> 
                </span> 
              </span>
            </span>
          </p>
        </el-tab-pane>
      </el-tabs>
      


      
  </div>
</template>

<script>
  import axios from "axios"
  export default{
    created:function () {
      this.star()
      this.star2()
    },
    data(){
      return{
        item:[],
        activeName: 'first',
        work:[],
        w3Man:[],
        isMan:''
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
           url:api+'/Employee',
        })
        .then((res)=>{          
          this.item=res.data.data
        })
        .catch((error)=>{
          this.$message.error("未知错误，请重试");
          return
        })
      },

      star2(){
        axios({
           headers: {
            Accept: "application/json, text/plain, */*; charset=utf-8",
            onlykey:sessionStorage.onlykey
           },
           method:'get',
           url:api+'/Employee/getFramework',
        })
        .then((res)=>{
          if(res.data.status=="1"){
            this.work=res.data.data
          }
        })
        .catch((error)=>{
          this.$message.error("未知错误，请重试")
        })
      },
    }
  }
</script>

<style>
.el-tabs__nav{
  width:100%;
}
.el-tabs__nav .el-tabs__item{
  width:50%;
}

.man{
  padding: 15px 20px;
  display: inline-block;
  width: 100%;
  border-bottom: 1px solid #dadada;
}
  .imgSpan{
    display: inline-block;
    float: left;
  }
  .txtSpan{
    display: inline-block;
    float: left;
    margin-left: 10px;
  }
  .txtSpan p{
    margin: 0;
    text-align: left;
  }
  .txtSpan p:nth-child(1){
    font-size: 16px;
    line-height: 32px;
    color: #000;
  }
  .txtSpan p:nth-child(2){
    font-size: 14px;
    display: inline-block;
    color: #888;
  }
  .txtSpan p:nth-child(3){
    font-size: 14px;
    display: inline-block;
    color: #888;
    margin-left: 10px;
  }
  .work{
    text-align:left;
    padding-left:15px;
    line-height:36px;
    font-size:18px;
  }
  .work span{
    display:inline-block;
    width:100%;
    text-align:left;
    padding-left:15px;
    
  }
    .work span img{
      width: 32px;
      height: 32px;
      float: left;
    }
  .workMan{
    border-bottom: 1px solid #dadada;
  }  
</style>
