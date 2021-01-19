const port = 7070
const title = "vue实践"
const path = require("path")
function reslove(dir){
    return path.join(__dirname,dir)
}

module.exports = {
    // publicPath:'/best-practice',
    devServer: {
        port
    },
    configureWebpack: {
        name: title
    },
    chainWebpack(config){
        config.module.rule('svg')
            .exclude.add(reslove("/src/icons"))
        
        config.module.rule('icons')
            .test(/\.svg$/)                               //设置test
            .include.add(reslove("/src/icons"))           //加入include
                .end()                                    //add完上下文进入了数组即之前的include，使用end回退
            .use("svg-sprite-loader")                     //添加loader
                .loader("svg-sprite-loader")              //切换上下文到loader
                .options({symbolId:"icon-[name]"})
                .end()

    }
}