var path = require('path')
var libs = require('../../libs/libs')

function *demoIndexData(oridata){
    libs.wlog('pages/h5/lazypage')
    return oridata
}

module.exports = {
    getData : demoIndexData
}
