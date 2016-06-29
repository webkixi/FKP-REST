var api = require('libs/api');
var libs = require('libs/libs');
require('./_common/xyz')
libs.msgtips('abc')

setTimeout(function(){
    api.get('/hello', function(data){
        libs.msgtips(data.pdata)
    })
},500)

setTimeout(function(){
    api.req('/hello', function(data){
        libs.msgtips(data.pdata)
    })
},1000)
