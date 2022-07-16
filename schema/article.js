// 定义文章信息验证规则：

const joi = require('@hapi/joi')

// 定义获取文章类别验证规则：
const name = joi.string().required()
const alias = joi.string().alphanum().required()

// 定义删除文章类别、获取某文章类别信息的验证规则：
const Id = joi.number().integer().min(1).required()

// 定义文章的验证规则：
const cate_id = joi.number().integer().min(1).required()
const title = joi.string().required()
const content = joi.string().allow('').required()
const state = joi.string().valid('已发布', '草稿').required()

const pagenum = joi.number().min(1).required()
const pagesize = joi.number().min(1).required()

const id = joi.number().min(1).required()


// 新增文章类别的验证规则对象：
exports.add_artcate_schema = {
	body: {
		name,
		alias
	}
}

// 删除文章类别的验证规则对象：
exports.del_artcate_schema = {
	params: {
		Id
	}
}

// 获取某文章类别信息的验证规则对象：
exports.get_artcateinfo_schema = {
	params: {
		Id
	}
}

// 更新某文章类别信息的验证规则对象：
exports.update_artcateinfo_schema = {
	body: {
		Id,
		name,
		alias
	}
}

// 发布文章的验证规则对象：
exports.add_article_schema = {
	body: {
		cate_id,
		title,
		content,
		state
	}
}

// 获取文章的验证规则对象:
exports.get_articles_schema = {
	query: {
		cate_id,
		state,
		pagenum,
		pagesize
	}
}

// 删除文章的验证规则对象: 
exports.delete_article_schema = {
	params: {
		id
	}
}

// 获取文章信息的验证规则对象: 
exports.get_article_info_schema = {
	params: {
		id
	}
}

// 更新文章信息的验证规则对象：
exports.update_article_info_schema = {
	body: {
		id,
		cate_id,
		title,
		content,
		state
	}
}