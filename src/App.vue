<template>
  <div id="app">
      
        <router-view></router-view>
        <api-Js></api-Js>
  </div>
</template>
<script>
    export default {
        components: {
            'api-Js': {
                render(createElement) {
                    return createElement(
                        'script',
                        {
                            attrs: {
                            type: 'text/javascript',
                            src: './src/js/api.js',
                            },
                        },
                    );
                },
            },
        },
    }
</script>
<style>
*{
    box-sizing: border-box;
}
.evaluate-header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    background-color: #377cfe;
    color: #fff;
    font-size: 16px;
    line-height: 40px;
    z-index: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 20px 30px 0 30px;
    max-width: 450px;
    margin: 0 auto;
    box-sizing: border-box;
}
#app {
    font-family: 微软雅黑, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-top: 60px;
    max-width: 450px;
    margin: 0 auto;
}
.back {
    position: absolute;
    display: inline-block;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    height: 12px;
    width: 12px;
    border-width: 0 0 2px 2px;
    border-color: #fff;
    border-style: solid;
    top: 55%;
    left: 20px;
}
.add{
    position: absolute;
    display: inline-block;
    color: #fff;
    font-style:normal;
    font-size: 30px;
    top: 20px;
    right: 11px;
}

.footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    background-color: #377cfe;
    color: #fff;
    font-size: 16px;
    line-height: 40px;
    z-index: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 450px;
    margin: 0 auto;
    box-sizing: border-box;
}
.footer a{
    display: inline-block;
    width: 50%;
    color: #fff;
    text-decoration: none;
}

</style>
