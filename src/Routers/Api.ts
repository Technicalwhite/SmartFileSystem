/*
 * @Author: QAQ 2234558846@qq.com
 * @Date: 2023-04-20 18:56:13
 * @LastEditors: QAQ 2234558846@qq.com
 * @LastEditTime: 2024-03-22 14:06:09
 * @FilePath: \SmartFileSystem\src\Routers\Api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-31 10:04:38
 * @LastEditors: QAQ 2234558846@qq.com
 * @LastEditTime: 2024-03-22 09:00:16
 * @FilePath: \SmartFileSystem\src\Routers\Api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import express from 'express';
import User from '../Modules/Users';
const router = express.Router();
type stringKey = Record<string, object>

router.get('/', async (req, res, next) => {
    // 测试添加用户
    // try {
    //     let [error, data] = await User.create([{
    //         userName: '测试专用3',
    //         userAccount: "123127",
    //         passWord: "281c136bb4c72251cfa2af78963bec19"
    //     }])
    // } catch (error) {
    //     let err: any = error
    //     if (err.code == '11000') {
    //         console.log('添加用户错误 :>> ',);

    //     }
    // }
    // User.findByName({userName:'测试专用3'},()=>{})
    const UsersProto = User.find().then((res) => {
        console.log('查询角色表 :>> ', res);
    })

    console.log('API板块 err:>> ', User.findByName());
    res.send({
        text: "API板块",
        code: 'ok',
        data: ''
    })
})
router.post('/login', (req, res) => {
    console.log('list', req.query, req.body)
    res.send({
        text: "登录板块",
        code: 'ok',
        dataQuery: req.query || 'kk',
        dataBody: req.body || 'body'
    })
    // res.json({
    //     name: 'iron man',
    //     title: '无敌'
    // })
})
router.get('/xq', (req, res) => {
    res.send("API详情页")
})// console.log('first', first)

export default router