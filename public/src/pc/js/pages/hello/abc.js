var api = require('libs/libs').api
require('./_common/xyz')
alert('abc')

setTimeout(function(){
    api.req('hello', function(data){
        alert(data.pdata)
        // alert('xxx')
    })
},1000)
