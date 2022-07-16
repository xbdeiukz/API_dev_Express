// 用户信息管理的路由处理函数模块：

const db = require('../db/index')
const bcrypt = require('bcryptjs')

// 获取用户基本信息的处理函数（无参数）：
exports.getUserInfo = (req, res) => {
	const sqlStr = 'select id, username, nickname, email, user_pic from ev_users where id=?'
	db.query(sqlStr, req.user.id, (err, results) => {
		if (err) return res.cc(err)
		if (results.length !== 1) return res.cc('用户信息获取失败！')

		res.send({
			status: 0,
			message: '用户信息获取成功！',
			data: results[0]
		})
	})
}

// 更新用户基本数据的处理函数（请求体：id, nickname, email）：
exports.updateUserInfo = (req, res) => {
	const reqInfo = req.body
	if (reqInfo.id !== req.user.id) return res.cc('无权修改其它用户的信息！')

	const sqlStr = 'update ev_users set ? where id=?'
	db.query(sqlStr, [reqInfo, req.user.id], (err, results) => {
		if (err) return res.cc(err)
		if (results.changedRows !== 1) return res.cc('用户信息更新失败！')
		return res.cc('用户信息更新成功！', 0)
	})
}

// 修改用户密码的处理函数（请求体：oldPwd, newPwd）：
exports.updatePassword = (req, res) => {
	const reqInfo = req.body

	const sqlStr = 'select * from ev_users where username=?'
	db.query(sqlStr, req.user.username, (err, results) => {
		if (err) return res.cc(err)
		if (results.length !== 1) return res.cc('用户名不存在！')

		const isCorrect = bcrypt.compareSync(reqInfo.oldPwd, results[0].password)
		if (!isCorrect) return res.cc('原密码错误！')

		const sqlStr = 'update ev_users set password=? where id=?'
		const newPassword = bcrypt.hashSync(reqInfo.newPwd, 10)
		db.query(sqlStr, [newPassword, req.user.id], (err, results) => {
			if (err) return res.cc(err)
			console.log(results)
			if (results.changedRows !== 1) return res.cc('用户密码修改失败！')

			res.cc('用户密码修改成功！', 0)
		})
	})
}

// 修改用户头像的处理函数（请求体：avatar，值为base64格式的字符串）：
exports.updateAvatar = (req, res) => {
	const reqInfo = req.body

	const sqlStr = 'update ev_users set user_pic=? where id=?'
	db.query(sqlStr, [reqInfo.avatar, req.user.id], (err, results) => {
		if (err) return res.cc(err)
		if (results.changedRows !== 1) return res.cc('用户头像更新失败！')
		
		res.cc('用户头像修改成功！', 0)
	})
}