var libs = require('../../../libs/libs')
var errors = libs.errors;
var mongoose = require("mongoose");

function *signis(oridata) {
    libs.clog('是否登陆/'+__filename)
    var User = mongoose.model('User')
    var method = this.method;
    var omethod = this.omethod;
    var username = '';

    if (method === 'NODE'){ //‘node’在javascript中定义
        var body = oridata.body
        if (oridata.body){
            username = body.username
        }
    }

    if (method === 'GET') {}

    if (method === 'POST') {

        if (this.session.$user) {
            return this.session.$user
        }

        var body = yield libs.$parse(this);
        if (!body) {
            this.throw("The body is empty", 400);
        }
        if (!body.username) {
            // this.throw("Missing username", 400);
            if (body.test)
                return errors['10005'];
        }
        else{
            username = body.username
        }
    }

    try {
        if (username){
            var user = yield User.hasUserMatches(username)
            this.session.$user = user;
            return user
        }

    } catch (err) {
        return err;
    }
}

module.exports = {
    getData : signis
}
