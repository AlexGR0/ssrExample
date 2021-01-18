//图标自动导入
//利用webpack的require.context自动导入
//返回的req是只去加载svg目录中的模块的函数 1.目录 2.禁止递归 3.匹配规则

import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
const req = require.context('./svg',false,/\.svg$/)
console.log(req.keys())
req.keys().map(req)

//SvgIcon组件全局注册
Vue.component("SvgIcon",SvgIcon)