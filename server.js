"use strict";

const koa = require("koa");
const Router = require("koa-router");
const views = require("koa-views");

let app = koa();
let router = new Router();

let templateRenderTest = function *(){
    yield this.render("index", {
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
