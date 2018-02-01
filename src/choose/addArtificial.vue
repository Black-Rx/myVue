<template>
  <div>
      <header class="evaluate-header"><i class="back" v-on:click="cancel()"></i>{{title}}</header>

      <el-form label-width="80px" class="artifiForm">
        <el-form-item label="施工部队">
            <el-input v-model="site"></el-input>
        </el-form-item>
        <el-form-item label="工种">
            <el-input v-model="type_work"></el-input>
        </el-form-item>
        <el-form-item label="组长名字">
            <el-input v-model="group_leader"></el-input>
        </el-form-item>
        <el-form-item label="用工量">
            <el-input v-model="quantity"></el-input>
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
                delBtn:false,//删除按钮
                title:this.$route.query.title,
                site:'',
                type_work:'',
                group_leader:'',
                quantity:'',
            }
        },
        methods: {
            star(){
                if(this.$route.query.title=="人工修改"){   //如果是修改 取值赋值到页面上
                    console.log(this.$parent.artificial[this.$route.query.index])
                    this.site=this.$parent.artificial[this.$route.query.index].site
                    this.type_work=this.$parent.artificial[this.$route.query.index].type_work
                    this.group_leader=this.$parent.artificial[this.$route.query.index].group_leader
                    this.quantity=this.$parent.artificial[this.$route.query.index].quantity
                }
            },
            cancel(){
                this.$parent.cArtificial=false
                this.$parent.choose=true
            },
            save(){
                if(this.$route.query.title=="人工添加"){  //如果是添加 直接插入数组
                    var obj={}
                    obj.site=this.site
                    obj.type_work=this.type_work
                    obj.group_leader=this.group_leader
                    obj.quantity=this.quantity
                    this.$parent.artificial.push(obj)
                    this.$parent.cArtificial=false
                    this.$parent.choose=true
                }else if(this.$route.query.title=="人工修改"){  //如果是修改 修改数组对应的索引值
                    this.$parent.artificial[this.$route.query.index].site=this.site
                    this.$parent.artificial[this.$route.query.index].type_work=this.type_work
                    this.$parent.artificial[this.$route.query.index].group_leader=this.group_leader
                    this.$parent.artificial[this.$route.query.index].quantity=this.quantity
                    this.$parent.cArtificial=false
                    this.$parent.choose=true
                }
                
            }
        }
    }
</script>
<style>
.artifiForm{
    padding: 20px;
}
</style>
