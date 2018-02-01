<template>
  <div>
      <backHeader message="修改头像" backUrl="/login"></backHeader>
      <div class="edPic">
            <el-upload class="avatar-uploader" action="http://sdtapi.xmwula.com/File/qnUpload"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="'http://img.cxyuns.com/'+imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

            <el-button type="primary" round v-on:click="upPic()">上传头像</el-button>
      </div>
     
  </div>
</template>

<script>
    import axios from "axios"
    import qs from "qs"
    export default{
        created:function () {
            
        },
        data(){
            return{
                imageUrl:''
            }
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = res.big_pic
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }   
                return isJPG
            },
            upPic(){
                axios.post(api+'/user/updateThumb',qs.stringify({
                    thumb:this.imageUrl
                }),{
                    headers:{
                        Accept: "application/json, text/plain, */*; charset=utf-8",
                        onlykey:sessionStorage.onlykey
                    }
                })
                .then((res)=>{
                    console.log(res.data)
                    if(res.data.status=="1"){
                        this.$message.success("头像修改成功")
                        this.$router.push({name:"login"})
                    }
                })
                .catch((error)=>{
                    this.$message.error("未知错误，请重试");
                })
            }
        }
    }
</script>

<style>
  .edPic{
      padding: 20px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;
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
