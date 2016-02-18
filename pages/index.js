var api = include('apis/javaapi')
var react2html = include('modules/parseReact')

function *index(oridata) {

    var method = this.method;

    if (method === 'GET') {

        //从数据库中获取数据
        // '$' 为数据库api的前置标记，与前端一致
        var listdata_ori = yield api.req(this, '$listtopic')

        //整理数据，使数据符合 react 需求
        var listdata_targ = []
        listdata_ori.map(function(item){
            listdata_targ.push(item.title)
        })

        // react格式化为html结构
        // 传入 react 组件路径及数据
        var reactHtml = yield react2html('react/listView/list', {data: listdata_targ})
        console.log(reactHtml[0]);

        // 将html结构代码代入到oridata，用于模板渲染
        oridata.bloglist = reactHtml[0]
        return oridata;
    }

    if (method === 'POST') {
        var post_data = '我是post数据'
        oridata.pdata = post_data;
        return oridata;
    }

}

module.exports = {
    getData : index
}
