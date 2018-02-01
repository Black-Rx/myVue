<template>
  <div>
        <header class="evaluate-header"><i class="back" v-on:click="cancel()"></i>当日天气</header>
        <el-card class="box-card weatherCard">
            <div slot="header" class="clearfix">
                <span>上午</span>
            </div> 
            <el-form label-width="40px" class="weatherForm">
                <el-form-item label="天气">
                    <el-input class="noBorder" v-model="am1"></el-input>
                </el-form-item>
                <el-form-item label="温度">
                    <el-col :span="11">
                        <el-input class="noBorder" v-model="am2"></el-input>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align:center;">~</el-col>
                    <el-col :span="11">
                        <el-input class="noBorder" v-model="am3"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="风向">
                    <el-input class="noBorder" v-model="am4"></el-input>
                </el-form-item>
                <el-form-item label="风力">
                    <el-input class="noBorder" v-model="am5"></el-input>
                </el-form-item>
            </el-form>    
        </el-card>
       
       <el-card class="box-card weatherCard">
            <div slot="header" class="clearfix">
                <span>下午</span>
            </div> 
            <el-form label-width="40px" class="weatherForm">
                <el-form-item label="天气">
                    <el-input class="noBorder" v-model="pm1"></el-input>
                </el-form-item>
                <el-form-item label="温度">
                    <el-col :span="11">
                        <el-input class="noBorder" v-model="pm2"></el-input>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align:center;">~</el-col>
                    <el-col :span="11">
                        <el-input class="noBorder" v-model="pm3"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="风向">
                    <el-input class="noBorder" v-model="pm4"></el-input>
                </el-form-item>
                <el-form-item label="风力">
                    <el-input class="noBorder" v-model="pm5"></el-input>
                </el-form-item>
            </el-form>    
        </el-card>

        <el-button type="primary" @click="check">保存</el-button>
  </div>    
</template>

<script>
    export default{
        created () {
            this.star()
        },
        data(){
            return{
                am1:'',
                am2:'',
                am3:'',
                am4:'',
                am5:'',
                pm1:'',
                pm2:'',
                pm3:'',
                pm4:'',
                pm5:'',
            }
        },
        methods: {
            star(){
                if(this.$route.query.weather=="editWea"){
                    this.am1=this.$parent.weather[0].s_weather
                    this.am2=this.$parent.weather[0].s_temperature1
                    this.am3=this.$parent.weather[0].s_temperature2
                    this.am4=this.$parent.weather[0].s_wind
                    this.am5=this.$parent.weather[0].s_wind_power
                    this.pm1=this.$parent.weather[0].x_weather
                    this.pm2=this.$parent.weather[0].x_temperature1
                    this.pm3=this.$parent.weather[0].x_temperature2
                    this.pm4=this.$parent.weather[0].x_wind
                    this.pm5=this.$parent.weather[0].x_wind_power
                }
            },
            cancel(){
                this.$parent.choose=true
                this.$parent.cWeather=false
            },
            check(){
                if(this.am1==""){
                    this.$message.error("请输入上午天气")
                }else if(this.am2==""){
                    this.$message.error("请输入上午温度")
                }else if(this.am3==""){
                    this.$message.error("请输入上午温度")
                }else if(this.am4==""){
                    this.$message.error("请输入上午风向")
                }else if(this.am5==""){
                    this.$message.error("请输入上午风力")
                }else if(this.pm1==""){
                    this.$message.error("请输入下午天气")
                }else if(this.pm2==""){
                    this.$message.error("请输入下午温度")
                }else if(this.pm3==""){
                    this.$message.error("请输入下午温度")
                }else if(this.pm4==""){
                    this.$message.error("请输入下午风向")
                }else if(this.pm5==""){
                    this.$message.error("请输入下午风力")
                }else{
                    this.save()
                }
                
            },
            save(){
                this.$parent.weather[0].s_weather=this.am1
                this.$parent.weather[0].s_temperature1=this.am2
                this.$parent.weather[0].s_temperature2=this.am3
                this.$parent.weather[0].s_wind=this.am4
                this.$parent.weather[0].s_wind_power=this.am5
                this.$parent.weather[0].x_weather=this.pm1
                this.$parent.weather[0].x_temperature1=this.pm2
                this.$parent.weather[0].x_temperature2=this.pm3
                this.$parent.weather[0].x_wind=this.pm4
                this.$parent.weather[0].x_wind_power=this.pm5
                this.$parent.cWeather=false
                this.$parent.choose=true
                this.$parent.hasWeather=true
                this.$parent.noWeather=false
                this.$parent.addEditWeather="修改"
            }
        }
    }
</script>

<style>

 .weatherForm.el-form {
  padding: 0;
  margin-top: 0;
}
.weatherForm .el-form-item {
    margin-bottom: 0;
}

.noBorder .el-input__inner{
    border: none;
    border-bottom:1px solid #d8dce5;
    border-radius:0; 
}
.weatherCard{
    margin: 30px 20px; 
}
.el-card__header{
    text-align:left;
}
.weatherForm .el-form-item__content input{
    text-align:center;
}

</style>

