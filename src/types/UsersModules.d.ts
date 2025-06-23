/*
 * @Author: Technicalwhite 2234558846@qq.com
 * @Date: 2025-06-23 08:35:30
 * @LastEditors: Technicalwhite 2234558846@qq.com
 * @LastEditTime: 2025-06-23 10:26:04
 * @FilePath: \SmartFileSystem\src\types\Users.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Model } from 'mongoose';
export interface Usertype {
    userName: string;
    userAccount: string;
    passWord: string;
    isAdmin: boolean;
    inc_id?: number;
    [prop: string]: unknown;
}

// 静态方法
export interface UserModel extends Model<Usertype> {
    findByName(): void;
    resetSequenceFunc(startFrom?: string | number | undefined): void;
}
// 动态方法
export interface UserMethods {

}
// 定义静态方法与动态方法，
// 静态方法为model第二个参数传入<Usertype, UserMethods>
// 动态方法为model第三个参数传入<Usertype, {}, UserMethods>
// 可以引用接口类型合并静态new Schema<Usertype,UserModel> 动态<Usertype, Model<Usertype>, UserMethods>