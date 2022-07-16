// 定义用户信息验证规则的模块：

const joi = require('@hapi/joi')

/**
 * string()：值必须是字符串
 * alphanum()：值只能是包含 a-zA-Z0-9 的字符串
 * min(length)：最小长度
 * max(length)：最大长度
 * required()：值必须填（必填项），不能为 undefined
 * pattern(正则表达式)：值必须符合正则表达式的规则
 */

// 定义用户名和密码的验证规则：
const username = joi.string().alphanum().min(5).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 定义 id, nickname, email 的验证规则：
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

// 定义头像的验证规则：
const avatar = joi.string().dataUri().required()




// 验证注册和登录表单数据的验证规则对象：
exports.reg_login_schema = {
	body: {
		username,
		password
	},
	// params: {},
	// query: {}
}

// 更新用户基本信息的验证规则对象：
exports.update_userinfo_schema = {
	body: {
		id,
		nickname,
		email
	}
}

// 更新用户密码的验证规则对象：
exports.update_password_schema = {
	body: {
		oldPwd: password,
		newPwd: joi.not(joi.ref('oldPwd')).concat(password)	// 新密码不能与原密码相同，且必须满足密码的验证规则：joi.ref('oldPwd')表示 newPwd 与 oldPwd 的值保持一致；joi.not(joi.ref('oldPwd'))表示 newPwd 与 oldPwd 的值不能相同；.concat()用于合并验证规则：合并 joi.not(joi.ref('oldPwd)) 和 password 这两条验证规则；
	}
}

// 更新头像的验证规则对象：
exports.update_avatar_schema = {
	body: {
		avatar
	}
}

