// var libs = require('../../../libs/libs')
var errors = include('libs/errors')
var libs = include('libs/libs');
const mongoose = require("mongoose");

function *detailTopic(oridata) {
    console.log('========= detailTopic/'+__filename+' ==========\n\n');

    var errors = libs.errors;
    var location = this.local;

    var method = this.method;
    if (method === 'NODE'){
        if (location.query.topic){
            return yield getDtail(location.query.topic)
        }
    }
    
    if (method === 'GET') {
        if (location.query.topic){
            return yield getDtail(location.query.topic)
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
        return yield getDtail(ttt)
    }

    function *getDtail(ttt){
        if (!ttt){
            return errors['20001']
        }
        try {
            var Topic = mongoose.model('Topic')
            var topics = yield Topic.topicMatchesId(ttt);
            if (topics.error){
                this.redirect = '/404'
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
