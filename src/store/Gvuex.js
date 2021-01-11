let Vue
class Store {
    //  eg: option:{state:{count:0},mutations:{count(state){}}}
    constructor(options = {}) {
        this.state = new Vue({
            data: options.state
        })
        this.mutations = options.mutations || {}
        this.actions = options.actions || {}
        options.getters && this.handleGetters(options.getters)
    }
    commit = (type, arg) => {
        const fn = this.mutations[type]
        fn(this.state, arg)
    }
    dispatch = (type, arg) => {
        const fn = this.actions[type]
        return fn({
            commit: this.commit,
            state: this.state
        }, arg)
    }
    //{getters:{score(state){return state.xx}}}
    handleGetters(getters) {
        this.getters = {}  //store实例上的getters
        //定义只读属性
        Object.keys(getters).forEach(key=>{
            Object.defineProperty(this.getters,key,{
                get:()=>{
                    return getters[key](this.state)
                }
            })
        })
    }
}

function install(_Vue, storeName = "$store") {
    Vue = _Vue
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype[storeName] = this.$options.store
            }
        },
    })
}

export default {
    Store,
    install
}