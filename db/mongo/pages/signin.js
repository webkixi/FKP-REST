var libs = require('../../../libs/libs')
var errors = libs.errors;
var mongoose = require("mongoose");

function *signin(oridata) {
    libs.clog('注册登陆/'+__filename)
    var method = this.method;
    if (method === 'GET') {}
    if (method === 'POST') {

        if (this.session.$user) {
            return this.session.$user
        }
        else {
            var _rtn = errors['10005'];
            _rtn.dbconfig = process.env.dbconfig
            return _rtn;
        }

        var body = yield libs.$parse(this);
        if (!body) {
            this.throw("The body is empty", 400);
        }
        if (!body.username) {
            // this.throw("Missing username", 400);
            if (body.test){
                var _rtn = errors['10005'];
                _rtn.dbconfig = process.env.dbconfig
                return _rtn;
            }
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
