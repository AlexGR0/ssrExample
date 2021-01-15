class GVue {
    constructor(options) {
        this.$options = options
        //传入data
        this.$data = options.data
        //响应化处理
        this.observe(this.$data)

        // new Watcher(this,"bar.mua")
        // this.bar.mua

        new Compile(options.el, this)
        if (options.created) {
            options.created.call(this)
        }
    }
    observe(value) {
        if (!value || typeof value !== "object") {
            return
        }
        Object.keys(value).forEach(key => {
            this.defineReactive(value, key, value[key])
            this.proxyData(key)
        })
    }
    defineReactive(obj, key, val) {
        //递归遍历
        this.observe(val)

        //定义一个Dep
        const dep = new Dep()//每个dep实例和data中每个key有一对一关系

        //给obj的每一个key定义拦截
        Object.defineProperty(obj, key, {
            get() {
                //依赖收集
                Dep.target && dep.addDep(Dep.target)
                return val
            },
            set(newVal) {
                if (newVal !== val) {
                    val = newVal
                    // console.log(key + " update")
                    dep.notify()
                }
            }
        })
    }
    proxyData(key) {
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key]
            },
            set(newVal) {
                this.$data[key] = newVal
            }
        })
    }
}

class Dep {
    constructor() {
        this.watchers = []
    }
    addDep(watcher) {
        this.watchers.push(watcher)
    }
    notify() {
        this.watchers.forEach(dep => {
            dep.update()
        })
    }
}

//创建Watcher：保存data中数值和页面中的挂钩关系
class Watcher {
    constructor(vm, key, cb) {
        //创建实例时立刻将该实例指向Dep.target便于依赖收集
        Dep.target = this
        this.vm = vm
        this.key = key
        this.cb = cb

        //触发依赖收集
        Dep.target = this
        this.vm[this.key] //触发依赖收集
        Dep.target = null
    }

    //更新
    update() {
        this.cb.call(this.vm,this.vm[this.key])
        console.log(this.key + " key update")
    }
}