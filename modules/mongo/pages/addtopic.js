var libs = require('../../../libs/libs')
var errors = libs.errors;
const mongoose = require("mongoose");

function *addtopic(oridata) {
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
            this.throw("The topic body is empty", 400);
        }

        try {
            if (body.cnt) {
                var marked = require('../../markdown')
                var parsedMd = yield marked(body.cnt,{mdcontent:{}})
                var ntopic = {
                    title: parsedMd.mdcontent.title,
                    content: body.cnt,
                    user: {
                        author_id: _user._id,
                        username: _user.username,
                        nickname: _user.nickname
                    }
                }

                var Topic = mongoose.model('Topic')

                var ttt = new Topic(ntopic)
                return yield addtopic.call(this, ttt)

            }

        } catch (err) {
            return err;
        }

        function *addtopic(ttt){
            var topic = yield ttt.save()
            return topic
        }

    }
}

module.exports = {
    getData : addtopic
}
