module.exports = {
    '10000': {success: '10000', message: "ok"},

    // models/user.js
    "10001": {error: "10001", message: "user not found"},
    "10002": {error: "10002", message: "password dose not match"},
    "10003": {error: "10003", message: "该用户名已被注册"},
    "10004": {error: "10004", message: "两次密码不匹配"},
    "10005": {error: "10005", message: "本站使用github第三方登陆，请先登录"},

    // models/topic
    "20000": {error: "20000", message: "修改文章参数不正确"},
    "20001": {error: "20001", message: "请指定文章id"},
    "20002": {error: "20002", message: "没有找到该文章，请确认文章id"},
    "20003": {error: "20003", message: "只能删除/修改自己的文章"},
    "20004": {error: "20004", message: "文章不存在"},
}
