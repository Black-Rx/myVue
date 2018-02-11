<template>
  <div>
      <backHeader message="添加施工日志" backUrl="/junshi"></backHeader>
      <el-form v-if="choose" class="addDirayForm">
          <el-form-item >
            <a v-on:click="first()"><el-input v-model="name" placeholder="选择项目"></el-input></a>
          </el-form-item>
          <el-form-item >
            <el-date-picker v-model="date" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-card class="box-card">
            <div slot="header" class="clearfix" style="text-align:left">
              <span>天气情况</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="toWeather">{{addEditWeather}}</el-button>
            </div>
            <div v-if="noWeather">
              暂无
            </div>
            <div v-if="hasWeather" class="amPm" v-for="wea in weather">
              <p class="am"><span>上午</span></p>
              <p><img src="../img/tianqi.png" alt=""><span>{{wea.s_weather}}</span></p>
              <p><img src="../img/wendu.png" alt=""><span>{{wea.s_temperature1}}℃ ~ {{wea.s_temperature2}}℃</span></p>
              <p><img src="../img/feng.png" alt=""><span>{{wea.s_wind}}{{wea.s_wind_power}}</span></p>


              <p class="pm"><span>下午</span></p>
              <p><img src="../img/tianqi.png" alt=""><span>{{wea.x_weather}}</span></p>
              <p><img src="../img/wendu.png" alt=""><span>{{wea.x_temperature1}}℃ ~ {{wea.x_temperature2}}℃</span></p>
              <p><img src="../img/feng.png" alt=""><span>{{wea.x_wind}}{{wea.x_wind_power}}</span></p>

            </div>
          </el-card>

          <el-card class="box-card">
            <div slot="header" class="clearfix" style="text-align:left">
              <span>进度情况</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="toProgress">编辑</el-button>
            </div>
            
            <div class="Allprogress">
              <span>总进度</span>
              <el-progress :percentage="AllProNum" :text-inside="true" :stroke-width="18"></el-progress>
            </div>

            <div class="progress" v-for="item in ListProgress">
              <span>{{item.name}}</span>
              <el-progress :percentage="item.value" :text-inside="true" :stroke-width="18"></el-progress>
            </div>
           
          </el-card>


          <el-card class="box-card labour">
            <div slot="header" class="clearfix" style="text-align:left">
              <span>人工统计</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="toArtificial">添加</el-button>
            </div>
            <el-table :data="artificial">
              <el-table-column label="施工部队" prop="site"></el-table-column>
              <el-table-column label="工种" prop="type_work"></el-table-column>
              <el-table-column label="组长名字" prop="group_leader"></el-table-column>
              <el-table-column label="用工量" prop="quantity"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="toEditArtificial(scope.$index)" style="margin-left:13px;padding:0;">编辑</el-button>
                  <el-button type="text" size="small" @click.native.prevent="deleteArtificial(scope.$index, artificial)" style="padding-bottom:0;">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>

          <el-card class="box-card labour">
            <div slot="header" class="clearfix" style="text-align:left">
              <span>材料统计</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="toMaterial">添加</el-button>
            </div>
            <el-table :data="material">
              <el-table-column label="材料名称" prop="name"></el-table-column>
              <el-table-column label="用量" prop="consumption"></el-table-column>
              <el-table-column label="单位" prop="unit"></el-table-column>        
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="toEditMaterial(scope.$index)" style="margin-left:13px;padding:0;">编辑</el-button>
                  <el-button type="text" size="small" @click.native.prevent="deleteMaterial(scope.$index, material)" style="padding-bottom:0;">删除</el-button> 
                </template>
              </el-table-column>
            </el-table>
          </el-card>

          <el-card class="box-card labour">
            <div slot="header" class="clearfix" style="text-align:left">
              <span>设备统计</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="toEquipment">添加</el-button>
            </div>
            <el-table :data="equipment">
              <el-table-column label="设备名称" prop="name"></el-table-column>  
              <el-table-column label="用量" prop="consumption"></el-table-column>
              <el-table-column label="单位" prop="unit"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="toEditEquipment(scope.$index)" style="margin-left:13px;padding:0;">编辑</el-button>
                  <el-button type="text" size="small" @click.native.prevent="deleteEquipment(scope.$index, equipment)" style="padding-bottom:0;">删除</el-button>  
                </template>
              </el-table-column>
            </el-table>
          </el-card>

          <el-form-item label="生产情况记录：">
              <el-input type="textarea" v-model="record"></el-input>
          </el-form-item>

          <el-form-item label="技术质量安全工作：">
              <el-input type="textarea" v-model="technical_safety"></el-input>
          </el-form-item>


          <el-form-item label="附件：">
          <el-upload class="upload-demo" action="http://sdtapi.xmwula.com/File/qnUpload" 
          :on-success="handleAvatarSuccess" :on-remove="handleRemove" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
          </el-form-item>

          <el-button size="big" type="primary" @click="checkData">保存</el-button>
      </el-form>

      <chooseProject v-if="cPro"></chooseProject> <!-- 选择项目 -->
      <chooseWeather v-if="cWeather"></chooseWeather> <!-- 选择天气 -->
      <chooseProgress v-if="cProgress"></chooseProgress>  <!-- 编辑进度 -->
      <addArtificial  v-if="cArtificial"></addArtificial>  <!-- 填写人工统计 -->
      <addMaterial  v-if="cMaterial"></addMaterial>  <!-- 填写材料统计 -->
      <addEquipment v-if="cEquipment"></addEquipment> <!-- 填写设备统计 -->
  </div>
