<template>
    <div>
    <header class="evaluate-header"><i class="back" v-on:click="cancel()"></i>{{title}}</header>
    <div class="man" v-for="items in item" :data-id="items.id" v-on:click="chooseMan(items.name)">
            <span class="imgSpan">
              <img src="../img/noHead.png" alt="">
            </span>
            <span class="txtSpan">
              <p>{{items.name}}</p>
              <p>{{items.position}}</p>
              <p>{{items.telephone}}</p>
            </span>
    </div>
    </div>  
</template>

<script>
    import axios from 'axios'
    export default{
        created:function() {
            this.star()
        },
        data(){
            return{
                item:[],
                title:""
            }
        },
        methods:{
            star(){
                this.title=this.$route.query.title

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
            chooseMan(name){
                
                if(this.title=="选择负责人"){
                    this.$router.push({query:{name:name}})
                    this.$parent.isProject=true
                    this.$parent.isCharge=false
                    this.$parent.chargeName=this.$route.query.name
                }else if(this.title=="直属上级"){
                    this.$parent.isAddMan=true
                    this.$parent.isCharge=false
                    this.$parent.ruleForm.superior=name
                }
                
            },
            cancel(){
                if(this.title=="选择负责人"){
                    this.$parent.isProject=true
                    this.$parent.isCharge=false
                }else if(this.title=="直属上级"){
                    this.$parent.isAddMan=true
                    this.$parent.isCharge=false
                }
            }
        }
    }
</script>

<style>
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
</style>
