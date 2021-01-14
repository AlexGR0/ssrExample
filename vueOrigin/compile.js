class Compile {
    //el-待编译模版，vm-GVue实例
    constructor(el, vm) {
        this.$vm = vm
        this.$el = document.querySelector(el)

        //把模版中的内容移到片段操作
        this.$fragment = this.node2Fragement(this.$el)
        //执行编译
        this.compile(this.$fragment)
        //放回$el中
        this.$el.appendChild(this.$fragment)
    }

    node2Fragement(el) {
        //创建片段
        const fragment = document.createDocumentFragment()
        let child
        while (child = el.firstChild) {
            fragment.appendChild(child)
        }
        return fragment
    }
    compile(el) {
        const childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            if (node.nodeType == 1) {
                // console.log("编译元素："+node.nodeName)
                this.compileElement(node)
            } else if (this.isInter(node)) {
                // //只关心{{}}
                // console.log("编译插值文本："+node.textContent)
                this.compileText(node)
            }
            //递归子节点
            if (node.children && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }
    isInter(node) {
        return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    //文本替换
    compileText(node) {
        console.log(RegExp.$1, this.$vm[RegExp.$1])

        const exp = RegExp.$1
        this.update(node, exp, "text") //  v-text
    }
    update(node, exp, dir) {
        const updator = this[dir + "Updator"]
        updator && updator(node, this.$vm[exp]) //首次初始化
        //创建Watcher实例，依赖就收集完成
        new Watcher(this.$vm, exp, function (value) {
            updator && updator(node, value)
        })
    }
    textUpdator(node, value) {
        node.textContent = value
    }
    //元素替换
    compileElement(node) {
        //关心属性
        const nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
            //假定：g-xxx="yyy"
            const attrName = attr.name //g-xxx
            const exp = attr.value //yyy
            if (attrName.indexOf("g-") == 0) {
                //指令
                const dir = attrName.substring(2) //xxx
                //执行
                this[dir] && this[dir](node, exp)
            }
        })
    }
    text(node, exp) {
        this.update(node, exp, "text")
    }
}