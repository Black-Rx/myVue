<template>
  <div>
      <backHeader message="添加项目" backUrl="/news"></backHeader>
      
        <el-form label-width="80px" v-if="isProject" class="projectForm">
          
          <el-form-item label="项目名称">
            <el-input v-model="name"></el-input>
          </el-form-item>
          
          <el-form-item label="负责人">
            <a v-on:click="chooseCharge()"><el-input v-model="chargeName"></el-input></a>
          </el-form-item>
          
          <el-form-item label="开工时间">
            <el-date-picker v-model="begin_date" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          
          <el-form-item label="竣工时间">
            <el-date-picker v-model="end_date" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>          

          <el-form-item label="项目头像">
          <el-upload class="avatar-uploader" action="http://sdtapi.xmwula.com/File/qnUpload" :show-file-list="false" 
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="'http://img.cxyuns.com/'+imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          </el-form-item>
          
          <el-button type="primary" v-on:click="judge()">添加</el-button>
      </el-form>
      
      <chargeHtml v-if="isCharge"></chargeHtml>
  </div>
</template>

<script>
  import chargeHtml from '../choose/charge.vue'
  import axios from "axios"
  import qs from "qs"
  export default{
    components: {
      chargeHtml
    },
    created :function() {
     
    },
    data(){
      return{
        name:'',
        begin_date:'',
        end_date:'',
        imageUrl: '',
        chargeName:'',
        isProject:true,
        isCharge:false,
      }
    },
    methods:{
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }   
        return isJPG
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = res.big_pic
      },
      judge(){
        if(this.name==""){
          this.$message({
            message: '项目名称不能为空',
            type: 'warning'
          });
          return
        }else if(this.chargeName==""){
          this.$message({
            message: '请选择负责人',
            type: 'warning'
          });
          return
        }else if(this.begin_date==""){
          this.$message({
            message: '请选择开工日期',
            type: 'warning'
          });
          return
        }else if(this.end_date==""){
          this.$message({
            message: '请选竣工日期',
            type: 'warning'
          });
          return
        }else if(this.imageUrl==""){
          this.$message({
            message: '请选择项目头像',
            type: 'warning'
          });
          return
        }else{
          this.add()
        }
      },
      add(){     
        var begin  //开工时间
        var end    //竣工时间
        if(this.begin_date!=""){
          let date = new Date(this.begin_date)
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
        }
        if(this.end_date!=""){
          let date = new Date(this.end_date)
          end=date.getFullYear() + '-' +
          (date.getMonth() + 1) + '-' + 
          date.getDate() + ' ' + 
          date.getHours() + ':' + 
          date.getMinutes() + ':' + 
          date.getSeconds()
       
          end = new Date(Date.parse(end.replace(/-/g, "/")));
          end = end.getTime();
          end = end/1000;
          //开工时间转换
        }
      
        axios.post(api+'/projectInformation/add', qs.stringify({
            name:this.name,
            begin_date:begin,
            end_date:end,
            person_charge:this.chargeName,
            project_avatar:this.imageUrl,
        }), {
              headers: {
                Accept: "application/json, text/plain, */*; charset=utf-8",
                onlykey:sessionStorage.onlykey
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
      chooseCharge(){
        this.isProject=false
        this.isCharge=true
        this.$router.push({query:{title:"选择负责人"}})
      }
    }
  }

</script>

<style>

.projectForm {
  padding: 20px;
}
.el-date-editor.el-input{
  width: 100%;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
