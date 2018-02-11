<template>
  <div>
      <backHeader message="施工日志" backUrl="/junshi"></backHeader>
      施工日志详情
      <div class="showDiary">
            <p>{{item.project_name}}</p>
            <p>{{item.date}}</p>
            <p class="weather">
                <span>天气情况</span>
                <span v-if="weather.length!=0">{{weather}}</span>
                <span v-else>暂无数据</span>
            </p>
            <div class="progress">
                <span>进度情况</span>
                <div v-for="items in schedule">
                    <span>{{items.name}}</span>
                    <el-progress :percentage="items.value" :text-inside="true" :stroke-width="18"></el-progress>
                </div>
            </div>
            <div class="">

            </div>
      </div>
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
                item:[],
                weather:[],
                schedule:[],
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
                        console.log(this.item)
                        this.weather=this.item.weather
                        this.schedule=this.item.Schedule
                        for(var i=0;i<this.schedule.length;i++){
                            this.schedule[i].value=parseInt(this.schedule[i].value)
                        }
                    }
                })
                .catch((error)=>{
                    this.$message.error('未知错误，请重试')
                })
            }
        }
    }
</script>
