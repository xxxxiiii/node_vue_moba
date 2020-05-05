const express = require('express')
const router = express.Router({mergeParams: true})
const multer = require('multer')
const upload = multer({dest: __dirname + '/../../uploads'})
const AdminUser = require('../../models/AdminUser')
const jwt = require('jsonwebtoken')
const assert = require('http-assert')
const authMiddleware = require('../../middleware/auth')
const resourceMiddleware = require('../../middleware/resource')

module.exports = app => {
    // 创建资源
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    // 更新资源
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    // 删除资源
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })
    // 资源列表
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName == 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })
    // 资源详情
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    
    app.use('/admin/api/rest/:resource',   resourceMiddleware(), router)

    // 上传图片/文件
    app.post('/admin/api/upload',   upload.single('file'), async (req, res, next) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    // 登录
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        // 根据用户名找用户
        // AdminUser模型中设置password不可取，加上select('+password)后可以取到password
        const user = await AdminUser.findOne({username}).select('+password')
        assert(user, 422, '用户不存在')
        // if (!user) {
        //     return res.send(422).send({
        //         message: '用户不存在'
        //     })
        // }
        // 校验密码
        const isValid = require('bcryptjs').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')
        // 返回token
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({token})
    })

    // 错误处理函数
    app.use( async( err, req, res, next ) => {
        res.status(err.statusCode || 500).send({
            message: err.message
    })
})

}