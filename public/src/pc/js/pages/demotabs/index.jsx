var Tabs = require('modules/tabs/tabs')
var libs = require('libs/libs')


var _config = [
    'aaa',
    'bbb',
    'ccc'
]

Tabs(_config, {
    container: 'for-vtabs',
    class: 'xxx',
    itemMethod: function(){
        // console.log(this);
    }
});
