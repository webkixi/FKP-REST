var libs = require('../../../libs/libs')
var errors = libs.errors;
const mongoose = require("mongoose");

function *signup(oridata) {
    var method = this.method;
    if (method === 'GET') {}
    if (method === 'POST') {
        var body = yield libs.$parse(this);
        if (!body) {
            this.throw("The body is empty", 400);
        }
        if (!body.username) {
            this.throw("Missing username", 400);
        }
        if (!body.password) {
            this.throw("Missing password", 400);
        }
        if (!body.repass) {
            this.throw("Missing repassword", 400);
        }
        if (body.password!==body.repass) {
            return errors['10004']
        }

        var User = mongoose.model('User')

        try {

            var user = yield User.userMatches(body.username, body.password)
            console.log('======  $signup user ========');
            if (!user.error) {
                uuu = new User({
                    username: body.username,
                    password: body.password
                })
                return yield createUser.call(this,uuu)
            }else {
                return errors['10003']
            }

        } catch (err) {
            return err;
        }
    }
}

function *createUser(uuu){
    // save user to database
    var user = yield uuu.save();
    this.session.$user = user;
    return user;
    // uuu.save(function(err) {
    //     if (err) throw err;
    // });
}

module.exports = {
    getData : signup
}
