// 用户注册登录的路由模块：

const express = require('express')
const router = express.Router()
const user_handler = require('../router_handler/user')
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')

// 注册：
router.post('/reguser', expressJoi(reg_login_schema), user_handler.regUser)

// 登录：
router.post('/login', expressJoi(reg_login_schema), user_handler.login)

module.exports = router