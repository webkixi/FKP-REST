/**
 * Module dependencies.
 */
var fs = require('fs')
var path = require('path')
var libs = require('../libs/libs')
var api = require('../apis/javaapi');


function *github(){
    libs.clog('github第三方登陆： '+__filename)
    var github = fkpConfig.auth.github;
    var jump_url = fkpConfig.auth.github.successUrl
    var query = this.local.query

    var _this = this;

    var cat = this.params.cat
    var title = this.params.title;

    var client_id = github.clientID,
        scope = 'user',
        stat = 'agzgz',
        cb_url = github.callbackURL,
        secret = github.clientSecret,
        sesskey = github.userKey;

    if (title ==='sign' && !this.session.$user){
        this.redirect("https://github.com/login?return_to=/login/oauth/authorize?client_id="+client_id+"&redirect_uri="+cb_url+"&response_type=code")
    }
    else {

        if (this.session.$user){
            this.redirect(jump_url)
        }

        if (query.code){
            var code = query.code;
            var postdata = {
                client_id: client_id,
                client_secret: secret,
                code: code,
                redirect_uri: cb_url,
                method : 'post'
            }
            var ttt = yield api.req(this, 'https://github.com/login/oauth/access_token', postdata)
            var github_token = ttt[1].access_token;

            // github_token为如下内容
            // { access_token: '82b79fcd53b5532fd6fe91d8281edf80677ae4de',
            //   token_type: 'bearer',
            //   scope: '' }

            var userpost = {
                method: 'get',
                headers: github.headers,
                "access_token": github_token
            };

            var github_user = yield api.req(this, 'https://api.github.com/user', userpost);
            var g_user = JSON.parse(github_user[1]);


            var hasUser = yield api.req(this, '$signis', {username: g_user.login})
            if (hasUser){
                // this.session[sesskey] = hasUser
                libs.elog('session user info')
                console.log(this.session.$user);
                this.redirect(jump_url)
            }
            else{
              libs.elog('write user info into db')
                var signupUser = yield api.req(this, '$signup', {github: g_user})
                console.log('========== github.js 74 line');
                this.session.$user = signupUser;
                this.redirect(jump_url)
            }
        }
    }


}


module.exports = github
