var libs = require('libs/libs')
var fs = require('fs')
var path = require('path')
var config = require('../../config')
require('./common/connect')  //载入所有的 mongoose model

var body=false;

function *distribute(control, fromnode){
    var _this = this;
    var controlPath = path.join(__dirname + '/pages/')
    var file = controlPath + control + '.js'


    if (fs.existsSync(file) ){
        var pageData = yield require(file).getData.call(this,{fromnode: fromnode, body: body});
        if (fromnode){
            return pageData;
        }
        else
            yield this.returnJson(true, '', pageData)
    }
}



function *init(param){
    libs.clog('数据库操作/'+__filename)

    var fromnode = false;
    var cat = param.cat,
        title = param.title,
        id = param.id;

    if (param.fromnode){
        fromnode = param.fromnode
    }

    body = param.body;

    if (cat && typeof cat === 'string'){
        cat = cat.replace('$','')
        return yield distribute.call(this, cat, fromnode)
    }
}


module.exports = {
    init: init
}
