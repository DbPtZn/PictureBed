// 引入express框架
import express from 'express'
import formidableMiddleware from 'express-formidable'
import shell from 'shelljs'
// 引入路径处理模块
import path from 'path'
import fs from 'fs'

// web服务器
const app = express()
//解决跨域请求的问题
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization')
	next()
});

// 开放静态资源
app.use(express.static(path.join(__dirname, 'public')))



// 处理post参数
app.use('/upload',formidableMiddleware({
	// 文件上传目录
	uploadDir: path.join(__dirname, 'public', 'img'),
	// 最大上传文件为4M
	maxFileSize: 16 * 1024 * 1024,
	// 保留文件扩展名
	keepExtensions: true,
}),(req:any,res,next)=>{
    console.log('add')
    /** 目标文件存储地址 */
    const storePath = path.join(__dirname, 'public', 'uploads/', req.fields.loginId)
    if (!fs.existsSync(storePath)) {
        fs.mkdirSync(storePath)
    }
    /** 上传时文件存储地址 */
    const filePath = req.files.file.path
    if(isDirectory(storePath)){
        shell.cp('-r', filePath, storePath);
        shell.rm('-r', filePath);
    }
    /** 文件名 */
    const fileName = filePath.split('img')[1]
    const newPath = storePath  + fileName
    res.send('http://' + req.headers.host + newPath.split('public')[1])
})


app.delete('/delete',formidableMiddleware(),(req:any,res,next) => {
    console.log('delete')
    const { url } = req.fields
    // console.log(url)
    // console.log(uid)
    const filePath = path.join(__dirname, 'public', 'uploads/', url.split('uploads')[1])
    // console.log(filePath)
    if(fs.existsSync(filePath)){
        fs.unlinkSync(filePath)
    }
})


/** 判断是否为文件夹 */
function isDirectory(fileName: any) {
    const stat = fs.lstatSync(fileName)
    return stat.isDirectory()
}

app.listen(3000,() => console.log('服务器启动成功'))
