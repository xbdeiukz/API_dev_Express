# 说明

1. 本项目开发时使用的 node 版本为 12.16.1；

2. 项目的请求根路径为 `http://localhost:5678`

3. 以 `/api` 开头的请求路径，不需要访问权限

4. 以 `/my` 开头的请求路径，需要在请求头中携带 `Authorization` 身份认证字段，才能正常访问成功

# 注册登录

## 注册

**简要描述：**

- 用户注册接口

**请求URL：**

- `/api/reguser`

**请求方式：**

- POST

**请求体：**

| 参数名      | 必选  | 类型     | 说明  |
| -------- | --- | ------ | --- |
| username | 是   | string | 用户名 |
| password | 是   | string | 密码  |

**返回示例**

```
复制{
  "status": 0,
  "message": "注册成功！"
}
```

**返回参数说明**

| 参数名     | 类型     | 说明               |
| ------- | ------ | ---------------- |
| status  | int    | 请求是否成功，0：成功；1：失败 |
| message | string | 请求结果的描述消息        |

## 登录

**简要描述：**

- 用户登录接口

**请求URL：**

- `/api/login`

**请求方式：**

- POST

**请求体：**

| 参数名      | 必选  | 类型     | 说明  |
| -------- | --- | ------ | --- |
| username | 是   | string | 用户名 |
| password | 是   | string | 密码  |

**返回示例**

```
复制{
  "status": 0,
  "message": "登录成功！",
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiLms6Xlt7Tlt7QiLCJlbWFpbCI6Im5pYmFiYUBpdGNhc3QuY24iLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTU3ODAzNjY4MiwiZXhwIjoxNTc4MDcyNjgyfQ.Mwq7GqCxJPK-EA8LNrtMG04llKdZ33S9KBL3XeuBxuI"
}
```

**返回参数说明**

| 参数名     | 类型     | 说明               |
| ------- | ------ | ---------------- |
| status  | int    | 请求是否成功，0：成功；1：失败 |
| message | string | 请求结果的描述消息        |
| token   | string | 用于有权限接口的身份认证     |

# 个人中心

## 获取用户基本信息

**简要描述：**

- 获取用户的基本信息

**请求URL：**

- `/my/userinfo`

**请求方式：**

- GET

**Header：**

```
复制Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiLms6Xlt7Tlt7QiLCJlbWFpbCI6Im5pYmFiYUBpdGNhc3QuY24iLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTU3ODAzNjY4MiwiZXhwIjoxNTc4MDcyNjgyfQ.Mwq7GqCxJPK-EA8LNrtMG04llKdZ33S9KBL3XeuBxuI
```

**参数：**

- 无

**返回示例**

```
复制{
  "status": 0,
  "message": "获取用户基本信息成功！",
  "data": {
    "id": 1,
    "username": "admin",
    "nickname": "管理员",
    "email": "admin@itcast.cn",
    "user_pic": "data:image/png;base64,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"
  }
}
```

**返回参数说明**

| 参数名          | 类型     | 说明               |
| ------------ | ------ | ---------------- |
| status       | int    | 请求是否成功，0：成功；1：失败 |
| message      | string | 请求结果的描述消息        |
| data         | object | 用户的基本信息          |
| \+ id        | int    | 用户的 id           |
| \+ username  | string | 用户名              |
| \+ nickname  | string | 昵称               |
| \+ email     | string | 邮箱               |
| \+ user\_pic | string | 头像，base64格式的图片   |

## 更新用户基本信息

**简要描述：**

- 更新用户的基本信息

**请求URL：**

- `/my/userinfo`

**请求方式：**

- POST

**Header：**

```
复制Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiLms6Xlt7Tlt7QiLCJlbWFpbCI6Im5pYmFiYUBpdGNhc3QuY24iLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTU3ODAzNjY4MiwiZXhwIjoxNTc4MDcyNjgyfQ.Mwq7GqCxJPK-EA8LNrtMG04llKdZ33S9KBL3XeuBxuI
```

**请求体：**

