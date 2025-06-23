
import { Request, Response } from 'express';
import User from '../Modules/Users';
import { userLoginType } from '../types/UserControllersType';
/*
 * @Author: QAQ 2234558846@qq.com
 * @Date: 2024-03-22 15:09:19
 * @LastEditors: Technicalwhite 2234558846@qq.com
 * @LastEditTime: 2025-06-23 10:53:55
 * @FilePath: \SmartFileSystem\src\Controllers\loginPost.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 退出登录
// out(req,res){
//     req.session.login = 0;
//     req.session.username = null;
//     res.render("admin/login");
// }
/**
 * 用户登录
 * @param {Request} req 请求相关
 * @param {Response} res 响应相关
 * @return {void} 
 */
export async function userLogin(req: Request, res: Response) {
    const userLogin: userLoginType = {
        text: "登录板块",
        code: 'ok',
        dataQuery: Object.keys(req.query).length > 0 ? req.query : 'kk',
        thisUser: null,
        funcList: null,
    }
    console.log('list', req.query,) // Object.values(req.query)
    try {
        // userLogin.thisUser = await User.findOne({ userAccount: "123123" }, { userAccount: 1, userName: 1 })
        let [error, data] = await User.create([{
            userName: '测试专用6' + new Date().getTime(),
            userAccount: "123123",
            passWord: "281c136bb4c72251cfa2af78963bec19"
        }])
        // userLogin.funcList = JSON.stringify(User)
        // console.log('thisUser :>> ', 'userLogin',User.resetSequenceFunc());
    } catch (error) {
        userLogin.text = '你还没注册!';
        userLogin.code = 'error';
        userLogin.dataQuery = '';
        userLogin.thisUser = await User.findOne({ userAccount: "1231231" }, { userAccount: 1, userName: 1 });
        userLogin.userLoginError = error;
        console.log('登录接口报错 :>> ', error);
    } finally {
        res.send(userLogin)
    }
}