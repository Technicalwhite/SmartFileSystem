"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-12 16:55:28
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-04-19 19:37:01
 * @FilePath: \SmartFileSystem\serve.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const mongoose_1 = __importDefault(require("mongoose"));
const main_1 = __importDefault(require("./src/main"));
const os_1 = __importDefault(require("os"));
const port = 9000;
/**
 * 获取当前机器的ip地址
 */
// 增加一个判断VM虚拟机的方法  
// 在上面方法的if中加上这个方法的返回判断就行了
function isVmNetwork(mac) {
    // 常见的虚拟网卡MAC地址和厂商
    let vmNetwork = [
        "00:05:69",
        "00:0C:29",
        "00:50:56",
        "00:1C:42",
        "00:03:FF",
        "00:0F:4B",
        "00:16:3E",
        "08:00:27",
        "00:00:00", // VPN
    ];
    for (let i = 0; i < vmNetwork.length; i++) {
        let mac_per = vmNetwork[i];
        if (mac.startsWith(mac_per)) {
            return true;
        }
    }
    return false;
}
function getIPAdress() {
    let interfaces = os_1.default.networkInterfaces();
    //     let data: Array<any> = []
    //     for (let devName in interfaces) {
    //         let iface: Array<object> | undefined = interfaces[devName] || [];
    //         for (let i = 0; i < iface.length; i++) {
    //             let alias: any = iface[i];
    //             if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
    //                 return alias.address
    //             }
    //         }
    //     }
    //     return data
    for (const devName in interfaces) {
        let netList = interfaces[devName];
        for (var i = 0; i < netList.length; i++) {
            let { address, family, internal, mac } = netList[i];
            let isvm = isVmNetwork(mac);
            if (family === 'IPv4' && address !== '127.0.0.1' && !internal && !isvm) {
                return address;
            }
        }
    }
}
// 数据库连接与服务器开启
// function SQLConnect() {
mongoose_1.default.connect("mongodb://127.0.0.1:27017", { bufferCommands: true }).then((res) => {
    console.log('数据库连接成功!', res);
    main_1.default.listen(port, () => console.log(`请访问：http://${getIPAdress()}:${port} =>>`));
}).catch((err) => {
    console.log('数据库连接失败!', err);
    return;
});
// }
// SQLConnect()
