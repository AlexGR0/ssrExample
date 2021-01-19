//做全局路由
import router from './router'
import store from './store'
import {getToken} from './utils/auth'

const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
    const hasToken = getToken()

    if (hasToken) {
        if (to.path == "/login") {
            next({path: "/"})
        } else {
            // 已登录，获取用户信息
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                //先请求用户信息
                const {roles} = await store.dispatch('user/getInfo')
                //根据角色生成动态路由
                const acRoutes = await store.dispatch('promission/generateRoutes', roles)
                //添加至router
                router.addRoutes(acRoutes)
                //重定向
                next({...to,replace: true})
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})