var libs = require('../../../libs/libs')
var errors = libs.errors;
var mongoose = require("mongoose");

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
                var marked = require('modules/markdown')
                var parsedMd = yield marked(body.cnt,{mdcontent:{}})
                var _tags = parsedMd.mdcontent.tags||parsedMd.mdcontent.tag;

                if (!parsedMd.mdcontent.title){
                    return errors['10006'];
                }

                if (!parsedMd.mdcontent.desc){
                    return errors['10006'];
                }

                if (_tags.indexOf(',')>0){
                    _tags = _tags.split(',')
                }
                else {
                    _tags = [_tags]
                }
                var utopic = {
                    title: parsedMd.mdcontent.title,
                    content: body.cnt,
                    img: parsedMd.mdcontent.img,
                    cats: parsedMd.mdcontent.cats,
                    tags: _tags
                }

                var Topic = mongoose.model('Topic')
                var upstat = yield Topic.updateTopicMatchesId(body.topic, {$set: utopic}, _user)
                if (upstat.error){
                    return upstat
                }
                else{
                    return errors['10000'];
                }

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
