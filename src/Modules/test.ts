/*
 * @Author: QAQ 2234558846@qq.com
 * @Date: 2024-03-22 13:04:54
 * @LastEditors: QAQ 2234558846@qq.com
 * @LastEditTime: 2024-04-01 10:38:47
 * @FilePath: \SmartFileSystem\src\Modules\test.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Schema, InferSchemaType, model } from 'mongoose';

// Document interface
// No need to define TS interface any more.
// interface User {
//   name: string;
//   email: string;
//   avatar?: string;
// }

// Schema
const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String
});

// InferSchemaType will determine the type as follows:
// type User = {
//   name: string;
//   email: string;
//   avatar?: string;
// }

// `UserModel` will have `name: string`, etc.
schema.static('findByName', function() {
    console.log('登录数据数据库验证 :>> ', '');
    return 42;
});
type User = InferSchemaType<typeof schema>;
const UserModel = model<User>('User', schema);
// const answer: number = UserModel.findByName();
// console.log('answer :>> ', answer);