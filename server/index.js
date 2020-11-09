const express = require("express")
const Vue = require("vue")

const app = express()
const renderer = require("vue-server-renderer").createRenderer()

const page = new Vue({
    data: {
        title: "12123"
    },
    template: `<div>
        <h1>{{title}}</h1>
        <div>hello</div>
    </div>`
})

app.get("/",async (req, res) => {
    try {
        var html = await renderer.renderToString(page)
        console.log(html)
        res.send(html)
    } catch {
        res.status(500).send("error")
    }
})

app.listen(3000, () => {
    console.log("server start")
})