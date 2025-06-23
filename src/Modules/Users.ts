/*
 * @Author: QAQ 2234558846@qq.com
 * @Date: 2024-03-20 18:11:11
 * @LastEditors: Technicalwhite 2234558846@qq.com
 * @LastEditTime: 2025-06-23 10:54:28
 * @FilePath: \SmartFileSystem\src\Modules\Users.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Model, Schema, model, InferSchemaType, } from 'mongoose';
import { Usertype, UserModel } from '../types/UsersModules';
import { getNextSequence, resetSequence } from './AutoIncrement';
import { usersId_default } from '../../config/dbDefault.json';

// 可以引用接口类型合并静态new Schema<Usertype,UserModel> 动态<Usertype, Model<Usertype>, UserMethods>
const userSchema = new Schema({
    userName: {
        type: String,
        required: true, // 必填
        unique: true // 唯一
    },
    userAccount: {
        type: String,
        required: true, // 必填
        unique: false // 唯一
    },
    passWord: {
        type: String,
        required: true, // 必填
        unique: false // 唯一
    },
    isAdmin: {
        type: Boolean,
        default: false  //默认不是管理员，true才是管理员
    },
    userId: {
        type: Number,
        // default: 200,
    },
})
/**
 * 重置自增序列 默认100
 * @function resetSequenceFunc 
 * @param {number} startFrom 传入要重置到哪里开始
 * @return {unknown}
 */
userSchema.static('resetSequenceFunc', async (startFrom: number = usersId_default) => {
    await resetSequence('Counter', { userId: startFrom })
    console.log('重置序列 :>> ', startFrom);
    return '返回重置序列 :>> '
})
userSchema.static('findByName', function () {
    console.log('登录数据数据库验证 :>> ', '');
    return 42;
});
userSchema.methods.textfunc = function () {
    console.log('测试 :>> ', 'params');
}
// 在保存前生成自增ID
userSchema.pre<Usertype>('save', async function (next) {
    if (!this?.isNew || this?.userId) return next();
    try {
        this.userId = await getNextSequence('Users', 'userId');
        console.log('保存前生成自增ID :>> ', this);
        next();
    } catch (error: any) {
        next(error);
        console.log('保存前生成自增ID失败 :>> ', error);
    }
});
const User = model<Usertype, UserModel>('Users', userSchema)
export default User