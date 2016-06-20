var libs = require('../../../libs/libs')
var errors = libs.errors;
var mongoose = require("mongoose");

function *signup(oridata) {
    libs.clog('注册登陆/'+__filename)
    var method = this.method;
    var User = mongoose.model('User')

    if (method === 'NODE'){
        libs.elog('NODE')
        var body = oridata.body;
        if (body){
            var initPass = '123456'
            if (body.username){
                try {
                    var user = yield User.userMatches(body.username)
                    console.log('======  $signup custom user ========');
                    if (!user.error) {
                        var uuu = new User({
                            "username": body.username,
                            "password": initPass
                        })
                        return yield createUser.call(this,uuu)
                    }else {
                        return errors['10003']
                    }
                } catch (err) {
                    return err;
                }
            }

            if (body.github){
                try{
                    var body = body.github
                    var user = yield User.userMatches(body.login)
                    //用户不存在
                    if (user === true) {
                        var uuu = new User({
                            id: body.id,
                            username: body.login,
                            password: initPass,
                            nickname: body.name,
                            avatar: body.avatar_url
                        })
                        return yield createUser.call(this,uuu)
                    }else {
                        return errors['10003']
                    }
                } catch (err){
                    console.log(err);
                }
            }
        }
    }
    if (method === 'GET') {
        libs.elog('GET')

    }
    if (method === 'POST') {
        libs.elog('POST')
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

        try {

            var user = yield User.userMatches(body.username, body.password)
            console.log('======  $signup user ========');
            if (!user.error) {
                var uuu = new User({
                    "username": body.username,
                    "password": body.password
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
    uuu.save();
    return uuu;
    // uuu.save(function(err) {
    //     if (err) throw err;
    // });
}

module.exports = {
    getData : signup
}
