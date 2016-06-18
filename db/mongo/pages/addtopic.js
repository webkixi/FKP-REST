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
            this.throw("The topic body is empty", 400);
        }

        try {
            if (body.cnt) {
                var marked = include('modules/markdown')
                var parsedMd = yield marked(body.cnt,{mdcontent:{}})
                var _tags = parsedMd.mdcontent.tags||parsedMd.mdcontent.tag;
                if (typeof _tags === 'string'){
                    if (_tags.indexOf(',')>0){
                        _tags = _tags.split(',')
                    }
                    else {
                        _tags = [_tags]
                    }
                }
                _tags = _.map(_tags, _.trim);
                var ntopic = {
                    title: parsedMd.mdcontent.title,
                    content: body.cnt,
                    img: parsedMd.mdcontent.img,
                    cats: parsedMd.mdcontent.cats,
                    tags: _tags,
                    user: {
                        id: _user.id,
                        author_id: _user._id,
                        username: _user.username,
                        nickname: _user.nickname,
                        avatar: _user.avatar
                    }
                }

                var Topic = mongoose.model('Topic')

                var ttt = new Topic(ntopic)
                // wspush('article_count', '我是node传来的内容')
                return yield _addtopic.call(this, ttt)

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
