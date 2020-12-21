const express = require("express")
const fs = require("fs")
const path = require("path")

const app = express()
const {
    createBundleRenderer
} = require("vue-server-renderer")
const serverBundel = require("../dist/server/vue-ssr-server-bundle.json")
const clientManifist = require("../dist/client/vue-ssr-client-manifest.json")
const renderer = createBundleRenderer(serverBundel, {
    runInNewContext: false,
    template: fs.readFileSync(path.resolve(__dirname, "../public/index.temp.html"), "utf-8"),
    clientManifist
})

app.use(express.static(path.resolve(__dirname, "../dist/client"), {
    index: false
}))

app.get("*", async (req, res) => {
    try {
        const context = {
            url: req.url,
            title: 'ssr test'
        }
        const html = await renderer.renderToString(context)
        res.send(html)
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
})

app.listen(3000, () => {
    console.log("server start")
})