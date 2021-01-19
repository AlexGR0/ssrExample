import {asyncRoutes, constRoutes} from '../router'

//根据路由meta.role确定是否当前用户拥有访问权限
function hasPromisstion(roles, route) {
    //如果当前路由有roles字段则需要判断用户权限
    if (route.meta && route.meta.roles) {
        //若用户拥有的角色中有被包含待判定路由角色表中的则拥有访问权
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        //没有设置roles则无需判定即可访问
        return true
    }
}

//递归过滤AsyncRoutes路由表
function filterAsyncRoutes(routes, roles) {
    const res = []
    routes.forEach(route => {
        //复制一份
        const tmp = {...route}
        //如果用户有访问权限加入结果路由表
        if (hasPromisstion(roles, tmp)) {
            //如果存在子路由则递归过滤之
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })
    return res
}

const state = {
    routes: [], //完整路由表
    addRoutes: []//用户可访问的路由表
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        //保存能够访问的动态路由
        state.addRoutes = routes
        //全部路由
        state.routes = constRoutes.concat(routes)
    }
}

const actions = {
    //路由生成，在得到用户角色第一时间调用
    generateRoutes({commit}, roles) {
        return new Promise(resolve => {
            let accessedRoutes
            //用户是管理员则有完整访问权限
            if (roles.includes("admin")) {
                accessedRoutes = asyncRoutes || []
            } else {
                //否则需要根据角色做过滤处理
                accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
            }
            commit("SET_ROUTES", accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}