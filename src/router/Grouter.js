let Vue

class VueRouter {
    constructor(options) {
        this.$options = options
        this.routeMap = {}
        this.app = new Vue({
            data: {
                current: "/"
            }
        })
    }
    init() {
        //   绑定浏览器事件
        this.bindEvents()
        //   解析路由配置
        this.createRouterMap(this.$options)
        //   创建router-link和router-view
        this.initComponent()
    }
    bindEvents() {
        window.addEventListener("hashchange", this.onHashChange.bind(this))
        window.addEventListener("load", this.onHashChange.bind(this))
    }
    onHashChange() {
        //   http://localhost:3000/#/home
        this.app.current = window.location.hash.slice(1) || "/"
    }
    createRouterMap(options) {
        options.routes.forEach(item => {
            //   ['home']: {path: "/home", components: Home}
            this.routeMap[item.path] = item
        })
    }
    initComponent() {
        Vue.component("router-link", {
            props: ["to"],
            render(h) {
                return h("a", {attrs: {href: "#"+this.to}},this.$slots.default)
                // return <a href={this.to}>{this.$slots.default}</a>
            },
        })

        //  hash->current->render
        Vue.component("router-view", {
            //箭头函数解决this指向
            render: (h) => {
                const Comp = this.routeMap[this.app.current].component
                return h(Comp)
            },
        })
    }
}

VueRouter.install = function (_Vue) {
    Vue = _Vue
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
                this.$options.router.init()
            }
        },
    })
}

export default VueRouter