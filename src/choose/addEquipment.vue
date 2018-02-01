<template>
  <div>
      <header class="evaluate-header"><i class="back" v-on:click="cancel()"></i>{{title}}</header>
      <el-form label-width="80px" class="equForm">
        <el-form-item label="设备名称">
            <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="用量">
            <el-input v-model="consumption"></el-input>
        </el-form-item>
        <el-form-item label="单位">
            <el-input v-model="unit"></el-input>
        </el-form-item>
        
      </el-form>  

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
                title:this.$route.query.title,
                name:'',
                unit:'',
                consumption:'',
            }
        },
        methods: {
            star(){
                if(this.$route.query.title=="设备修改"){
                    this.name=this.$parent.equipment[this.$route.query.index].name
                    this.unit=this.$parent.equipment[this.$route.query.index].unit
                    this.consumption=this.$parent.equipment[this.$route.query.index].consumption
                }
            },
            cancel(){
                this.$parent.cEquipment=false
                this.$parent.choose=true
            },
            save(){
                if(this.$route.query.title=="设备添加"){
                    var obj={}
                    obj.name=this.name
                    obj.unit=this.unit
                    obj.consumption=this.consumption
                    this.$parent.equipment.push(obj)
                    this.$parent.cEquipment=false
                    this.$parent.choose=true
                }else if(this.$route.query.title=="设备修改"){
                    this.$parent.equipment[this.$route.query.index].name=this.name
                    this.$parent.equipment[this.$route.query.index].unit=this.unit
                    this.$parent.equipment[this.$route.query.index].consumption=this.consumption
                    this.$parent.cEquipment=false
                    this.$parent.choose=true
                }
            }
        }
    }
</script>
<style>
.equForm{
    padding: 20px;
}
</style>