| 参数名      | 必选  | 类型     | 说明   |
| -------- | --- | ------ | ---- |
| id       | 是   | number | 用户id |
| nickname | 是   | string | 昵称   |
| email    | 是   | string | 邮箱   |

**返回示例**

```
复制{
  "status": 0,
  "message": "修改用户信息成功！"
}
```

**返回参数说明**

| 参数名     | 类型     | 说明               |
| ------- | ------ | ---------------- |
| status  | int    | 请求是否成功，0：成功；1：失败 |
| message | string | 请求结果的描述消息        |

## 修改密码

**简要描述：**

- 重置密码

**请求URL：**

- `/my/updatepwd`

**请求方式：**

- POST

**Header：**

```
复制Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiLms6Xlt7Tlt7QiLCJlbWFpbCI6Im5pYmFiYUBpdGNhc3QuY24iLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTU3ODAzNjY4MiwiZXhwIjoxNTc4MDcyNjgyfQ.Mwq7GqCxJPK-EA8LNrtMG04llKdZ33S9KBL3XeuBxuI
```

**请求体：**

| 参数名    | 必选  | 类型     | 说明  |
| ------ | --- | ------ | --- |
| oldPwd | 是   | string | 原密码 |
| newPwd | 是   | string | 新密码 |

**返回示例**

```
复制{
  "status": 0,
  "message": "更新密码成功！"
}
```

**返回参数说明**

| 参数名     | 类型     | 说明               |
| ------- | ------ | ---------------- |
| status  | int    | 请求是否成功，0：成功；1：失败 |
| message | string | 请求结果的描述消息        |

## 改换头像

**简要描述：**

- 更换头像

**请求URL：**

- `/my/update/avatar`

**请求方式：**

- POST

**Header：**

```
复制Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiLms6Xlt7Tlt7QiLCJlbWFpbCI6Im5pYmFiYUBpdGNhc3QuY24iLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTU3ODAzNjY4MiwiZXhwIjoxNTc4MDcyNjgyfQ.Mwq7GqCxJPK-EA8LNrtMG04llKdZ33S9KBL3XeuBxuI
```

**请求体：**

| 参数名    | 必选  | 类型     | 说明               |
| ------ | --- | ------ | ---------------- |
| avatar | 是   | string | 新头像，base64格式的字符串 |

**返回示例**

```
复制{
  "status": 0,
  "message": "更新头像成功！"
}
```

**返回参数说明**

| 参数名     | 类型     | 说明               |
| ------- | ------ | ---------------- |
| status  | int    | 请求是否成功，0：成功；1：失败 |
| message | string | 请求结果的描述消息        |

# 文章类别管理

## 获取文章类别列表

**简要描述：**

- 获取文章分类列表

**请求URL：**

- `/my/article/cates`

**请求方式：**

- GET

**Header：**

```
复制Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiLms6Xlt7Tlt7QiLCJlbWFpbCI6Im5pYmFiYUBpdGNhc3QuY24iLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTU3ODAzNjY4MiwiZXhwIjoxNTc4MDcyNjgyfQ.Mwq7GqCxJPK-EA8LNrtMG04llKdZ33S9KBL3XeuBxuI
```

**参数：**

- 无

**返回示例**

```
复制{
  "status": 0,
  "message": "获取文章分类列表成功！",
  "data": [
    {
      "Id": 1,
      "name": "最新",
      "alias": "ZuiXin",
      "is_delete": 0
    },
    {
      "Id": 2,
      "name": "科技",
      "alias": "KeJi",
      "is_delete": 0
    },
    {
      "Id": 3,
      "name": "股市",
      "alias": "GuShi",
      "is_delete": 0
    },
    {
      "Id": 4,
      "name": "历史",
      "alias": "LiShi",
      "is_delete": 0
    },
    {
      "Id": 5,
      "name": "情感",
      "alias": "QingGan",
      "is_delete": 0
    }
  ]
}
```

**返回参数说明**

