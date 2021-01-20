import store from '../store'
//完成一个指令，该指令通过传过来的权限数组和当前用户角色数组过滤
//如果用户拥有要求的权限则可以看到，否则删除指令挂钩的dom元素
export default {
    // 生命周期
    //el-挂载的dom
    // binding- v-pro="[]"    解析为：{value:[]}
    inserted(el,binding){
        const {value:promissionRoles} = binding
        console.log(binding)
        const roles = store.getters.roles
        if(promissionRoles && promissionRoles instanceof Array && promissionRoles.length>0){
            const hasPromission = roles.some(role=>{
                return promissionRoles.includes(role)
            })

            if(!hasPromission){
                el.parentNode && el.parentNode.removeChild(el)
            }
        }else{
            throw new Error('需要指定数组类型权限')
        }
    }
}