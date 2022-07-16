// 文章类别的路由处理函数模块：

const db = require('../db/index')

// 获取文章分类信息的路由处理函数（无参数）：
exports.getArticleCates = (req, res) => {
	const sqlStr = 'select * from ev_article_cate where is_delete=0'
	db.query(sqlStr, (err, results) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '文章分类列表获取成功！',
			data: results
		})
	})
}

// 新增文章类别路由的路由处理函数（请求体：name, alias）：
exports.addArticleCate = (req, res) => {
	const sqlStr = 'select * from ev_article_cate where name=? or alias=?'
	db.query(sqlStr, [req.body.name, req.body.alias], (err, results) => {
		if (err) return res.cc(err)

		switch (results.length) {
			case 1:
				if (req.body.name === results[0].name && req.body.alias === results[0].alias) return res.cc('文章类别名称和文章类别别名都已被占用！')
				return res.cc(req.body.name === results[0].name ? '文章类别名称已被占用！' : '文章类别别名已被占用！')
			case 2:
				return res.cc(req.body.name === results[0].name ? '文章类别名称已被占用！' : '文章类别别名已被占用！')
			default:
				break
		}


		const sqlStr = 'insert into ev_article_cate set ?'
		db.query(sqlStr, req.body, (err, results) => {
			if (err) return res.cc(err)
			if (results.affectedRows !== 1) return res.cc('文章类别添加失败！')

			res.cc('文章类别添加成功！', 0)
		})
	})
}

// 删除某文章类别的路由处理函数（URL参数：Id）：
exports.delArticleCate = (req, res) => {
	const sqlStr = 'update ev_article_cate set is_delete=1 where Id=?'
	db.query(sqlStr, req.params.Id, (err, results) => {
		if (err) return res.cc(err)
		if (results.changedRows !== 1) return res.cc('标记删除文章类别失败！')

		res.cc('标记删除文章类别成功！', 0)
	})
}

// 获取某文章类别信息的路由处理函数（URL参数：Id）：
exports.getArticleCateInfo = (req, res) => {
	const sqlStr = 'select * from ev_article_cate where Id=?'
	db.query(sqlStr, req.params.Id, (err, results) => {
		if (err) return res.cc(err)
		if (results.length !== 1) return res.cc('文章类别信息获取失败！')

		res.send({
			status: 0,
			message: '文章类别信息获取成功！',
			data: results[0]
		})
	})
}

// 更新某文章类别信息的路由处理函数（请求体：Id, name, alias）：
exports.updateArticleCateInfo = (req, res) => {
	const reqInfo = req.body

	const sqlStr = 'select * from ev_article_cate where Id<>? and (name=? or alias=?)'
	db.query(sqlStr, [reqInfo.Id, reqInfo.name, reqInfo.alias], (err, results) => {
		if (err) return res.cc(err)
		switch (results.length) {
			case 1:
				if (results[0].name === reqInfo.name && results[0].alias === reqInfo.alias) return res.cc('文章类别名称和别名都已被占用！')
				return res.cc(results[0].name === reqInfo.name ? '文章类别名称已被占用！' : '文章类别别名已被占用！')
			case 2:
				return res.cc('文章类别名称和别名都已被占用！')
			default:
				break
		}

		const sqlStr = 'update ev_article_cate set ? where Id=?'
		db.query(sqlStr, [reqInfo, reqInfo.Id], (err, results) => {
			if (err) return res.cc(err)
			if (results.changedRows !== 1) return res.cc('文章类别信息更改失败！')

			res.cc('文章类别信息更改成功！', 0)
		})
	})
}