| 参数名           | 类型     | 说明                |
| ------------- | ------ | ----------------- |
| status        | int    | 请求是否成功，0：成功；1：失败  |
| message       | string | 请求结果的描述消息         |
| data          | array  | 文章分类的数组           |
| \+ Id         | int    | 分类 Id             |
| \+ name       | string | 分类名称              |
| \+ alias      | string | 分类别名              |
| \+ is\_delete | int    | 是否被删除，0：未删除；1：已删除 |

## 新增文章分类

**简要描述：**

- 新增文章分类

**请求URL：**

- `/my/article/addcates`

**请求方式：**

- POST

**Header：**

```
复制Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiLms6Xlt7Tlt7QiLCJlbWFpbCI6Im5pYmFiYUBpdGNhc3QuY24iLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTU3ODAzNjY4MiwiZXhwIjoxNTc4MDcyNjgyfQ.Mwq7GqCxJPK-EA8LNrtMG04llKdZ33S9KBL3XeuBxuI
```

**请求体：**

| 参数名   | 必选  | 类型     | 说明   |
| ----- | --- | ------ | ---- |
| name  | 是   | string | 分类名称 |
| alias | 是   | string | 分类别名 |

**返回示例**

```
复制{
  "status": 0,
  "message": "新增文章分类成功！"
}
```

**返回参数说明**

| 参数名     | 类型     | 说明               |
| ------- | ------ | ---------------- |
| status  | int    | 请求是否成功，0：成功；1：失败 |
| message | string | 请求结果的描述消息        |

## 根据ID删除文章分类

**简要描述：**

- 根据 Id 删除文章分类

**请求URL：**

- `/my/article/deletecate/:id`

**请求方式：**

- GET

**Header：**

```
复制Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiLms6Xlt7Tlt7QiLCJlbWFpbCI6Im5pYmFiYUBpdGNhc3QuY24iLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTU3ODAzNjY4MiwiZXhwIjoxNTc4MDcyNjgyfQ.Mwq7GqCxJPK-EA8LNrtMG04llKdZ33S9KBL3XeuBxuI
```

**URL 参数：**

| 参数名 | 必选  | 类型     | 说明                     |
| --- | --- | ------ | ---------------------- |
| id  | 是   | string | 要删除的分类 Id，注意：这是一个URL参数 |

**返回示例**

```
复制{
  "status": 0,
  "message": "删除文章分类成功！"
}
```

**返回参数说明**

| 参数名     | 类型     | 说明               |
| ------- | ------ | ---------------- |
| status  | int    | 请求是否成功，0：成功；1：失败 |
| message | string | 请求结果的描述消息        |

**备注**

- API 接口不允许删除 `最新` 和 `科技` 这两个文章分类!

## 根据ID获取文章分类数据

**简要描述：**

- 根据 Id 获取文章分类数据

**请求URL：**

- `/my/article/cates/:id`

**请求方式：**

- GET

**Header：**

```
复制Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiLms6Xlt7Tlt7QiLCJlbWFpbCI6Im5pYmFiYUBpdGNhc3QuY24iLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTU3ODAzNjY4MiwiZXhwIjoxNTc4MDcyNjgyfQ.Mwq7GqCxJPK-EA8LNrtMG04llKdZ33S9KBL3XeuBxuI
```

**URL 参数：**

| 参数名 | 必选  | 类型     | 说明                  |
| --- | --- | ------ | ------------------- |
| id  | 是   | string | 分类的 Id，注意：这是一个URL参数 |

**返回示例**

```
复制{
  "status": 0,
  "message": "获取文章分类数据成功！",
  "data": {
    "Id": 1,
    "name": "最新",
    "alias": "ZuiXin",
    "is_delete": 0
  }
}
```

**返回参数说明**

| 参数名        | 类型     | 说明               |
| ---------- | ------ | ---------------- |
| status     | int    | 请求是否成功，0：成功；1：失败 |
| message    | string | 请求结果的描述消息        |
| data       | object | 文章分类的信息对象        |
| Id         | int    | 分类 Id            |
| name       | string | 分类名称             |
| alias      | string | 分类别名             |
| is\_delete | int    | 是否被删除，0：未删除；1：删除 |

## 根据ID更新文章分类数据

**简要描述：**

- 根据 Id 更新文章分类数据

**请求URL：**

