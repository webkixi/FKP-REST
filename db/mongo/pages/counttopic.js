// var libs = require('../../../libs/libs')
var errors = require('libs/errors')
var libs = require('libs/libs');
var mongoose = require("mongoose");
var errors = libs.errors;

function *cTopic(oridata) {
    libs.clog('文章计数++/'+__filename)
    var me = this,
        location = this.local,
        _user = false;

    if (this.session.$user) {
        _user = this.session.$user;
    }

    var method = this.method;
    if (method === 'NODE'){
        if (location.query.topic){
            return yield countTopic(location.query.topic)
        }
    }

    if (method === 'GET') {
        if (location.query.topic){
            return yield countTopic(location.query.topic)
        }
    }

    if (method === 'POST') {
        var ttt = false;
        var body = yield libs.$parse(this);
        if (body) {
            if (body.topic) {
                ttt = body.topic;
            }
        }
        return yield countTopic(ttt)
    }

    function *countTopic(ttt){
        if (!ttt){
            return errors['20001']
        }
        try {
            var Topic = mongoose.model('Topic')
            var topics = yield Topic.topicCount(ttt);
            if (topics.error){
                return topics
            }
            else{
                return errors['10000'];
            }

        } catch (err) {
            return err;
        }
    }
}

module.exports = {
    getData : cTopic
}
