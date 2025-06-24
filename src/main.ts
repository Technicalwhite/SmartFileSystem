/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-31 01:11:55
 * @LastEditors: Technicalwhite 2234558846@qq.com
 * @LastEditTime: 2025-06-25 07:47:06
 * @FilePath: \SmartFileSystem\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import fs from 'fs';
import ejs from 'ejs';
import * as ejsType from 'ejs';
import routerApi from './Routers/Api';
import history from 'connect-history-api-fallback';
import os from 'os';
import setRoutersConfig from './Routers/Index';

const app = express();
function removeTrailingSlashIfLengthGreaterThanTwo(str: string) {
    // if (str.length > 2 && str.endsWith('/')) {
    //     return str.slice(0, -1); // 移除最后一个字符
    // }
    let strArray = str.split('/')
    console.log('str.length :>> ', str.split('/'),strArray[1]);
    if (strArray[1].length >= 1) {
        return `/${strArray[1]}`
    }else{
        return strArray[1];
    }
}
const PROJECTS_DIR = path.join(__dirname, '../web'); // 项目存放目录
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(history({
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
    // 定向
    rewrites: [
        {
            from: /^\/api/, // /^\/api\/.*$/  /^\/api/  /^\/(api+\/){1}/
            // from: /^\/.*$/,
            to: function (context) {
                // console.log('context :>> ', context);
                let path: string = context.parsedUrl.path || ''
                console.log('path api:>> ', path);
                return path
                // return "/api"
                // return '/index.html'
            }
        },
        {
            from: /^\/.*$/,
            to: function (context) {
                // console.log('context :>> ', context);
                let path1: string = context.parsedUrl.path || ''
                console.log('path :>> ', path1);
                let link = removeTrailingSlashIfLengthGreaterThanTwo(path1)+'/index.html'
                console.log('link :>> ', link);
                return path1
                // return link
            }
        }
    ]
}));
// 模板引擎配置 渲染静态文件
app.use(express.static(path.join(__dirname, '../web')))
// app.use(express.static(path.join(__dirname, '../web/PC_Side')))
// app.use(express.static(path.join(__dirname, '../web/qwe')))
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
    // 设置Cache-Control为no-cache
    res.setHeader('Cache-Control', 'no-cache');
    console.log('req.method :>> ', req.method, 'url:>>', req.url);
    // if (req.method == 'OPTIONS') {
    //     res.header('Allow', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
    //     res.sendStatus(200);
    // } else {
    //     next();
    // }
    return next();
});

app.get(`/fileList`, (req, res) => {
    console.log('进入/ :>> ', req.url);
    try {
        const projects = fs.readdirSync(PROJECTS_DIR).filter(proj => {
            const stats = fs.statSync(path.join(PROJECTS_DIR, proj));
            return stats.isDirectory();
        });
        // console.log('projects :>> ', projects);

        // res.contentType('text/html'); // 设置响应的内容类型为HTML
        res.send({
            code: 200,
            data: {
                list: projects
            }
        });
    } catch (error) {
        console.error('加载项目列表出错:', error);
        res.status(500).send('无法加载项目列表');
    }
});
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
// app.use('/api', routerApi)

setRoutersConfig()
export default app