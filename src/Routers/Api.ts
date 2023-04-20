/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-31 10:04:38
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-04-08 19:59:02
 * @FilePath: \SmartFileSystem\src\Routers\Api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Express from 'express';
import * as express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send("API板块")
})
router.get('/list', (req, res) => {
    res.send("API列表")
})
router.get('/xq', (req, res) => {
    res.send("API详情页")
})// console.log('first', first)

export default router