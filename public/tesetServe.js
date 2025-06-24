const express = require('express');
const path = require('path');
const fs = require('fs');
// const morgan = require('morgan');

const app = express();
const PORT = 9001;
const PROJECTS_DIR = path.join(__dirname, 'web');

// 使用 morgan 记录 HTTP 请求
// app.use(morgan('dev'));


// 1. 项目列表主页
app.get('/', (req, res) => {
    try {
        const projects = fs.readdirSync(PROJECTS_DIR).filter(proj => {
            const stats = fs.statSync(path.join(PROJECTS_DIR, proj));
            return stats.isDirectory();
        });
        
        const html = `<!DOCTYPE html>
        <html>
        <head>
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
            </ul>
        </body>
        </html>`;
        
        res.send(html);
    } catch (error) {
        console.error('加载项目列表出错:', error);
        res.status(500).send('无法加载项目列表');
    }
});

// 2. 动态注册项目路由
fs.readdirSync(PROJECTS_DIR).forEach(projectName => {
    const projectPath = path.join(PROJECTS_DIR, projectName);
    const stats = fs.statSync(projectPath);
    
    if (!stats.isDirectory()) return;

    // 重定向 /project 到 /project/
    app.get(`/${projectName}`, (req, res) => {
        res.redirect(`/${projectName}/`);
    });

    // 静态文件服务
    app.use(
        `/${projectName}/`,
        express.static(projectPath, {
            index: false, // 禁用默认 index.html
            redirect: false, // 禁用路径重定向
            setHeaders: (res, filePath) => {
                // 缓存控制
                if (filePath.endsWith('.html')) {
                    res.setHeader('Cache-Control', 'no-cache, no-store');
                } else {
                    res.setHeader('Cache-Control', 'public, max-age=31536000');
                }
            }
        })
    );

    // 前端路由回退处理
    app.get(`/${projectName}/*`, (req, res) => {
        const indexPath = path.join(projectPath, 'index.html');
        if (fs.existsSync(indexPath)) {
            res.sendFile(indexPath);
        } else {
            res.status(404).send('单页应用入口未找到');
        }
    });
});

// 3. 404 处理
app.use((req, res) => {
    res.status(404).send(`
        <h1>项目未找到</h1>
        <p>请求的项目不存在</p>
        <p><a href="/">返回项目列表</a></p>
    `);
});

// 4. 启动服务器
app.listen(PORT, () => {
    console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
    console.log(`📁 项目目录: ${PROJECTS_DIR}`);
    
    // 列出所有项目
    const projects = fs.readdirSync(PROJECTS_DIR).filter(proj => {
        const stats = fs.statSync(path.join(PROJECTS_DIR, proj));
        return stats.isDirectory();
    });
    
    if (projects.length > 0) {
        console.log('🔍 可用项目:');
        projects.forEach(proj => {
            console.log(`   → http://localhost:${PORT}/${proj}`);
        });
    } else {
        console.log('⚠️  未找到项目，请在 projects 目录中添加单页应用');
    }
});