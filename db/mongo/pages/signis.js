var libs = require('../../../libs/libs')
var errors = libs.errors;
const mongoose = require("mongoose");

function *signis(oridata) {
    var User = mongoose.model('User')
    var method = this.method;
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
    }

    try {
        if (username){
            var user = yield User.hasUserMatches(body.username)
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
