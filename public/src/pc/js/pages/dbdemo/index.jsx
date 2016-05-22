// index.js
// 数据处理部分


SA.set('USER', {error: '-1'})

var api = require('libs/api')
var libs = require('libs/libs')
var AppList = require('modules/list/like_lagou');
var cfg = require('root/config')
// var loginBox = require('modules/sign/signin')


//异步调用js
//webpack类似seajs的异步请求语法 require.ensure
//有些文件需要异步调用
require.ensure(['./_common/epic'], function(require){

    // 页面url变量
    var param = libs.queryString(),
        repass = false,
        cur_page = param.page ? param.page : 1,
        p_tag = param.tag ? param.tag : null,
        p_cat = param.cat ? param.cat : null;

    if (param && param.type) {
        var type = param.type;
        if (type==='signup') {
            repass = true;
        }
    }
    else {
        //初始化获取用户信息
        //页面载入请求用户信息
        api.req(
            '/$signin',
            sign_resaults
        )

        //注册信息
        //signin返回信息回调
        function sign_resaults(data){
            SA.set('USER', data)
            if (data.dbconfig){
                libs.msgtips(data.dbconfig, 'alert')
            }
            if (data.error){ //没有该用户
                // console.log(data);
                SA.set('USER', {error: '-2'})
            }
            else{
                $('#edit').click(function(){
                    //设置按钮显示
                    var txt = this.textContent;
                    if (txt === '发布')
                        this.textContent = '关闭'
                    else
                        this.textContent = '发布'

                    $('body').trigger('openEditor')
                })
            }
        }
    }


    //添加/更新文章
    $('body').on('addTopic', function(e, args){
        //添加文章 或者 修改文章
        //ajax
        var content = args.cnt,
            upid = false,
            editor = args.editor;
        if (content.length){
            if (libs.strLen(content)>15) {
                if (args.upid){
                  upid = args.upid
                }
                var postdata = {cnt: content};

                //更新文章
                if (upid){
                    postdata.topic = upid;
                    libs.api.req(
                        '/$updatetopic',
                        postdata,
                        topic_resaults
                    )
                }

                //添加文章
                else {
                    libs.api.req(
                        '/$addtopic',
                        postdata,
                        topic_resaults
                    )
                }
            }
            else {
                alert('文章字数少于15字')
            }
        }

        function topic_resaults(data){
            editor.importFile('')
            $('.box').hide()
            if (data.error){
                libs.msgtips(data.message)
            }
            else{
              if (upid){
                  libs.msgtips('更新成功')
              }
              else {
                  libs.msgtips('发布成功')
              }
            }
            return data
        }
    })





    //  ===========  列表文章  =========
    api.req(
        '/$listtopic',
        {page: cur_page, tag: p_tag, cat: p_cat},
        listTopic_resaults
    )

    //ajax列表页数据
    function listTopic_resaults(data){
        var lists = []
        data.map(function(item, i){
            // console.log('========== item');
            // console.log('========== item');
            // console.log('========== item');
            // console.log('========== item');
            // console.log(item);
            var _title = <div className="testheader">
                <span><img src={item.user.avatar}/></span>
                <a href={"?topic="+item._id}>{item.title}</a>
                <abbr>
                    {libs.timeAgo(item.create_at)}
                </abbr>
            </div>

            function mk_tags(tag){
                if (!tag){
                    return ''
                }
                var _v = tag;
                var _tag = []
                _v.map(function($v){
                    _tag.push(<a href={'/?tag='+$v}>{$v}</a>)
                })
                return _tag;
            }

            lists.push({
                title: _title,
                body: [
                    {
                        k: '作者: ',
                        v: item.user.nickname
                    },
                    {
                        k: '标签: ',
                        v: mk_tags(item.tags)
                    }
                ]
            })
        })

        if (!param.topic){
            //列表页展示
            $('#listtopic').html('')
            setTimeout(function(){
                $('#listtopic').css({'margin-left':0})
                var AppList_scroll_opts = {
                    evt: 'auto',
                    callback: dealwith_drag,
                    sem: loadMore  //scroll end method
                }
                //渲染列表数据
                AppList(
                    lists,          //列表数据
                    'listtopic',    //绑定dom
                    AppList_scroll_opts
                );
            }, 100)
        }
    }

    //加载下一页数据
    function loadMore(e, next){
        var next_page = cur_page + 1;
        api.req(
            '/$listtopic',
            {page: next_page, tag: p_tag, cat: p_cat},
            function(data){
                console.log('=============== data')
                console.log(data)
                cur_page = next_page;
                var lists = []
                data.map(function(item, i){
                    // console.log(item);
                    lists.push( <a href={"?topic="+item._id}>{item.title}</a> )
                })
                next(e, lists)
            }
        )
    }

    //处理每一个item为左右拖动
    function dealwith_drag(){
        require('./_common/dragandedit')()
    }

    // websocket 模块化调用
    var ws = require('modules/wsocket/index')
    ws('article_count', function(val){
        console.log(val.data);
    })

})
