class GVue {
    constructor(options) {
        this.$options = options
        this.$data = options.data
        this.observe(this.$data)
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
        this.observe(val)

        const dep = new Dep()

        Object.defineProperty(obj, key, {
            get() {
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
        this.watchers =[]
    }
    addDep(watcher){
        this.watchers.push(watcher)
    }
    notify(){
        this.watchers.forEach(dep=>{
            dep.update()
        })
    }
}

class Watcher{
    constructor(vm,key){
        Dep.target = this
        this.vm = vm
        this.key = key
    }
    update(){
        console.log(this.key+" key update")
    }
}