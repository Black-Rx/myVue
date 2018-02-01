<template>
  <div>
      <header class="evaluate-header"><i class="back" v-on:click="cancel()"></i>进度情况</header>
      <el-card class="box-card ProgressCard">
            <div slot="header" class="clearfix">
                <span>工程进度</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="addProgress">添加</el-button>
            </div> 
            <div class="Allprogress">
              <span>总进度</span>
              <p class="fr">%</p>
              <input type="text" v-model="Child_AllProNum" class="progressNum">
              
            </div>

            <div class="progress" v-for="(item,index) in Child_ListProgress">
              <i class="el-icon-remove" v-on:click="delProgress(index)"></i>
              <input type="text" v-model="item.name" class="progressName" />
              <p class="fr">%</p>
              <input type="text" v-model="item.value" class="progressNum">
            </div> 

        </el-card>

        <el-button type="primary" @click="save">保存</el-button>
  </div>
</template>

<script>
  export default{
    created () {
      this.star()
    },
    data(){
      return{
        Child_ListProgress:'',
        Child_AllProNum:''
      }
    },
    methods: {
      star(){
        this.Child_ListProgress=this.$route.query.lpd
        this.Child_AllProNum=this.$route.query.apd
        console.log(this.Child_ListProgress)
      },
      cancel(){
        this.$parent.cProgress=false
        this.$parent.choose=true
      },
      addProgress(){
        var obj={}
        obj.name="未命名"
        obj.value=0
        this.Child_ListProgress.push(obj)
      },
      delProgress(index){
        this.Child_ListProgress.splice(index,1);
      },
      save(){
        
        if(isNaN(this.Child_AllProNum)){
          this.$message.error("请输入0-100之间的数值")
          return
        }else if(this.Child_AllProNum>100||this.Child_AllProNum<0){
          this.$message.error("请输入0-100之间的数值")
          return
        }else if(this.Child_AllProNum==""){
          this.Child_AllProNum=0
        }

        for(var i=0;i<this.Child_ListProgress.length;i++){
            if(isNaN(this.Child_ListProgress[i].value)){
              this.$message.error("请输入0-100之间的数值")
              return
            }else if(this.Child_ListProgress[i].value>100||this.Child_ListProgress[i].value<0){
              this.$message.error("请输入0-100之间的数值")
              return
            }else if(this.Child_ListProgress[i].value==""){
              this.Child_ListProgress[i].value=0
            }
            this.Child_ListProgress[i].value=parseInt(this.Child_ListProgress[i].value)
        }
        this.$parent.AllProNum=parseInt(this.Child_AllProNum)
        this.$parent.ListProgress=this.Child_ListProgress
        this.$parent.cProgress=false
        this.$parent.choose=true
      }
    }
  }
</script>

<style>
.ProgressCard{
    margin: 30px 20px;
    
}

.el-card__header{
    text-align:left;
}
.progress .progressName{
  float: left;
  display: inline-block;
  width: 60px;
  border: none;
  outline: none;
  font-family: 微软雅黑, Helvetica, Arial, sans-serif;
  color: #2d2f33;
  font-size: 16px;
}
.progress .progressNum,.Allprogress .progressNum{
  float: right;
  display: inline-block;
  width: 60px;
  text-align: center;
  line-height: 22px;
  font-size: 16px;
  font-family: 微软雅黑, Helvetica, Arial, sans-serif;
  color: #2d2f33;
  margin-right: 8px;
  border-radius: 4px;
  outline: none;
}
.ProgressCard .Allprogress span{
  line-height: 28px;
  margin-left: 26px;
}
.Allprogress{
  display: inline-block;
  width: 100%;
}
.progress p,.Allprogress p{
  margin: 0;
  display: inline-block;
  float: right;
  line-height: 28px;
}

.ProgressCard .progress .el-progress{
  width: calc(100% - 80px);
  float: left;
  margin-top: 2px;
}
.progress i{
  margin-top: 3px;
  font-size: 18px;
  color: red;
  float: left;
  margin-right: 8px;
}
</style>



