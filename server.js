"use strict";

const koa = require("koa");
const Router = require("koa-router");
const views = require("koa-views");
const request = require("request");

let app = koa();
let router = new Router();

process.on("uncaughtException", (err) => {
    console.error(err)
})

let templateRenderTest = function *(){
    let step = new Promise(function(resolve, reject) {
        request("http://httpbin.org/status/202", (err, res, body) => {
            resolve(res)
        });
    });
    let result = yield step
    yield this.render("index", {
        "response_from_google": result.statusCode,
        "current_time": new Date(),
        "random_number": Math.random()
    })
}

router.get("/test", templateRenderTest);

app.use(views(`${__dirname}/views`, {
    map: { html: "twig" }
}))
app.use(router.routes());
app.listen(3000);
