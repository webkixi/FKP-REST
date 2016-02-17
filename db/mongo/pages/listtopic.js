// var libs = require('../../../libs/libs')
const mongoose = require("mongoose");

function *listtopic(oridata) {
    var libs = this.include('libs/libs');
    var errors = libs.errors;

    var method = this.method;
    if (method === 'GET') {
        return yield getList()
    }

    if (method === 'POST') {
        var uname = false;
        var body = yield libs.$parse(this);
        if (body) {
            if (body.uname) {
                uname = body.uname;
            }
        }
        return yield getList()

    }

    function *getList(){
        try {
            var Topic = mongoose.model('Topic')
            var topics = yield Topic.topicList();
            return topics;

        } catch (err) {
            return err;
        }
    }
}

module.exports = {
    getData : listtopic
}