- `/my/article/updatecate`

**请求方式：**

- POST

**Header：**

```
复制Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiLms6Xlt7Tlt7QiLCJlbWFpbCI6Im5pYmFiYUBpdGNhc3QuY24iLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTU3ODAzNjY4MiwiZXhwIjoxNTc4MDcyNjgyfQ.Mwq7GqCxJPK-EA8LNrtMG04llKdZ33S9KBL3XeuBxuI
```

**请求体：**

| 参数名   | 必选  | 类型     | 说明    |
| ----- | --- | ------ | ----- |
| Id    | 是   | int    | 分类 Id |
| name  | 是   | string | 分类名称  |
| alias | 是   | string | 分类别名  |

**返回示例**

```
复制{
  "status": 0,
  "message": "更新分类信息成功！"
}
```

**返回参数说明**

| 参数名     | 类型     | 说明               |
| ------- | ------ | ---------------- |
| status  | int    | 请求是否成功，0：成功；1：失败 |
| message | string | 请求结果的描述消息        |

# 文章管理

## 发布新文章

**简要描述：**

- 发布新文章

**请求URL：**

- `/my/article/add`

**请求方式：**

- POST

**请求体（FormData 格式）：**

| 参数名        | 必选  | 类型      | 说明             |
| ---------- | --- | ------- | -------------- |
| title      | 是   | string  | 文章标题           |
| cate\_id   | 是   | int     | 所属分类 Id        |
| content    | 是   | string  | 文章内容           |
| cover\_img | 是   | blob二进制 | 文章封面           |
| state      | 是   | string  | 状态，可选值为：已发布、草稿 |

**返回示例**

```
复制{
    status: 0,
    message: '发布文章成功！'
}
```

**返回参数说明**

| 参数名     | 类型     | 说明               |
| ------- | ------ | ---------------- |
| status  | int    | 请求是否成功，0：成功；1：失败 |
| message | string | 请求结果的描述消息        |

**备注**

- 由于此接口涉及到文件上传的功能，因此提交的请求体，必须是 `FormData` 格式！

## 获取文章的列表数据

**简要描述：**

- 获取文章的列表数据

**请求URL：**

- `/my/article/list`

**请求方式：**

- GET

**Header：**

```
复制Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiLms6Xlt7Tlt7QiLCJlbWFpbCI6Im5pYmFiYUBpdGNhc3QuY24iLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTU3ODAzNjY4MiwiZXhwIjoxNTc4MDcyNjgyfQ.Mwq7GqCxJPK-EA8LNrtMG04llKdZ33S9KBL3XeuBxuI
```

**参数：**

| 参数名      | 必选  | 类型     | 说明                |
| -------- | --- | ------ | ----------------- |
| pagenum  | 是   | int    | 页码值               |
| pagesize | 是   | int    | 每页显示多少条数据         |
| cate\_id | 否   | string | 文章分类的 Id          |
| state    | 否   | string | 文章的状态，可选值有：已发布、草稿 |

**返回示例**

```
复制{
  "status": 0,
  "message": "获取文章列表成功！",
  "data": [
    {
      "Id": 1,
      "title": "abab",
      "pub_date": "2020-01-03 12:19:57.690",
      "state": "已发布",
      "cate_name": "最新"
    },
    {
      "Id": 2,
      "title": "666",
      "pub_date": "2020-01-03 12:20:19.817",
      "state": "已发布",
      "cate_name": "股市"
    }
  ],
  "total": 5
}
```

**返回参数说明**

| 参数名           | 类型     | 说明               |
| ------------- | ------ | ---------------- |
| status        | int    | 请求是否成功，0：成功；1：失败 |
| message       | string | 请求结果的描述消息        |
| data          | array  | 文章的数组            |
| \+ Id         | int    | 文章 Id            |
| \+ title      | string | 标题               |
| \+ pub\_date  | string | 发表时间             |
| \+ state      | string | 状态               |
| \+ cate\_name | string | 所属分类名称           |

## 根据ID删除文章数据

**简要描述：**

- 根据 Id 删除文章数据

**请求URL：**

- `/my/article/delete/:id`

