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

        {
            from: /^\/.*$/,
            to: function (context) {
                // console.log('context :>> ', context);
                let path1: string = context.parsedUrl.path || ''
                console.log('path 原来:>> ', path.posix.join(path.posix.join(path1)));
                function removeTrailingSlashIfLengthGreaterThanTwo(str:string) {
                    if (str.length > 2 && str.endsWith('/')) {
                        return str.slice(0, -1); // 移除最后一个字符
                    }
                    return str;
                }
                // console.log('path /:>> ', removeTrailingSlashIfLengthGreaterThanTwo(path));
                return removeTrailingSlashIfLengthGreaterThanTwo(path1)
            }
        }
import { userLoginType,  } from '../types/UserControllers';
 
const result:userLoginType = {
            text: "登录板块",
            code: 'ok',
            dataQuery: 'kk',
            thisUser: {}
};

const myFunction: (a: number, b: number) => number = function(a: number, b: number): number {
    return a + b;
}
console.log('result',result,myFunction(1,2)); // result will be of type number
git config --global user.name "Technicalwhite"
git config --global user.email "2234558846@qq.com" 
ssh-keygen -t rsa -C "2234558846@qq.com"