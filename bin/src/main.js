"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const Api_1 = __importDefault(require("./Routers/Api"));
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
const os_1 = __importDefault(require("os"));
// const history = require('connect-history-api-fallback');
const app = (0, express_1.default)();
let topath = function (context) {
    var _a;
    return (_a = context.parsedUrl.path) === null || _a === void 0 ? void 0 : _a.toString();
};
app.use((0, connect_history_api_fallback_1.default)({
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
}));
// 模板引擎配置 渲染静态文件
app.use(express_1.default.static(path_1.default.join(__dirname, '../web/PC_Side/')));
// app.use('/bin', express.static(path.join(__dirname, '../bin')))
app.use('/static', express_1.default.static(path_1.default.join(__dirname, '../web/admin')));
// 模板引擎配置 引用ejs
// app.set('views',"web");  //设置视图的对应目录
// app.set("view engine","html");       //设置默认的模板引擎
// app.engine('html', ejs.renderFile);       //定义模板引擎
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    const Credentials = true;
    // //设置允许跨域的域名，*代表允许任意域名跨域
    // res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    // // //允许的header类型
    // res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
    // res.header('Content-Type', 'application/json;charset=utf-8');
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    // //允许的header类型
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    // 可以带cookies
    res.header("Access-Control-Allow-Credentials", 'true');
    //跨域允许的请求方式 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    if (req.method == 'OPTIONS') {
        res.header('Allow', 'GET, POST, OPTIONS, PATCH, PUT, DELETE');
        res.sendStatus(200);
    }
    else {
        next();
    }
    next();
});
// test
// app.get('/', (req: express.Request, res: express.Response) => {
//     res.send('?????');//path.join(__dirname, '../web/index.html')
// });
app.get('/q', (req, res) => {
    var _a;
    // res.send('Hello Express QAQ!');
    // let reqobj = JSON.stringify({...req})
    // let add=req.query.add;
    //adds存储用户的add数组
    let adds = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.add) || [];
    // console.log('请求的/q',adds,'>>',req.headers)
    let interfaces = os_1.default.networkInterfaces();
    let data = [];
    let addressArr = [];
    for (let devName in interfaces) {
        let iface = interfaces[devName] || [];
        for (let i = 0; i < iface.length; i++) {
            data.push(iface[i]);
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                addressArr.push(alias);
                // return alias.address
            }
        }
    }
    const spl = Object.assign({}, mongoose_1.default);
    console.log('请求的/q', spl);
    var cache = [];
			var aa = JSON.stringify(spl, function(key, value) {
			    if (typeof value === 'object' && value !== null) {
			        if (cache.indexOf(value) !== -1) {
			            return;
			        }
			        cache.push(value);
			    }
			    return value;
			});
			cache = null;
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
app.use('/api', Api_1.default);
exports.default = app;
