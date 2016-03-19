var libs = require('../../../libs/libs')
var errors = libs.errors;
const mongoose = require("mongoose");

function *signin(oridata) {
    libs.clog('注册登陆/'+__filename)
    var method = this.method;
    if (method === 'GET') {}
    if (method === 'POST') {

        if (this.session.$user) {
            return this.session.$user
        }
        else {
            return errors['10005'];
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
        if (!body.password) {
            this.throw("Missing password", 400);
        }

        var User = mongoose.model('User')

        try {
            var user = yield User.passwordMatches(body.username, body.password)
            console.log('======  $signin user/'+__filename+' ========');
            if (!user.error) {
                this.session.$user = user;
            }
            return user;

        } catch (err) {
            return err;
        }

    }
}

module.exports = {
    getData : signin
}
