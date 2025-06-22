import express from 'express';
import fs from 'fs';
import { stat } from 'fs/promises';
import path from 'path';
import User from '../Modules/Users';
import * as UserControllers from '../Controllers/UserControllers';
const router = express.Router();
// console.log('UserControllers :>> ', UserControllers);
router.get('/', async (req, res, next) => {
    let UsersProto = {}
    // 测试添加用户
    try {
        // let [error, data] = await User.create([{
        //     userName: '测试专用6' + new Date().getTime(),
        //     userAccount: "123128",
        //     passWord: "281c136bb4c72251cfa2af78963bec19"
        // }])
    } catch (error) {
        // let err: any = error
        // if (err.code == '11000') {
        //     console.log('添加用户错误 :>> ', err);

        // }
    } finally {
        // let dropIndex = await User.collection.dropIndexes();
        // let getIndexes = await User.collection.getIndexes()
        UsersProto = await User.find()
        // console.log('UsersProto :>> ', UsersProto);
        res.send({
            text: "API板块",
            code: 'ok',
            data: {
                UsersProto: UsersProto, ll: 1
            }
        })
    }
    // res.send({
    //     text: "API板块",
    //     code: 'ok',
    //     data: {
    //         UsersProto:await User.find(),ll:1
    //     }
    // })

    // User.findByName({userName:'测试专用3'},()=>{})

    // console.log('API板块 err:>> ', User.findByName());
    next()
})

router.get('/login', UserControllers.userLogin)
router.get('/xq', (req, res) => {
    console.log('API详情页进入 :>> ', req.query,);
    let nowFile = req.query?.v || ''
    const folderPath = path.join(__dirname, '../../web/' + nowFile);
    console.log('返回文件列表 :>> ', folderPath, '>>', '../../web/' + req.query?.v || '');
    fs.readdir(folderPath, async (err, files: string[]) => {
        if (err) {
            console.error('访问文件夹或文件不存在!', err);
            res.send({
                text: "API详情页>>>访问文件夹或文件不存在!",
                code: 'ok',
                data: []
            })
            return
        } else {
            let filesList: object[] = [];
            let len = files.length;
            console.log('files :>> ', files,);
            for (let index = 0; index < len; index++) {
                const file = files[index];
                console.log('文件', file)
                const fullPath = path.join(folderPath, file);
                try {
                    let stats = await stat(fullPath)
                    if (stats.isDirectory()) {
                        console.log(`${file} 是一个目录`);
                        filesList.push({
                            name: file,
                            type: 'directory'
                        })
                    } else if (stats.isFile()) {
                        // console.log(`${file} 是个文件`);
                        filesList.push({
                            name: file,
                            type: 'file'
                        })
                    } else {
                        // console.log(`${file} 既不是文件也不是目录`);
                        filesList.push({
                            name: file,
                            type: 'undefined'
                        })
                    }
                } catch (error) {
                    if (error) {
                        console.error('Error getting file stats:', error);
                        return;
                    }
                }
            }
            console.log('文件列表', filesList)
            res.send({
                text: "API详情页",
                code: 'ok',
                data: filesList
            }) // 返回文件列表
        }
    });
})// console.log('first', first)

export default router