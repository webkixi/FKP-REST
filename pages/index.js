var path = require('path')
var libs = require('../libs/libs')

var demoIndexData = function(oridata){
    libs.wlog('pages/h5/lazypage')
    return oridata
}

module.exports = {
    getData : demoIndexData
}
