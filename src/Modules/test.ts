/*
 * @Author: QAQ 2234558846@qq.com
 * @Date: 2024-03-22 13:04:54
 * @LastEditors: Technicalwhite 2234558846@qq.com
 * @LastEditTime: 2025-06-25 02:44:13
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
import { userLoginType,  } from '../types/myModule';
 
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
// 1. 列出所有可用项目（根路由）
app.get('/', (req, res) => {
    try {
        const projects = getProjectList();

        const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>SPA Projects Hub</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #333; }
          ul { list-style: none; padding: 0; }
          li { margin: 10px 0; }
          a { 
            display: block; 
            padding: 10px 15px; 
            background: #f0f0f0; 
            border-radius: 4px; 
            text-decoration: none; 
            color: #0066cc;
            transition: background 0.3s;
          }
          a:hover { background: #e0e0e0; }
        </style>
      </head>
      <body>
        <h1>Available Single Page Applications</h1>
        <ul>
          ${projects.map(proj =>
            `<li><a href="/${proj}">${proj}</a></li>`
        ).join('')}
        </ul>
      </body>
      </html>
    `;

        res.send(html);
    } catch (error) {
        res.status(500).send('Error loading projects');
    }
});

    const htmlString = `
        <!DOCTYPE html>
        <html lang="zh">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Express HTML String</title>
        </head>
        <body>
            <h1>Hello, this is an HTML string rendered by Express!</h1>
        </body>
        </html>
    `;
    res.contentType('text/html'); // 设置响应的内容类型为HTML
    res.send(htmlString);

    
        const html = `<!DOCTYPE html>
        <html lang="zh">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Express HTML String</title>
        </head>
        <body>
            <title>SPA 项目中心</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                h1 { color: #333; }
                ul { list-style: none; padding: 0; }
                li { margin: 15px 0; }
                a { 
                    display: block; 
                    padding: 15px; 
                    background: #f0f8ff; 
                    border-radius: 8px; 
                    text-decoration: none; 
                    color: #1e6bb8;
                    font-weight: bold;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    transition: all 0.3s;
                }
                a:hover { 
                    background: #d1e7ff; 
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
                }
            </style>
        </head>
        <body>
            <h1>托管单页应用列表</h1>
            <ul>
                ${projects.map(proj =>
                    `<li><a href="/${proj}">${proj}</a></li>`
                ).join('')}
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
               
            </ul>
        </body>
        </html>`;

        res.contentType('text/html'); // 设置响应的内容类型为HTML
        res.send(html);
        /^(?:(?!\/some).)*\/some(?:(?!\/some).)*$/
        /^\/some\/(?:(?!\/some\/).)*$/
        /^(?:(?!\/some)*$)*\/some(?:(?!\/some).)*$/

