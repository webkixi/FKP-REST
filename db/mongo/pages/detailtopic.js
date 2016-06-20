// var libs = require('../../../libs/libs')
var errors = require('libs/errors')
var libs = require('libs/libs');
var mongoose = require("mongoose");
var errors = libs.errors;

function *detailTopic(oridata) {
    libs.clog('文章详情/'+__filename)
    var location = this.local;
    var _user = this.session.$user;


    var method = this.method;
    if (method === 'NODE'){

        //处理get数据
        if (location.query.topic){
            return yield getDtail.call(this, location.query.topic)
        }

        //处理post数据
        else{
            var body = yield libs.$parse(this);
            if (body && body.topic){
                return yield getDtail.call(this, body.topic)
            }
        }
    }

    if (method === 'GET') {
        if (location.query.topic){
            return yield getDtail.call(this, location.query.topic)
        }
    }

    if (method === 'POST') {
        var ttt = false;
        var body = yield libs.$parse(this);
        if (body) {
            if (body.topic) {
                ttt = body.topic;
            }
            //编辑该文章
            if (body.auth){
                if (!_user){
                    return errors['10005'];
                }
                var auth_topic = yield getDtail(ttt, _user)
                var _auth = auth_topic[0],
                    _topic = auth_topic[1];

                if (!_auth)
                    return errors['20003']

                if (_topic.error)
                    return _topic
                else
                    return [_topic];
            }
        }
        return yield getDtail(ttt)
    }

    function *getDtail(ttt, user){
        if (!ttt){
            return errors['20001']
        }
        try {
            var Topic = mongoose.model('Topic')
            var topics = yield Topic.topicMatchesId(ttt);
            if (user){
                var stat = yield topics.userMatches(user)
                return [stat, topics]
            }
            if (topics.error){
                return topics
            }
            else{
                return [topics];
            }
        } catch (err) {
            return err;
        }
    }
}

module.exports = {
    getData : detailTopic
}
