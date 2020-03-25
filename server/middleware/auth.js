module.exports = opations => {
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../models/AdminUser')
    return async (req, res, next) => {
        // 获取token
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, "请先登录")
        // 判断token
        console.log(req)
        const { id } = jwt.verify(token, req.app.get('secret'))
        assert(token, 401, "请先登录")
        req.user = await AdminUser.findById(id)
        assert(req.user, 401, "请先登录")
        await next()
    }
}