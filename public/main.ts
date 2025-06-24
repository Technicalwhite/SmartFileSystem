/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-31 01:11:55
 * @LastEditors: Technicalwhite 2234558846@qq.com
 * @LastEditTime: 2025-06-25 07:43:57
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
const rewritesArray: { from: RegExp; to: string | ((context: any) => string) }[] = [
    {
        from: /^\/api/, // /^\/api\/.*$/  /^\/api/  /^\/(api+\/){1}/
        // from: /^\/.*$/,
        to: function (context: any) {
            // console.log('context :>> ', context);
            let path: string = context.parsedUrl.path || ''
            console.log('path api:>> ', path);
            return path
            // return "/api"
            // return '/index.html'
        }
    },
]
// 1. 列出所有可用项目（可选功能）
const PROJECTS_DIR = path.join(__dirname, '../web'); // 项目存放目录
fs.readdirSync(PROJECTS_DIR).forEach(projectName => {
    const projectPath = path.join(PROJECTS_DIR, projectName);
    const stats = fs.statSync(projectPath);
    // console.log('readdirSync :>> ', projectPath, '名字 :>>>', projectName);
    let regexString = `^/${projectName}.*`; // ^/${projectName}.*
    let fromRegex = new RegExp(``);
    // 构造重定向目标路径，例如 /target1, /target2, ..., /target5
    let toPath: any = `/`
    if (projectName != 'index.html') {
        regexString = `^\/${projectName}(\/.*)?$`;// ^\/${projectName}(?:\/|$) /^\/spa1(\/.*)?$/
        fromRegex = new RegExp(regexString);
        toPath = function (context: any) {
            let path: string = context.parsedUrl.path || ''
            console.log(`projectName_path ${projectName}:>> `, path);
            return `/${projectName}/index.html`
        };
        console.log('regexString :>> ', fromRegex, 'toPath :>> ', toPath);
        rewritesArray.push({ from: fromRegex, to: toPath });
    } else {
        // fromRegex = new RegExp(`^\/[^\/]*$`);// ^\/[^\/]*$
        // toPath = function (context: any) {
        //     // console.log('context :>> ', context);
        //     let path: string = context.parsedUrl.path || ''
        //     console.log(`path ${projectName}:>> `, path);
        //     return '/'
        //     // return "/api"
        //     // return '/index.html'
        // };
    }
    // 将重写规则添加到数组中
    // app.use(express.static(projectPath))
})
rewritesArray.push({
    // from: /^\/[^\/]*$/,
    from: /^\/.*$/,
    to: function (context: any) {
        // console.log('context :>> ', context);
        let path1: string = context.parsedUrl.path || ''
        console.log('path1 :>> ', path1,);
        // return removeTrailingSlashIfLengthGreaterThanTwo(path1)+'index.html'
        // return '/index.html'path1
        // return `/`
        return path1
    }
});
// console.log('rewritesArray :>> ', rewritesArray);
function removeTrailingSlashIfLengthGreaterThanTwo(str: string) {
    if (str.length > 2 && str.endsWith('/')) {
        return str.slice(0, -1); // 移除最后一个字符
    }
    return str;
}
const historyMiddleware = history({
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
    // 定向
    rewrites: rewritesArray,
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// 模板引擎配置 渲染静态文件
app.use(express.static(PROJECTS_DIR, {
    // 自定义索引文件处理
//   index: false,
  // 设置自定义头（可选）
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  }}
))
app.use(historyMiddleware);
// app.use(express.static(path.join(__dirname, '../web')))
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
app.get(`/`, (req, res) => {
    console.log('进入/ :>> ', req.url);
    try {
        const projects = fs.readdirSync(PROJECTS_DIR).filter(proj => {
            const stats = fs.statSync(path.join(PROJECTS_DIR, proj));
            return stats.isDirectory();
        });
        // console.log('projects :>> ', projects);
        const html = `<!DOCTYPE html>
        <html>
        <head>
            <title>SPA 项目中心</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                h1 { color: #333; }
                ul { list-style: none; padding: 0; }
                li { margin: 15px 0; }
                a { 
                    display: block; 
                    padding: 15px; 
                    background: #f0f8ff; 
                    border-radius: 8px; 
                    text-decoration: none; 
                    color: #1e6bb8;
                    font-weight: bold;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    transition: all 0.3s;
                }
                a:hover { 
                    background: #d1e7ff; 
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
                }
            </style>
        </head>
        <body>
            <h1>托管单页应用列表</h1>
            <ul>
                ${projects.map(proj =>
            `<li><a href="/${proj}">/${proj}</a></li>`
        ).join('')}
            </ul>
        </body>
        </html>`;

        res.contentType('text/html'); // 设置响应的内容类型为HTML
        res.send(html);
    } catch (error) {
        console.error('加载项目列表出错:', error);
        res.status(500).send('无法加载项目列表');
    }
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
app.use((req, res) => {
        res.contentType('text/html'); // 设置响应的内容类型为HTML
    res.status(404).send(`
        <h1>项目未找到</h1>
        <p>请求的项目不存在</p>
        <p><a href="/">返回项目列表</a></p>
    `);
});
// const projectPath = path.join(__dirname, '../web/PC_Side');
// console.log('本地中的项目名地址 :>> ', projectPath, fs.existsSync(path.join(projectPath, 'index.html')));
// app.use(express.static(path.join(path.join(__dirname, '../web/PC_Side'))));

// // 对于SPA，需要重写所有非静态文件请求到index.html
// app.get(`/PC_Side`, (req, res) => {
//     console.log('projectName :>> ', req.url, 'PC_Side');
//     res.sendFile(path.join(projectPath, 'index.html'));
//     // res.redirect(`/PC_Side`);
// });
// app.use((req, res, next) => {
//   const projectName = req.path.split('/')[1]; // 获取URL中的项目名
//   const projectPath = path.join(PROJECTS_DIR, projectName);
// console.log('本地中的项目名地址 :>> ', projectPath,fs.existsSync(path.join(projectPath, 'index.html')));
//   // 检查项目目录是否存在
//   if (fs.existsSync(path.join(projectPath, 'index.html'))) {
//     // 设置静态文件目录
//     app.use(`/PC_Side`, express.static(projectPath));

//     // 对于SPA，需要重写所有非静态文件请求到index.html
//     app.get(`/${projectName}*`, (req, res) => {
//         console.log('projectName :>> ', projectName);
//     //   res.sendFile(path.join(projectPath, 'index.html'));
//     res.redirect(`/${projectName}`);
//     });

//     // 继续处理请求
//     next();
//   } else {
//     // 项目不存在，返回404错误
//     res.status(404).send('Project not found');
//   }
// });
// test
// 假设你的Vue项目打包后的文件夹放在`dist`目录下，并且每个项目的文件夹名即为项目名
// const projectsDir = path.join(__dirname, '../web');
// 
// 定义一个对象来存储项目名称和对应的静态资源目录
// const projects: { [projectName: string]: string } = {
//   'PC_Side': path.join(__dirname, '../web/PC_Side'),
//   'qwe': path.join(__dirname, '../web/qwe'),
//   // 可以继续添加更多项目
// };

// // 中间件：用于根据请求的路径确定要加载的项目
// app.use((req, res, next) => {
//   // 获取请求的路径（去除开头的斜杠）
//   const requestPath = req.originalUrl.split('/')[1] || '';

//   // 检查请求的路径是否存在于项目列表中
//   if (projects[requestPath]) {
//     // 设置静态资源目录为对应项目的目录
//     app.use(`/${requestPath}`, express.static(projects[requestPath]));

//     // 重定向到项目目录（如果请求的是项目根目录，则重定向到项目目录下的index.html）
//     if (req.path === `/${requestPath}` || req.path === `/${requestPath}/`) {
//       res.redirect(`/${requestPath}`);
//     } else {
//       // 如果请求的是项目内的其他资源，则继续处理请求
//       next();
//     }
//   } else {
//     // 如果请求的路径不存在于项目列表中，则返回404错误
//     res.status(404).send('Project not found');
//   }
// });

// // 中间件：处理静态文件服务
// app.use((req, res, next) => {
//   const projectName = req.path.split('/')[1]; // 从URL路径中提取项目名
//   console.log('从URL路径中提取项目名 :>> ', projectName);
//     console.log('对应目录 :>> ', fs.existsSync(path.join(projectsDir, projectName)));
//     console.log('req.path :>> ', req.path,'<< endsWith >>',req.path.endsWith('.html'));
// //   if (projectName && fs.existsSync(path.join(projectsDir, projectName, 'index.html'))) {
//     // 如果项目名存在且对应目录下有index.html文件，则设置静态文件目录
//     app.use(`/${projectName}`, express.static(path.join(projectsDir, projectName)));

//     // 重写URL路径，以便能够正确处理单页面应用的路由
//     // if (req.path !== `/${projectName}/` && !req.path.endsWith('.html')) {
//     //   res.redirect(`/${projectName}/`);
//     // } else {
//       next(); // 继续处理请求
//     // }
// //   } else {
//     // 如果项目名不存在或对应目录下没有index.html文件，则返回404错误
//     // res.status(404).send('Project not found');
// //   }
// });
// app.use((req, res, next) => {
//   const projectName = req.path.split('/')[1]; // 从URL路径中提取项目名
//   console.log('从URL路径中提取项目名 :>> ', projectName);
//   console.log('对应目录 :>> ', projectName,'>>>',fs.existsSync(path.join(projectsDir, projectName)));
//   if (projectName && fs.existsSync(path.join(projectsDir, projectName, 'index.html'))) {
//     // 如果项目名存在且对应目录下有index.html文件，则设置静态文件目录
//     app.use(`/${projectName}`, express.static(path.join(projectsDir, projectName)));
//     // app.use(express.static(path.join(__dirname, '../web/')))
//     console.log('req.path :>> ', req.path,req.path.endsWith('.html'));
//     // 重写URL路径，以便能够正确处理单页面应用的路由
//     if (req.path !== `/${projectName}/` && !req.path.endsWith('.html')) {
//       res.redirect(`/${projectName}/`);
//     } else {
//       next(); // 继续处理请求
//     }
//   } else {
//     // 如果项目名不存在或对应目录下没有index.html文件，则返回404错误
//     res.status(404).send('Project not found');
//   }
// });
// app.get('/:projectName/*', (req, res, next) => {
//     const projectName = req.params.projectName;
//     const projectPath = path.join(projectsDir, projectName);
//     console.log('project req.params:>> ', projectName, projectPath);
//     console.log('project path.join:>> ', projectName, projectPath);
//     // 检查项目文件夹是否存在
//     if (!fs.existsSync(path.join(projectPath, 'index.html'))) {
//         res.status(404).send('Project not found');
//         return next()
//     } else {
//         // 重定向到项目的index.html
//         res.redirect(`/${projectName}/index.html`);
//     }
//     // res.send({
//     //     code: 'ok',
//     //     projectName: projectName,
//     //     projectPath: projectPath
//     // });

//     // 设置静态文件路径为对应项目的文件夹
//     //   app.use(`/${projectName}`, express.static(projectPath));

//         return next()
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