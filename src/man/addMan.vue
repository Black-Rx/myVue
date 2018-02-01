<template>
  <div>
      <backHeader message="添加员工" backUrl="/tiyu"></backHeader>
      <el-form label-width="90px" :model="ruleForm" ref="ruleForm" :rules="rules" v-if="isAddMan">
        <el-form-item label="姓名" prop="name">
            <el-input placeholder="必填" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex" size="medium">
                <el-radio label="1" border>男</el-radio>
                <el-radio label="2" border>女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
            <el-input placeholder="必填（作为登入账号）" v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input placeholder="默认密码 123456" v-model="ruleForm.pwd"></el-input>
        </el-form-item>
        <el-form-item label="组织/部门" prop="department">
            <a @click="chooseDepartment"><el-input placeholder="必填" v-model="ruleForm.department"></el-input></a>
        </el-form-item>
        <el-form-item label="选择职位" prop="position">
           <a @click="choosePosition"><el-input placeholder="选填" v-model="ruleForm.position" ></el-input></a>
        </el-form-item>
        <el-form-item label="直属上级">
            <a @click="chooseCharge"><el-input placeholder="选填" v-model="ruleForm.superior"></el-input></a>
        </el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
      </el-form>

      <positionHtml v-if="isPosition"></positionHtml>
      <charge-html v-if="isCharge"></charge-html>
      <departmentHtml v-if="isDepartment"></departmentHtml>
  </div>
</template>


<script>
    import departmentHtml from '../choose/department.vue'
    import positionHtml from '../choose/position.vue'
    import chargeHtml from '../choose/charge.vue'
    import axios from 'axios'
    import qs from 'qs'
    export default{
        components:{
            positionHtml,
            chargeHtml,
            departmentHtml
        },
        created:function(){

        },
        data(){
            return{
                isAddMan:true,
                isPosition:false,
                isCharge:false,
                isDepartment:false,
                ruleForm: {
                    name:"",
                    sex:'',
                    phone:'',
                    pwd:'',
                    department:'',
                    departmentId:'',
                    position:'',
                    positionId:'',
                    superior:'',
                },     
                rules: {
                    name: [
                        { required: true, message: '请输入员工姓名', trigger: 'blur,change' },
                    ],
                    sex:[
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    phone:[
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { validator:(rule,value,callback)=>{
                            if(/^1[34578]\d{9}$/.test(value) == false){
                                callback(new Error("请输入正确的手机号"));
                            }else{
                                // callback()
                                this.accountType()
                            }
                        },trigger:'blur,change'}
                    ],
                    position:[
                        { required: true, message: '请选择员工职位', trigger: 'blur,change' },
                    ],
                    department:[
                        { required: true, message: '请选择员工部门', trigger: 'blur,change' },
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addMan()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            choosePosition(){
                this.isPosition=true,
                this.isAddMan=false
            },
            chooseCharge(){
                this.isAddMan=false
                this.isCharge=true
                this.$router.push({query:{title:"直属上级"}})
            },
            chooseDepartment(){
                this.isAddMan=false
                this.isDepartment=true
            },
            addMan(){ //添加员工接口
                if(this.ruleForm.pwd==""){
                    this.ruleForm.pwd="123456"
                }
                axios.post(api+'/Employee/Add',qs.stringify({
                    name:this.ruleForm.name,
                    sex:this.ruleForm.sex,
                    telephone:this.ruleForm.phone,
                    password:this.ruleForm.pwd,
                    department_id:this.ruleForm.departmentId,
                    department:this.ruleForm.department,
                    position:this.ruleForm.position,
                    position_id:this.ruleForm.positionId,
                    superior:this.ruleForm.superior,
                }),{
                    headers:{
                        Accept: "application/json, text/plain, */*; charset=utf-8",
                        onlykey:sessionStorage.onlykey
                    }
                })
                .then((res)=>{
                    if(res.data.status=="1"){
                        this.$message.success("添加成功")
                        this.$router.push({name:'tiyu'})
                    }else{
                        this.$message.error(res.data.statusMsg)
                    }

                })
                .catch((error)=>{
                    this.$message.error("未知错误，请重试")
                })
            },
            accountType(){
                axios.post(api+'/Employee/accountType',qs.stringify({
                    telephone:this.ruleForm.phone
                }),{
                    headers:{
                        Accept: "application/json, text/plain, */*; charset=utf-8",
                        onlykey:sessionStorage.onlykey
                    }
                })
                .then((res)=>{
                    console.log(res.data)
                })
                .catch((error)=>{
                    this.$message.error("未知错误，请重试")
                })
            }
        }
    }
</script>

<style>
.el-form {
  padding: 20px;
  margin-top: 30px;
}
.el-date-editor.el-input{
  width: 100%;
}
</style>