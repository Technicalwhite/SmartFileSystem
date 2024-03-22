/*
 * @Author: QAQ 2234558846@qq.com
 * @Date: 2024-03-20 18:11:11
 * @LastEditors: QAQ 2234558846@qq.com
 * @LastEditTime: 2024-03-22 14:06:42
 * @FilePath: \SmartFileSystem\src\Modules\Users.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Model, Schema, model, InferSchemaType } from 'mongoose';

interface Usertype {
    userName: string;
    userAccount: string;
    passWord: string;
    isAdmin: boolean;
}
// 定义静态方法 动态方法为第三个参数传入<Usertype, {}, UserMethods>
// 动态方法
interface UserMethods {

}
// 静态方法
interface UserModel extends Model<Usertype> {
    findByName(): any;
}

// 可以引用接口类型合并new Schema<Usertype,UserModel>
const userSchema = new Schema({
    userName: {
        type: String,
        required: true, // 必填
        unique: false // 唯一
    },
    userAccount: {
        type: String,
        required: true, // 必填
        unique: true // 唯一
    },
    passWord: {
        type: String,
        required: true, // 必填
        unique: false // 唯一
    },
    isAdmin: {
        type: Boolean,
        default: false  //默认不是管理员，true才是管理员
    }
})

// userSchema.static.isUsernameAndPassword = function (fields, callback) {
//     console.log('登录数据数据库验证 :>> ', fields);
// }
userSchema.static('findByName', function () {
    console.log('登录数据数据库验证 :>> ', '');
    return 42;
});
userSchema.methods.textfunc = function () {
    console.log('测试 :>> ', 'params');
}

const User = model<Usertype, UserModel>('Users', userSchema)
export default User
