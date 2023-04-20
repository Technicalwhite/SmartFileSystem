/**
 * jsonp ES6封装模块
 * @function jsonpOX
 * @todo 与正常的Promise调用是一样
 * @param url 此参数必须存在,可以是String也可以是Object,如果是Object的话url必须存在
 * @param data 此参数作为jsonp参数传入bundleRenderer.renderToStream
 * @return .then(one,two) 返回参数正确的参数 内含err报错第二参数
 * @return .catch(one) 返回参数正确的参数 内含err报错第二参数
 */
export function jsonpOX(first, data) {
    // 时间戳
    function nowTime() {
        return (new Date().getTime());
    }
    // 随机数
    let fnName = 'myJsonp_' + nowTime() + Math.random().toString().replace('.', '');

    let body = document.body
    let myScript = document.createElement('script');
    myScript.type = 'text/javascript';
    if (!data && Object.prototype.toString.call(first) === '[object Object]' && first.url) {
        // console.log('参数为Object');
        let urls = first.url + (first.url.indexOf("?") === -1 ? "?" : "&")
        // data参数拼接
        for (let key in first.data) {
            urls += key + '=' + first.data[key] + '&'
        }
        myScript.src = urls + `callback=${fnName}`
        // console.log('data属性个数url》》》》', Object.keys(first.data).length);

        return new Promise((resolve, reject) => {
            // myScript.id = 'jsonpCB'
            body.appendChild(myScript);
            // console.log(myScript, '触发 JSONP_iox', myScript.id, 'JSONP_iox参数', data);
            if (Object.prototype.toString.call(first.data) === '[object Object]') {
                window[fnName] = result => {

                    delete window[fnName]
                    body.removeChild(myScript)
                    if (result) {
                        resolve(result)
                    } else {
                        reject('没有返回数据')
                    }
                }
            } else {
                reject('没有返回数据')
            }
            body.appendChild(myScript)
        })

    } else if (Object.prototype.toString.call(first) === '[object String]' &&
        Object.prototype.toString.call(data) === '[object Object]') {
        let urls = first + (first.indexOf("?") === -1 ? "?" : "&")
        // data参数拼接
        for (let key in data) {
            urls += key + '=' + data[key] + '&'
        }
        myScript.src = urls + `callback=${fnName}`
        console.log('data属性个数》》》》', Object.keys(data).length);

        return new Promise((resolve, reject) => {
            // myScript.id = 'jsonpCB'
            body.appendChild(myScript);
            console.log(urls, '触发 JSONP_iox', myScript.id, 'JSONP_iox参数', data);
            if (Object.prototype.toString.call(data) === '[object Object]') {
                window[fnName] = result => {

                    delete window[fnName]
                    body.removeChild(myScript)
                    if (result) {
                        resolve(result)
                    } else {
                        reject('没有返回数据')
                    }
                }
            } else {
                reject('没有返回数据')
            }
            body.appendChild(myScript)
        })
    } else {
        // console.log('参数错误');
        return new Promise((resolve, reject) => {
            reject('参数错误')
        })
    }
    // let urls = Object.prototype.toString.call(data)==='[object Object]'?
    // url + (url.indexOf("?") === -1 ? "?" : "&"):null
    // let zhi = Object.keys(data).length>1?'&':''
};
/**
 * 新建时间处理
 * 
 */
function Datego(time,geshi,format) {
    if (tiem) {
        let shijian = time.toString().length == 10 ? time * 1000 : time
    }
    let txt
    switch (geshi) {
        case 'YY-MM-DD h-m-s':
            let date = new Date(shijian)
            let Y = date.getFullYear() + '-'
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
            let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '  '
            let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
            let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
            let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
            txt = Y + M + D + h + m + s
            // return Y + M + D + h + m + s
            break;
    
        default:
            break;
    }
}