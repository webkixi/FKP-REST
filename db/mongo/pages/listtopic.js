// var libs = require('../../../libs/libs')
var libs = include('libs/libs');
const mongoose = require("mongoose");

function *listtopic(oridata) {
    var errors = libs.errors;
    var method = this.method;

    if (method === 'NODE'){
        return yield getList()
    }

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
