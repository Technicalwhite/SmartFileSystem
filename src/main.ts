/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-31 01:11:55
 * @LastEditors: QAQ 2234558846@qq.com
 * @LastEditTime: 2024-03-22 14:05:14
 * @FilePath: \SmartFileSystem\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import buildName from './Modules/test';
// let result1 = buildName("Bob");                  // 现在可以正常工作
// // let result2 = buildName("Bob", "Adams", "Sra");  // 错误, 参数太多
// let result3 = buildName("Bob", "Adams");         // 参数刚刚好
// let result4 = buildName("Bob", "aaaaaa");         // 参数刚刚好
// const express = require('express')
// const app = express();

// // 首页
// app.get('/', (req: Request, res: Response): void => {
//   // 获取数据库数据
//   console.log('req', 'res',res)
//   // res.send([1,2,3,5])
//   // res.json();

// }) //windows mongodb卸载教程
// app.listen(3000, '127.0.0.1', () => console.log('请访问：http://192.168.3.7:3000'))
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import ejs from 'ejs';
import * as ejsType from 'ejs';
import routerApi from './Routers/Api';
import history from 'connect-history-api-fallback';
import os from 'os';
// const history = require('connect-history-api-fallback');
const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(history({
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
    // 定向
    rewrites: [
        {
            // from: /^\/(api+\/){1}/,
            from: /^\/.*$/,
            to: function (context) {
                // console.log('context :>> ', context);
                let path: string = context.parsedUrl.path || ''
                console.log('path :>> ', path);
                return "/api"
            }
        }
    ]
}));
// 模板引擎配置 渲染静态文件
app.use(express.static(path.join(__dirname, '../web')))
// app.use(express.static(path.join(__dirname, '../web/PC_Side/')))
// app.use('/bin', express.static(path.join(__dirname, '../bin')))
// app.use('/static', express.static(path.join(__dirname, '../web/admin')))
// 模板引擎配置 引用ejs
// app.set('views',"web");  //设置视图的对应目录
// app.set("view engine","html");       //设置默认的模板引擎
// app.engine('html', ejs.renderFile);       //定义模板引擎

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    const Credentials = true
    // 设置允许跨域的域名，*代表允许任意域名跨域
    // res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    // 允许的header类型
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
    res.header('Content-Type', 'application/json;charset=utf-8');
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    // 可以带cookies
    res.header("Access-Control-Allow-Credentials", 'true');
    //跨域允许的请求方式 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    console.log('req.method :>> ', req.method);
    // if (req.method == 'OPTIONS') {
    //     res.header('Allow', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
    //     res.sendStatus(200);
    // } else {
    //     next();
    // }
    return next();
});
app.use('/', routerApi)
// test
// app.get('/', (req: express.Request, res: express.Response) => {
//     res.send('?????');//path.join(__dirname, '../web/index.html')
// });
app.get('/q', (req, res) => {
    // res.send('Hello Express QAQ!');
    // let reqobj = JSON.stringify({...req})
    // let add=req.query.add;
    //adds存储用户的add数组
    let adds = req.cookies?.add || [];
    // console.log('请求的/q',adds,'>>',req.headers)
    let interfaces = os.networkInterfaces();
    let data: Array<any> = []
    let addressArr: Array<any> = []
    for (let devName in interfaces) {
        let iface: Array<object> | undefined = interfaces[devName] || [];
        for (let i = 0; i < iface.length; i++) {
            data.push(iface[i])
            let alias: any = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                addressArr.push(alias)
                // return alias.address
            }
        }
    }
    // let sssdb = mongoose.useDb('mydb');
    const spl = { ...mongoose }
    console.log('请求的/q', 'spl')
    let cache: Array<any> = [];
    let aa = JSON.stringify(spl, function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                return;
            }
            cache.push(value);
        }
        return value;
    });
    cache = [];
    // return data
    res.cookie("add", adds, { maxAge: 900000, httpOnly: true });
    res.send({
        code: 'ok',
        mongoose: JSON.parse(aa),
        interfaces: interfaces,
        data: data,
        addressArr: addressArr
    });

});

// 第一模块 前台首页
// app.use('/', require("./routers/Main"));

// 第二模块 后台首页
// app.use('/admin' ,require("./routers/Admin"))

// view视图板块
app.use('/api', routerApi)

export default app