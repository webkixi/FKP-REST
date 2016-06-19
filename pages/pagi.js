var react2html = require('modules/parseReact')

function *hello(oridata) {

    var method = this.method;

    if (method === 'GET') {
        oridata.fkp = 'FKP-REST'
        var _props = {
            // container: '',
            // globalName: '_Pagi',
            itemMethod: false,
            listMethod: false,
            itemClass: '',
            listClass: 'pagenation wid-12',
            data: {
                total: 60,
                per:   20,
                url:   '/',
                query: 'page='
            },
            begin: { start: 0, off: 5 }
        }

        var reactHtml = yield react2html('react/modules/pagination/pagi', _props)
        reactHtml[0] = '<div class="pagi" id="pagi" >'+reactHtml[0]+'</div>'
        oridata.pagi = reactHtml[0]
        return oridata;
    }

    if (method === 'POST') {
        var post_data = '我是post数据'
        oridata.pdata = post_data;
        return oridata;
    }

}

module.exports = {
    getData : hello
}
