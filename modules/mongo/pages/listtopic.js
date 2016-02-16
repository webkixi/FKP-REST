var libs = require('../../../libs/libs')
var errors = libs.errors;
const mongoose = require("mongoose");

function *addtopic(oridata) {
    var method = this.method;
    if (method === 'GET') {}
    if (method === 'POST') {
        var uname = false;

        var body = yield libs.$parse(this);

        if (body) {
            if (body.uname) {
                uname = body.uname;
            }
        }

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
    getData : addtopic
}
