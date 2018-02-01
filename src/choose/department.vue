<template>
  <div>
      <noBackHeader message="选择部门"></noBackHeader>
      <p v-for="items in item" class="department">
        {{items.name}}
        <span v-for="w2 in items.son_">
          <i @click="chooseDepar(w2.id,w2.name)">{{w2.name}}</i>
          <span v-for="w3 in w2.son_">
            <i @click="chooseDepar(w3.id,w3.name)">{{w3.name}}</i>
            <span v-for="w4 in w3.son_">
              <i @click="chooseDepar(w4.id,w4.name)">{{w4.name}}</i>
              <span v-for="w5 in w4.son_">
                <i @click="chooseDepar(w5.id,w5.name)">{{w5.name}}</i>
                <span v-for="w6 in w5.son_">
                  <i @click="chooseDepar(w6.id,w6.name)">{{w6.name}}</i>
                </span>
              </span>
            </span>
          </span>
        </span>
      </p>
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
        item:[]
      }
    },
    methods: {
      star(){
        axios({
          headers:{
            Accept: "application/json, text/plain, */*; charset=utf-8",
            onlykey:sessionStorage.onlykey
          },
          method:"get",
          url:api+'/MemberFramework',
        })
        .then((res)=>{
          this.item=res.data.data
        })
        .catch((error)=>{
          this.$message.error("未知错误，请重试")
        })
      },
      chooseDepar(id,name){
        this.$parent.ruleForm.department=name
        this.$parent.ruleForm.departmentId=id
        this.$parent.isDepartment=false
        this.$parent.isAddMan=true
      }
    }
  }
</script>
<style>
  .department{
    text-align: left;
    padding-left: 20px;
  }
  .department span{
    display: inline-block;
    width: 100%;
    margin-top:16px;
    padding-left: 20px;
  }
  .department span i{
    font-style: normal;
    width: 100%;
    display: inline-block;
  }
</style>