**请求方式：**

- GET

**Header：**

```
复制Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiLms6Xlt7Tlt7QiLCJlbWFpbCI6Im5pYmFiYUBpdGNhc3QuY24iLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTU3ODAzNjY4MiwiZXhwIjoxNTc4MDcyNjgyfQ.Mwq7GqCxJPK-EA8LNrtMG04llKdZ33S9KBL3XeuBxuI
```

**URL 参数：**

| 参数名 | 必选  | 类型     | 说明                     |
| --- | --- | ------ | ---------------------- |
| id  | 是   | string | 要删除的文章 Id，注意：这是一个URL参数 |

**返回示例**

```
复制{
  "status": 0,
  "message": "删除成功！"
}
```

**返回参数说明**

| 参数名     | 类型     | 说明               |
| ------- | ------ | ---------------- |
| status  | int    | 请求是否成功，0：成功；1：失败 |
| message | string | 请求结果的描述消息        |

## 根据ID获取文章详情

**简要描述：**

- 根据 Id 获取文章详情

**请求URL：**

- `/my/article/:id`

**请求方式：**

- GET

**Header：**

```
复制Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiLms6Xlt7Tlt7QiLCJlbWFpbCI6Im5pYmFiYUBpdGNhc3QuY24iLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTU3ODAzNjY4MiwiZXhwIjoxNTc4MDcyNjgyfQ.Mwq7GqCxJPK-EA8LNrtMG04llKdZ33S9KBL3XeuBxuI
```

**URL 参数：**

| 参数名 | 必选  | 类型     | 说明                  |
| --- | --- | ------ | ------------------- |
| id  | 是   | string | 文章的 Id，注意：这是一个URL参数 |

**返回示例**

```
复制{
  "status": 0,
  "message": "获取文章成功！",
  "data": {
    "Id": 4,
    "title": "新地球",
    "content": "<p><span style=\"color: #0000ff;\"><em><strong>新地球，人们很骄傲</strong></em></span></p>",
    "cover_img": "\\uploads\\upload_1cbcb854da97eb04d808cddb40dd3954",
    "pub_date": "2020-01-03 12:23:01.903",
    "state": "草稿",
    "is_delete": 0,
    "cate_id": 2,
    "author_id": 1
  }
}
```

**返回参数说明**

| 参数名           | 类型     | 说明               |
| ------------- | ------ | ---------------- |
| status        | int    | 请求是否成功，0：成功；1：失败 |
| message       | string | 请求结果的描述消息        |
| data          | object | 文章的详情            |
| \+ Id         | int    | 文章 Id            |
| \+ title      | string | 标题               |
| \+ content    | string | 内容               |
| \+ cover\_img | string | 封面的URL地址         |
| \+ pub\_date  | string | 发表时间             |
| \+ state      | string | 状态               |
| \+ is\_delete | int    | 是否被删除            |
| \+ cate\_id   | int    | 所属分类 Id          |
| \+ author\_id | int    | 所属作者 Id          |

## 根据ID更新文章信息

**简要描述：**

- 根据 Id 更新文章信息

**请求URL：**

- `/my/article/edit`

**请求方式：**

- POST

**请求体（FormData 格式）：**

| 参数名        | 必选  | 类型      | 说明             |
| ---------- | --- | ------- | -------------- |
| Id         | 是   | int     | 文章 Id          |
| title      | 是   | string  | 文章标题           |
| cate\_id   | 是   | int     | 所属分类 Id        |
| content    | 是   | string  | 文章内容           |
| cover\_img | 是   | blob二进制 | 文章封面           |
| state      | 是   | string  | 状态，可选值为：已发布、草稿 |

**返回示例**

```
复制{
    status: 0,
    message: '修改文章成功！'
}
```

**返回参数说明**

| 参数名     | 类型     | 说明               |
| ------- | ------ | ---------------- |
| status  | int    | 请求是否成功，0：成功；1：失败 |
| message | string | 请求结果的描述消息        |

**备注**

- 由于此接口涉及到文件上传的功能，因此提交的请求体，必须是 `FormData` 格式！