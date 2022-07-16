// 文章管理路由模块：

const { result } = require('@hapi/joi/lib/base')
const path = require('path')
const db = require('../db/index')

// 添加文章的路由处理函数（请求体参数FormData：cate_id, title, content, state, cover_img）：
exports.addArticle = (req, res) => {
	const sqlStr = 'insert into ev_articles set ?'

	db.query(sqlStr, {
		...req.body,
		author_id: req.user.id,
		pub_date: Date.now(),
		cover_img: path.join('../uploads', req.file.filename)
	}, (err, results) => {
		if (err) return res.cc(err)
		if (results.affectedRows !== 1) return res.cc('文章发布失败！')
		if (results.affectedRows === 1) return res.cc('文章发布成功！', 0)
	})
}

// 获取特定页码文章列表的路由处理函数（参数：pagenum, pagesize, cate_id, state）：
exports.getArticles = (req, res) => {
	const cateId = req.query.cate_id
	const state = req.query.state
	const pageNum = Number(req.query.pagenum)
	const pageSize = Number(req.query.pagesize)

	const sqlStr = 'select * from ev_articles where cate_id = ? and state = ?'
	db.query(sqlStr, [cateId, state], (err, results) => {
		const length = results.length

		if (err) return res.cc('获取文章列表失败！')
		if (length === 0) return res.cc('没有相关文章！')

		const totalPages = length % pageSize === 0 ? length / pageSize : Math.floor(length / pageSize) + 1

		if (pageNum < totalPages) {
			const start = (pageNum - 1) * pageSize
			const end = (pageNum - 1) * pageSize + pageSize

			return res.cc(results.slice(start, end), 0)
		} else {
			return res.cc(results.slice((pageNum - 1) * pageSize), 0)
		}
	})
}

// 根据id删除文章的路由处理函数（pramas参数）:
exports.deleteArticle = (req, res) => {
	const sqlStr = 'delete from ev_articles where id=?'
	db.query(sqlStr, req.params.id, (err, results) => {
		if (err) return res.cc('删除文章失败！')
		if (results.affectedRows !== 1) return res.cc('删除文章失败！')
		if(results.affectedRows === 1) return res.cc('删除文章成功！', 0)
	})
}

// 根据id获取文章信息的路由处理函数（pramas参数）
exports.getArticle = (req, res) => {
	const sqlStr = 'select * from ev_articles where id=?'

	db.query(sqlStr, req.params.id, (err, results) => {
		if (err) return res.cc('获取文章信息失败！')
		if (results.length !== 1) return res.cc('获取文章信息失败！')
		
		res.send({
			status: 0,
			message: '获取文章信息成功！',
			data: results[0]
		})
	})
}

// 根据id更新文章信息的路由处理函数（请求体参数：id, title, cate_id, content, cover_img, state）：
exports.uptedateArticle = (req, res) => {
	const sqlStr = 'update ev_articles set ? where id=?'

	console.log(req.body, req.file)

	db.query(sqlStr, [{
		...req.body,
		cover_img: path.join(__dirname, '../uploads', req.file.filename)
	}, req.body.id], (err, results) => {
		if (err) return res.cc('更新文章信息失败！')
		if (results.changedRows !== 1) return res.cc('更新文章数据失败！')
		res.cc('文章信息修改成功！', 0)
	})
}