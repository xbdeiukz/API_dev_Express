// 用户注册登录的路由处理函数模块：

const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

// 注册新用户的处理函数（请求体参数：username, password）：
exports.regUser = (req, res) => {
	const reqInfo = req.body

	// 校验表单数据的合法性：
	// if (!reqInfo.username || !reqInfo.password) {
	// 	// return res.send({ status: 1, message: '用户名或密码不能为空！' })
	// }

	// 校验用户名是否被占用：
	let sqlStr = 'select * from ev_users where username=?'
	db.query(sqlStr, reqInfo.username, (err, results) => {
		// 执行 SQL 语句失败：
		if (err) {
			return res.send({ status: 1, message: err.message })
		}

		// 用户名被占用：
		if (results.length > 0) {
			// return res.send({ status: 1, message: '用户名已存在，请更换其它用户名！' })
			return res.cc('用户名已存在，请更换其它用户名！')
		}

		// 用户名可用，对密码进行加密，插入新用户：
		reqInfo.password = bcrypt.hashSync(reqInfo.password, 10)

		const sqlStr = 'insert into ev_users set ?'
		db.query(sqlStr, {
			username: reqInfo.username,
			password: reqInfo.password
		}, (err, results) => {
			// SQL 语句执行失败：
			if (err) {
				// return res.send({ status: 1, message: err.message })
				return res.cc(err)
			}

			// 注册用户失败：
			if (results.affectedRows !== 1) {
				// return res.send({ status: 1, message: '注册失败，请稍后再试！' })
				return res.cc('注册失败，请稍后再试！')
			}

			// 注册用户成功：
			// res.send({ status: 0, message: '注册成功！' })
			res.cc('注册成功！', 0)
		})
	})
}

// 登录的处理函数（请求体参数：username, password）：
exports.login = (req, res) => {
	const reqInfo = req.body

	let sqlStr = 'select * from ev_users where username=?'

	db.query(sqlStr, reqInfo.username, (err, results) => {
		if (err) return res.cc(err)

		if (results.length !== 1) return res.cc('用户名不存在，登录失败！')

		// 验证密码正确性：
		const isCorrect = bcrypt.compareSync(reqInfo.password, results[0].password)

		if (!isCorrect) return res.cc('密码错误，登录失败！')

		// 密码正确，在服务端生成 token：
		const userInfo = { ...results[0], password: '', user_pic: '' }

		// 通过对用户信息进行加密生成 token（不能包含用户关键信息，如密码、头像）：
		const tokenStr = jwt.sign(userInfo, config.jwtSecretKey, {
			expiresIn: config.expiresIn
		})
		
		res.send({
			status: 0,
			token: 'Bearer ' + tokenStr
		})

	})
}