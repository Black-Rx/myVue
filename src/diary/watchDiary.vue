<template>
  <div>
      <backHeader message="施工日志" backUrl="/junshi"></backHeader>
      施工日志详情
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
                    method:'get',
                    url:api+'/ConstructionLog/getLogOneInfo',
                    params:{
                        id:this.$route.query.Id
                    }
                })
                .then((res)=>{
                    if(res.data.status==1){
                        this.item=res.data.data
                    }
                })
                .catch((error)=>{
                    this.$message.error('未知错误，请重试')
                })
            }
        }
    }
</script>
