// var libs = require('../../../libs/libs')
var libs = require('libs/libs');
var mongoose = require("mongoose");
var config = require('db/config')

function getPages(page){
    let ps = config.mongo.pageSize
    let end = ps * page;
    let start = end - ps;
    return [start, end]
}

function *listtopic(oridata) {
    libs.clog('文章列表/'+__filename)

    var errors = libs.errors;
    var method = this.method;
    var location = this.local;
    var omethod;

    omethod = this.omethod;

    if (method === 'NODE'){

        if (omethod === 'GET'){
            //处理get数据
            if (location.query.page){
                let page = location.query.page;
                var start_end = getPages(page)
                return yield getList(start_end[0], start_end[1])
            }
        }

        if (omethod === 'POST'){
            var body = yield libs.$parse(this);
            if (body && body.page){
                let page = body.page;
                var start_end = getPages(page)
                return yield getList(start_end[0], start_end[1])
            }
        }

        return yield getList()
    }

    if (method === 'GET') {
        if (location.query.page){
            let page = location.query.page;
            var start_end = getPages(page)
            return yield getList(start_end[0], start_end[1])
        }
        return yield getList()
    }

    if (method === 'POST') {
        var uname = false;
        var body = yield libs.$parse(this);
        if (body) {
            if (body.uname) {
                uname = body.uname;
            }
            if (body && body.page){
                let page = body.page;
                var start_end = getPages(page)
                return yield getList(start_end[0], start_end[1], body)
            }
        }
        return yield getList()

    }

    function *getList(start, end, bd){
        try {
            let tag = null,
                cat = null;

            // get的tag
            // if (location && location.query.tag){
            if (bd && bd.tag){
                tag = bd.tag
            }

            // get的cat
            // if (location && location.query.cat){
            if (bd && bd.cat){
                cat = bd.cat
            }

            var Topic = mongoose.model('Topic')
            var topics = yield Topic.topicList(start, end, tag, cat);
            return topics;

        } catch (err) {
            return err;
        }
    }
}

module.exports = {
    getData : listtopic
}
