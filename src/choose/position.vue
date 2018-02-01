<template>
  <div>
      <noBackHeader message="选择职位"></noBackHeader>
     
      <p v-for="items in item" class="position" v-on:click="chooseDone(items.id,items.position)">{{items.position}}</p>
  </div>
</template>

<script>
    import axios from 'axios'
    export default{
        created:function(){
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
                    headers: {
                        Accept: "application/json, text/plain, */*; charset=utf-8",
                        onlykey:sessionStorage.onlykey
                    },
                    url:api+"/Employee/getPosition",
                    method:"get",
                })
                .then((res)=>{
                    this.item=res.data.Position
                })
                .catch((error)=>{
                    this.$message.error("未知错误，请重试");
                    return
                })
            },
            chooseDone(id,position){
                // this.$router.push({query:{position:position,id:id}})
                this.$parent.isPosition=false
                this.$parent.isAddMan=true
                this.$parent.ruleForm.position=position
                this.$parent.ruleForm.positionId=id
            }
        }
    }
</script>
<style>
    .position{
        text-align: left;
        padding-left:30px; 
        margin: 15px 0;
    }
</style>
