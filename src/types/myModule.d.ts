/*
 * @Author: QAQ 2234558846@qq.com
 * @Date: 2025-06-20 15:20:14
 * @LastEditors: QAQ 2234558846@qq.com
 * @LastEditTime: 2025-06-20 18:17:10
 * @FilePath: \SmartFileSystem\src\types\myModule.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ParsedQs } from 'qs';

export interface userLoginType {
    text: string,
    code: string,
    dataQuery: string | ParsedQs,
    thisUser?: object | null,
    userLoginError?: unknown,
    funcList?: any
}
export function myFunctionCon(str: string): number;
// 使用
// import { theFunction, } from '../Modules/mod/theFunctions';

// const resulttt = theFunction('Hello, world!');
// console.log(resulttt); // 输出: 13