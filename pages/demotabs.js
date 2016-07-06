"use strict";

var _data = {
    data:[
        '典型页面',
        '导航',
        '表单',
        '列表',
        '高级搜索'
    ]
}

function *tabs(oridata, ctr){

    return ctr.run({
        get: async ()=>{
            var _html = ctr.parseJsx('react/modules/tabs/tabs', _data);
            _html[0] = '<div id="for-vtabs">'+_html[0]+'</div>'
            oridata.tabs = _html[0]
            return oridata;
        },

        post: async ()=>{
            return oridata;
        }
    })
}

export {tabs as getData}
