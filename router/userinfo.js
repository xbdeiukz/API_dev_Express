// 用户信息管理相关的路由模块：

const express = require('express')
const userinfo_handler = require('../router_handler/userinfo')
const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')

const router = express.Router()

// 获取用户信息：
router.get('/userinfo', userinfo_handler.getUserInfo)	

// 修改用户信息：
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)

// 修改用户密码：
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)

// 修改用户头像：
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)

module.exports = router