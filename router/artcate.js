// 文章类别的路由模块：
const express = require('express')
const artcate_handler = require('../router_handler/artcate')
const expressJoi = require('@escook/express-joi')
const {
	add_artcate_schema,
	del_artcate_schema,
	get_artcateinfo_schema,
	update_artcateinfo_schema
} = require('../schema/article')

const router = express.Router()

// 获取文章分类信息的路由：
router.get('/cates', artcate_handler.getArticleCates)

// 新增文章分类的路由：
router.post('/addcates', expressJoi(add_artcate_schema), artcate_handler.addArticleCate)

// 删除文章分类路由：
router.get('/deletecate/:Id', expressJoi(del_artcate_schema), artcate_handler.delArticleCate)

// 获取某文章类别信息的路由：
router.get('/cates/:Id', expressJoi(get_artcateinfo_schema), artcate_handler.getArticleCateInfo)

// 修改某文章类别信息的路由：
router.post('/updatecate', expressJoi(update_artcateinfo_schema), artcate_handler.updateArticleCateInfo)


module.exports = router