</template>

<script>
  import chooseProject from '../choose/project.vue'   //选择项目页面
  import chooseWeather from '../choose/weather.vue'     //填写天气页面
  import chooseProgress from '../choose/progress.vue'   //编辑进度页面
  import addArtificial from '../choose/addArtificial.vue'  //填写人工统计页面
  import addMaterial from '../choose/addMaterial.vue'   //填写材料统计页面
  import addEquipment from '../choose/addEquipment.vue'  //填写设备统计页面
  import axios from 'axios'
  import qs from 'qs'
  export default{
    components:{
      chooseProject,
      chooseWeather,
      chooseProgress,
      addArtificial,
      addMaterial,
      addEquipment,
    },
    created () {
     
    },
    data(){
      return{
        name:'',   //项目名
        id:'',     //项目id
        date:'',   //日期
        addEditWeather:"添加", //添加修改天气 按钮
        cPro:false,      //选择项目页面  （隐藏）
        cWeather:false,  //选择天气页面   （隐藏）
        cProgress:false, //编辑进度页面  （隐藏）
        cArtificial:false, //添加人工统计页面  （隐藏）
        cMaterial:false,   //添加材料统计页面  （隐藏）
        cEquipment:false,  //添加设备统计页面  （隐藏）
        choose:true,     // 点击选择  （默认显示）
        noWeather:true, //没有天气数据
        hasWeather:false, //有天气数据
        weather:[   //天气数据
          {
            s_weather:'',
            s_temperature1:'',
            s_temperature2:'',
            s_wind:'',
            s_wind_power:'',
            x_weather:'',
            x_temperature1:'',
            x_temperature2:'',
            x_wind:'',
            x_wind_power:'',
          }
        ],
        AllProNum:0,  //总进度的值
        ListProgress:[   //进程进度 默认进度
          {
            name:"桩基",
            value:0
          },
          {
            name:'主体',
            value:0
          },
          {
            name:'基础',
            value:0
          },
          {
            name:'安装',
            value:0
          },
          {
            name:'装修',
            value:0
          },
        ],
        artificial:[   //人工统计数据

        ],
        material:[     //材料统计数据

        ],
        equipment:[    //设备统计数据
          
        ],
        record:'',     //生产情况记录
        technical_safety:'',   //技术质量安全工作
        path:[],   //附件
        fileList2:[]
      }
    },
    methods:{
     
      first(){  //选择项目
        this.cPro=true
        this.choose=false
      },
      toWeather(){  //编辑天气
        if(this.addEditWeather=="添加"){
          this.$router.push({query:{weather:"addWea"}})
          this.choose=false
          this.cWeather=true
        }else if(this.addEditWeather=="修改"){
          this.$router.push({query:{weather:"editWea"}})
          this.choose=false
          this.cWeather=true
        }
        
      },
      toProgress(){     //编辑工程进度
        var  ListProgressData=this.ListProgress
        var  AllProNumData=this.AllProNum
        this.$router.push({query:{lpd:ListProgressData,apd:AllProNumData}})
        this.choose=false
        this.cProgress=true
      },



      toArtificial(){ //添加员工
        this.$router.push({query:{title:'人工添加'}})
        this.cArtificial=true
        this.choose=false  
      },
      toEditArtificial(index){   //跳转修改人工页面
        this.$router.push({query:{title:'人工修改',index:index}})
        this.cArtificial=true
        this.choose=false
      },
      deleteArtificial(index, rows) { //员工表删除
        rows.splice(index, 1);
      },




      toMaterial(){   //添加材料
        this.$router.push({query:{title:'材料添加'}})
        this.cMaterial=true
        this.choose=false
      },
      toEditMaterial(index){   //跳转修改材料页面
        this.$router.push({query:{title:'材料修改',index:index}})
        this.cMaterial=true
        this.choose=false
      },
      deleteMaterial(index, rows) { //材料表删除
        rows.splice(index, 1);
      },




      toEquipment(){       //添加设备
        this.$router.push({query:{title:'设备添加'}})
        this.cEquipment=true
        this.choose=false
      },
      toEditEquipment(index){    //跳转修改设备页面
        this.$router.push({query:{title:'设备修改',index:index}})
        this.cEquipment=true
        this.choose=false
      },
      deleteEquipment(index, rows){
        rows.splice(index, 1);
      },

      handleAvatarSuccess(res, file,fileList) {   //附件上传成功
          this.path.push(res.big_pic)
          var obj={}
          obj.name=file.name
          this.fileList2.push(obj)
      },
      handleRemove(file,fileList){     //附件删除
          for(var i=0;i<this.fileList2.length;i++){
            if(file.name==this.fileList2[i].name){
              console.log(i)
              this.path.splice(i,1)
              this.fileList2.splice(i,1)
            }
          }
      },


      checkData(){  //点击提交时检查数据是否正常
          
          if(this.name==""){
            this.$message.error("请选择项目")
            return
          }else if(this.date==""){
            this.$message.error("请选择日期")
            return
          }else if(this.noWeather==true){
            this.weather=[]
          }
          
          var begin
          let date = new Date(this.date)
          begin=date.getFullYear() + '-' +
          (date.getMonth() + 1) + '-' + 
          date.getDate() + ' ' + 
          date.getHours() + ':' + 
          date.getMinutes() + ':' + 
          date.getSeconds()
       
          begin = new Date(Date.parse(begin.replace(/-/g, "/")));
          begin = begin.getTime();
          begin = begin/1000;
          //开工时间转换

          var schedule=[]
          var obj={}
          obj.name="总进度"
          obj.value=this.AllProNum
          schedule.push(obj)
          for(var i=0;i<this.ListProgress.length;i++){
            schedule.push(this.ListProgress[i])
          }
          this.postData(schedule,begin)
           
        
      },

      postData(schedule,begin){
          
        axios.post(api+'/ConstructionLog/add',qs.stringify({
          date:begin,
          project_name:this.name,
          project_id:this.id,
          weather:this.weather,
          schedule:schedule,
          artificial:this.artificial,
          material:this.material,
          equipment:this.equipment,
          record:this.record,
          technical_safety:this.technical_safety,
          path:this.path,
        }),{
            headers: {
                Accept: "application/json, text/plain, */*; charset=utf-8",
                onlykey:sessionStorage.onlykey
            }
        })
        .then((res)=>{
          // console.log(res)
          if(res.data.status==1){
            this.$message.success("保存成功")
            this.$router.push({name:'junshi'})
          }
        })
        .catch((error)=>{
          this.$message.error("未知错误,请重试")
        })
      }

    },
    // watch:{
    //   addEditWeather:function(val,oldval){
    //     if(val=="修改"){
    //       // console.log(this.weather[0].s_temperature1)
    //     }
    //   }
    // }
  }
