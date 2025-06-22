import fastGlob from 'fast-glob';
import app from '../main'; 

async function setRoutersConfig(directory?: string | number | undefined) {
    const routersModulePaths = await fastGlob(['**/*.ts', '!*.d.ts'], {
        cwd: 'src/Routers', // 指定根目录
        ignore: ['**/node_modules/**','Index.ts'], // 忽略路径
        absolute: false, // 返回绝对路径
        dot: true, // 包含隐藏文件
        stats: false, // 获取文件元信息（大小、时间等）
    });
    // console.log('object :>> ', routersModulePaths);
    for (let index = 0; index < routersModulePaths.length; index++) {
        const element = routersModulePaths[index];
        if (element == 'Index.ts') {
            continue
        }
        let linkName = `/${element.toLowerCase().replace(/\..*$/, '')}`
        let linkModules = `./${element.replace(/\..*$/, '')}`
        // console.log('objectElement :>> ', element, linkName, linkModules,);
        const routersModule = await import(linkModules); // 动态导入模块'moduleApi>>>',moduleApi
        // 使用导入的模块
        app.use(linkName, routersModule.default)
        // app.use('/api', moduleApi)
    }
    return app
}

export default setRoutersConfig