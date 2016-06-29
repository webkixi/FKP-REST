"use strict";

import react2html from 'modules/parseReact'

var _props = {
    // container: '',
    // globalName: '_Pagi',
    itemMethod: false,
    listMethod: false,
    itemClass: '',
    listClass: 'pagenation wid-12',
    data: {
        total: 200,
        per:   20,
        url:   '/',
        query: 'page='
    },
    begin: { start: 0, off: 5 }
}


async function getHtml(){
    var reactHtml;
    try {
        // console.log(this);
        this.data.pagi = '';
        reactHtml = await react2html('react/modules/pagination/pagi', _props)
        reactHtml[0] = '<div class="pagi" id="pagi" >'+reactHtml[0]+'</div>'
        this.data.pagi = reactHtml[0]
    }
    catch (e) {
        console.log(e);
    }
    finally {
        return this.data;
    }

}


function *pagi(oridata, pgn){
    
    return pgn.run({
        get: function(){
            return getHtml.call(pgn);
        },

        post: function(){
            var post_data = '我是post数据'
            oridata.pdata = post_data;
            return oridata;
        }
    })
}

export {pagi as getData}
