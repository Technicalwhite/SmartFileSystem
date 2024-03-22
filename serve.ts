/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-12 16:55:28
 * @LastEditors: QAQ 2234558846@qq.com
 * @LastEditTime: 2024-03-20 14:34:44
 * @FilePath: \SmartFileSystem\serve.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import mongoose from 'mongoose';
import app from './src/main';
import os from 'os';

// 端口
const port: number = 9000
const User = {
    name: 'smartFilesAdmin',
    pwd: 'qwertyui789456'
}
/**
 * 获取当前机器的ip地址
 */
// 增加一个判断VM虚拟机的方法  
// 在上面方法的if中加上这个方法的返回判断就行了
function isVmNetwork(mac: any) {
    // 常见的虚拟网卡MAC地址和厂商
    let vmNetwork = [
        "00:05:69", //vmware1
        "00:0C:29", //vmware2
        "00:50:56", //vmware3
        "00:1C:42", //parallels1
        "00:03:FF", //microsoft virtual pc
        "00:0F:4B", //virtual iron 4
        "00:16:3E", //red hat xen , oracle vm , xen source, novell xen
        "08:00:27", //virtualbox
        "00:00:00", // VPN
    ]
    for (let i = 0; i < vmNetwork.length; i++) {
        let mac_per = vmNetwork[i];
        if (mac.startsWith(mac_per)) {
            return true
        }
    }
    return false;
}

function getIPAdress() {
    let interfaces = os.networkInterfaces();
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
        let netList: any = interfaces[devName];
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
mongoose.connect(`mongodb://${User.name}:${User.pwd}@127.0.0.1:27017/smartFiles`, { bufferCommands: true }).then((res) => {
    console.log('数据库连接成功!', '')
    app.listen(port, () => console.log(`请访问：http://${getIPAdress()}:${port} =>>`))
}).catch((err) => {
    console.log('数据库连接失败!', err)
    return
})
// }
// SQLConnect()