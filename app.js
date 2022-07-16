const express = require('express')
const cors = require('cors')

const user_router = require('./router/user')
const userinfo_router = require('./router/userinfo')
const artcate_router = require('./router/artcate')
const article_router = require('./router/article')

const joi = require('@hapi/joi')
const expressJWT = require('express-jwt')
const config = require('./config')

const app = express()

app.use((req, res, next) => {	// 封装 res.send 为一个全局的中间件，简化代码
	// status默认为1，表失败的情况；
	// info可能是一个错误的对象，也可能是一个描述字符串；
	res.cc = (info, status = 1) => {
		res.send({
			status,
			message: info instanceof Error ? info.message : info
		})
	}

	next()
})

app.use(expressJWT({	 // 该方法会自动将解析出来的用户信息添加给req.user属性（req.user为一个对象）
	secret: config.jwtSecretKey
}).unless({
	path: [/^\/api/]	// 设置路由权限（若需要权限，则必须通过身份认证）
}))

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use('/static', express.static('./uploads'))

// 路由：
app.use('/api', user_router)	// 注册登录
app.use('/my', userinfo_router)	// 用户信息管理
app.use('/my/article', artcate_router)	// 文章分类信息
app.use('/my/article', article_router) // 文章管理

// 错误处理：
app.use((err, req, res, next) => {
	// 验证失败导致的错误：
	if (err instanceof joi.ValidationError) return res.cc(err)

	// 身份认证失败后的错误：
	if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')

	// 未知错误：
	res.cc(err)
})

app.listen(5678, () => {
	console.log('Server is running at http://127.0.0.1:5678')
})