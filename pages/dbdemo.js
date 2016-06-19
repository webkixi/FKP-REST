var libs = require('libs/libs')
var api = require('apis/javaapi')
var react2html = require('modules/parseReact')
var markdown = require('modules/markdown')
var querystring = require('querystring')
const mongoose = require("mongoose");


function *index(oridata) {
    console.log('========= 列表页/'+__filename+' =========\n\n');

    var _this = this,
        method = this.method,
        location = this.local,
        topics;

    if (method === 'GET') {
        oridata.title = 'FKP-MONGO数据库博客，reactjs服务端同构'

        if (this.session.$user){
            oridata.topper = '<a href="javascript:void(0)" id="edit">发布</a>'
        }
        else {
            oridata.topper = '<a href="/github/sign" id="reg">注册/登陆</a>'
        }

        // 处理文章详情数据
        if (location.query.topic){
            try {
                yield api.req(_this, '$counttopic')

                if (Cache.has(location.query.topic)){
                    var tmp = Cache.peek(location.query.topic)
                }
                else{
                    var tmp = yield return_detail()
                }
                var rtn = {
                    isList: false,
                    content: tmp.cnt.replace('h1','p'),
                    mdmenu: tmp.mdmenu,
                    title: tmp.ori.title,
                    author: tmp.ori.user.username,
                    create_at: tmp.ori.create_at
                }
                oridata.bloglist = rtn
                oridata.title = tmp.ori.title

            } catch (e) {
                console.log('============ counttopic'+e);
            }
        }


        // 默认
        // 处理列表数据
        else {
            var tmp = yield return_list()
            var rtn = {
                isList: true,
                content: tmp
            }
            oridata.bloglist = rtn;
        }

        //返回数据
        return oridata;
    }

    // =============== post ===================

    if (method === 'POST') {
        if (this.session.$user) {
            _user = this.session.$user;
        }

        if (!_user) {
            return errors['10005'];
        }

        var topic = yield api.req(_this, '$listtopic')

        return topic;
    }



    //返回列表的html结构
    //使用react组件
    //数据要符合react/list组件的格式规范
    function *return_list(){
        //从数据库中获取数据
        // '$' 为数据库api的前置标记，与前端一致
        topics = yield api.req(_this, '$listtopic')

        //整理数据，使数据符合 react 需求
        topics = yield dealWith_topicsListData(topics)

        // react组件解析生成html
        // 传入 react 组件路径及数据
        // var reactHtml = yield react2html('react/listView/list', {data: topics})
        var reactHtml = yield react2html('react/widgets/listView/list', {data: topics})
        reactHtml[0] = '<div class="load-list">'+reactHtml[0]+'</div>'

        // 将html结构代码代入到oridata，用于模板渲染
        return reactHtml[0]
    }



    //返回详情页信息
    //使用markdown实现
    //数据要符合react/list组件的格式规范
    function *return_detail(){
        //从数据库中获取数据
        // '$' 为数据库api的前置标记，与前端一致
        topics = yield api.req(_this, '$detailtopic')
        var cache_id = topics[0]['_id'].toString()

        // console.log(cache_id);


        //整理数据，markdown 解析生成html
        var cnt = yield markdown(topics[0]['content'], {mdcontent:{ori: topics[0]}})

        //暂时不保存到cache
        //放开就会将数据放置cache
        // Cache.set(cache_id, cnt.mdcontent)

        // 将html结构代码代入到oridata，用于模板渲染
        return cnt.mdcontent
    }

    //整理数据使之符合react的List组件格式
    function *dealWith_topicsListData(ttt){
        var listdata_targ = []
        ttt.map(function(item){
            // listdata_targ.push(item.title)
            listdata_targ.push(<a href={"?topic="+item._id}>{item.title}</a>)
        })
        return listdata_targ
    }

    //整理数据使之符合react的List组件格式
    function *dealWith_topicsDetailData(ttt){
        var article = []
        var item = ttt[0]

        var h1_obj = ttt['cnt'].match(/<h1 ([^>]*)>(.*?)<\/h1>/)
        var cnt = ttt['cnt'].replace(/<h1 ([^>]*)>(.*?)<\/h1>/, '')
        var attrs = h1_obj[1].replace(' ','&')
        attrs = querystring.parse(attrs)

        article.push(
            <div className="markdown">
                <h1 id={attrs.id} className={attrs.class}>{item.title}</h1>
                <small>作者：{item.user.username}</small>
                {'~~mdcnt~~'}
            </div>
        )
        return [article,cnt]
    }

}

module.exports = {
    getData : index
}
