const express = require('express')
const article_handler = require('../router_handler/article')
const multer = require('multer')
const path = require('path')
const expressJoi = require('@escook/express-joi')
const {
	add_article_schema,
	get_articles_schema,
	delete_article_schema,
	get_article_info_schema,
	update_article_info_schema
} = require('../schema/article')

const router = express.Router()

const upload = multer({
	dest: path.join(__dirname, '../uploads')	// 指定上传文件的存放路径；
})

// 发布文章路由:
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle)	// expressJoi() 中间件尽量放靠后位置，否则可能验证不成功

// 获取特定页码文章的路由:
router.get('/list', expressJoi(get_articles_schema), article_handler.getArticles)

// 根据id删除文章的路由:
router.get('/delete/:id', expressJoi(delete_article_schema), article_handler.deleteArticle)

// 根据id获取文章详情的路由:
router.get('/:id', expressJoi(get_article_info_schema), article_handler.getArticle)

// 根据id更新文章信息的路由:
router.post('/edit',  upload.single('cover_img'), expressJoi(update_article_info_schema), article_handler.uptedateArticle)

module.exports = router