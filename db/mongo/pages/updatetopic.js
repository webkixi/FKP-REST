var libs = require('../../../libs/libs')
var errors = libs.errors;
const mongoose = require("mongoose");

function *addtopic(oridata) {
    libs.clog('添加文章/'+__filename)
    var method = this.method;
    if (method === 'GET') {}
    if (method === 'POST') {
        var _user = false;

        if (this.session.$user) {
            _user = this.session.$user;
        }

        if (!_user) {
            return errors['10005'];
        }

        var body = yield libs.$parse(this);
        if (!body){
            return errors['20000']
        }

        if (!body.topic){
            return errors['20001']
        }

        try {
            if (body.topic) {
                console.log('============ $user');
                console.log('============ $user');
                console.log('============ $user');
                console.log('============ $user');
                console.log(_user);
                var marked = include('modules/markdown')
                var parsedMd = yield marked(body.cnt,{mdcontent:{}})
                var utopic = {
                    title: parsedMd.mdcontent.title,
                    content: body.cnt,
                    img: parsedMd.mdcontent.img
                }

                var Topic = mongoose.model('Topic')
                var upstat = yield Topic.updateTopicMatchesId(body.topic, {$set: utopic})
                return upstat

                // var ttt = new Topic(ntopic)
                // return yield _addtopic.call(this, ttt)

            }

        } catch (err) {
            return err;
        }

        function *_addtopic(ttt){
            var topic = yield ttt.save()
            return topic
        }

    }
}

module.exports = {
    getData : addtopic
}
