/**
 * Module dependencies.
 */
var fs = require('fs')
var path = require('path')
var libs = require('../libs/libs')
var config = require('../config');
var wechat = require('co-wechat')
var api = require('../apis/javaapi');


var menu = require('./wx/menu')

function *returnJson( data ){
    var body;
    if( data ){
        body = data;
        if( typeof data === 'object' )
            body = JSON.stringify(data)

        this.body = body;
    }
    else
        this.body = '{"error": -1, "message":"route/返回data不合法"}'
}

function *github(){
    libs.clog('github')
    var github = config.auth.github;

    if (this.sess.argv) {
        if (this.sess.argv === 'test') {
            console.log('========== github auth test环境');
            github = config.test.auth.github
        }
    }

    var _this = this;

    var cat = this.params.cat
    var title = this.params.title;

    var client_id = github.clientID,
        scope = 'user',
        stat = 'agzgz',
        cb_url = github.callbackURL,
        secret = github.clientSecret,
        sesskey = github.userKey;

    if (title==='auth'){
        this.body = '<a href="https://github.com/login/oauth/authorize?scope='+scope+'&client_id='+client_id+'&state='+stat+'&redirect_uri='+cb_url+'">github</a>'
    }
    else {
        var query = this.local.query
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
            var github_token = ttt[1].access_token
            // github_token为如下内容
            // { access_token: '82b79fcd53b5532fd6fe91d8281edf80677ae4de',
            //   token_type: 'bearer',
            //   scope: '' }
            var github_user = yield api.req(this, 'https://api.github.com/user?access_token='+github_token,{method: 'post'})             
            console.log(github_user[1]);

            this.body = '很好'
            //https://api.github.com/user?access_token=xxx
        }
    }


}


module.exports = github
