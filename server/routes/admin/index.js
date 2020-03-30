module.exports = app => {
    const express = require('express')
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser')
    const jwt = require('jsonwebtoken')
    const router = express.Router({
        mergeParams: true
    })
    // 登录校验中间件
    const authMiddleware = require('../../middleware/auth')
    // 资源请求中间件
    const resourceMiddleware = require('../../middleware/resource')

    // 创建
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    // 修改
    router.put('/:id', async (req, res) => {
        const items = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(items)
    })
    // 删除
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndRemove(req.params.id)
        res.send({
            message: "success"
        })
    })
    // 获取列表
    router.get('/', async (req, res) => {
        let queryOptions = {}
        if (req.Model.modelName == "Category") {
            queryOptions.populate = "parent"
        }
        console.log(req.Model.modelName)
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })
    // 获取详情页
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

    const multer = require('multer')
    // 处理前端传来的图片
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
    // 处理登录
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        //1.查询用户名是否存在
        const user = await AdminUser.findOne({ username: username }).select('+password')
        // if (!user) return res.status(422).send({ message: "用户名不存在" })
        assert(user, 422, "用户不存在")
        //2.验证密码是否正确
        const isValid = require('bcrypt').compareSync(password, user.password)
        // if (!isValid) return res.status(422).send({ message: "密码错误" })
        assert(isValid, 422, "密码错误")

        //3.返回token
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send(token)
    })
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({ message: err.message })
        next()
    })


}