</script>

<style>
.addDirayForm{
  padding: 20px 25px;
}

.el-date-editor.el-input{
  width: 100%;
}
.el-card{
  margin-bottom: 22px;
}
.el-card__header{
  padding: 10px 20px;
}
.el-card__body{
  padding: 10px 20px;
}

.amPm{
  text-align: left;
  font-size: 14px;
}
.am{}
.pm{
  border-top: 1px dashed #dadada;
  padding-top: 15px;
  margin-top: 15px;
}
.amPm .am span,.amPm .pm span{
  /* margin: 5px; */
  display: inline-block;
  border-radius: 8px;
  color: #fff;
  padding: 3px 5px;
  font-size: 14px;
  margin-left: 0;
}
.am span{
  background: #1ee6a2;
}
.pm span{
  background:#fec837
}
.amPm p{
  margin: 0;
  margin-top: 5px;
  width: 100%;
  display: inline-block
}
.amPm p img{
  float: left;
}
.amPm p span{
  display: inline-block;
  float: left;
  line-height: 28px;
  margin-left: 15px;
}
.progress span,.Allprogress span{
  float: left;
  display: inline-block;
  width: 60px;
  text-align: left;
}
.progress .el-progress,.Allprogress .el-progress{
  width: calc(100% - 60px);
  float: right;
  margin-top: 2px;
}
.progress{
  display: inline-block;
  width: 100%;
  margin-top: 15px;
}

.labour .el-table th{
  text-align: center;
}
.labour .el-card__body{
  padding: 0;
}
</style>
