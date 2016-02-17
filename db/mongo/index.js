const fs = require('fs')
var path = require('path')
const config = require('../../config')
require('./common/connect')  //载入所有的 mongoose model


function *distribute(control){
    var _this = this;
    const controlPath = path.join(__dirname + '/pages/')
    var file = controlPath + control + '.js'

    if (fs.existsSync(file) ){
        pageData = yield require(file).getData.call(this,{});
        yield this.returnJson(true, '', pageData)
    }
}


function *init(param){
    console.log('========= 数据库操作/'+__filename+' =========');
    var cat = param.cat,
        title = param.title;

    if (cat && typeof cat === 'string'){
        cat = cat.replace('$','')
        yield distribute.call(this, cat)
    }
}

module.exports = {
    init: init
}
