// index.js
// 数据处理部分


SA.set('USER', {error: '-1'})

var api = require('libs/api')
var libs = require('libs/libs')
// var AppList = require('modules/list/like_lagou');
var listModule = require('modules/list/base_list');
var cfg = require('root/config')
var WS = require('modules/wsocket/index')

var _listData = []


// var loginBox = require('modules/sign/signin')

WS.on('imchat', function(data){
    // libs.msgtips('有人在聊天室聊天哦','warning')
    // libs.msgtips('去 /chat 看看情况','center')
    $('.chattip').show().addClass('animated tada')
    setTimeout(function(){
        $('.chattip').hide().removeClass('animated tada')
    },10000)
})


//异步调用js
//webpack类似seajs的异步请求语法 require.ensure
//有些文件需要异步调用
require.ensure(['./_common/epic', './_common/dragandedit'], function(require){

    // 页面url变量
    var param = libs.queryString(),
        repass = false,
        cur_page = param.page ? param.page : 0,
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
                    require('libs/api').req(
                        '/$updatetopic',
                        postdata,
                        topic_resaults
                    )
                }

                //添加文章
                else {
                    require('libs/api').req(
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

    //弹出编辑框
    $('body').on('openEditor', function(jqevent, opts){
        //打开输入框
        $('.box').toggle()

        if (opts && opts.content){
          require('./_common/epic')(opts)   //类似seajs，按需异步请求
        }
        else{
          //插入编辑器
          //必须后置打开，不然编辑器的宽高不对
          require('./_common/epic')()       //类似seajs，按需异步请求
        }
    })

    $(window).scroll(function(){
        var _top = $(window).scrollTop()
        var _width = $(window).width()
        if (_top>140){
            $('.topper').addClass('fixed_top')
            if (_width>1023){
                $('.topper').css({'width': '68%'})
            }
            else {
                $('.topper').css({'width': '98%'})
            }
            $('.side-menu').css({top: '3.5em'})
        }
        else {
            $('.side-menu').css({top: '10.5em'})
            $('.topper').removeClass('fixed_top')
            $('.topper').css({'width': '100%'})
        }
    })

    //打开/关闭编辑框
    $('.box_close').click(function(){
        $('body').trigger('openEditor')
    })



    //  ===========  列表文章  =========

    // ajax列表数据
    function pull_list_data(cb){
        var login = SA.get('USER').login;
        // pageNum, numPerPage, order
        cur_page++
        var params = {
            page: cur_page,
            tag: p_tag,
            cat: p_cat
        }
        api.req('/$listtopic', params, function(data){
            listTopic_resaults(data)
            if (_.isFunction(cb)){
                cb()
            }
        })
    }


    //ajax列表页数据处理
    function listTopic_resaults(data){
        _listData = []

        // 生成标签模版
        function mk_tags(tag){
            if (!tag) return '';
            if (!_.isArray(tag)) return [''];

            var _v = _.map(tag, _.trim),
                _tag = [];

            _v.map(function($v){
                _tag.push(<a href={'/?tag='+$v}>{$v}</a>)
            })

            return _tag;
        }

        data.map(function(item, i){
            var _title = (
                <div className="title_header">
                    <span><img src={item.user.avatar}/></span>
                    <a href={"?topic="+item._id}>{item.title}</a>
                    <abbr>
                        {libs.timeAgo(item.create_at)}
                    </abbr>
                </div>
            )

            _listData.push({
                title: _title,
                body: [
                    { k: '作者: ',
                      v: item.user.nickname },
                    { k: '标签: ',
                      v: mk_tags(item.tags) }
                ]
            })
        })
    }

    // 加载列表
    pull_list_data(function(){
        if (!param.topic){
            //列表页展示
            $('#listtopic').html('')
            $('#listtopic').css({'margin-left':0})

            function itemFun(){
            }

            function listFun(){
                require('./_common/dragandedit')()
            }

            //加载下一页数据
            function loadMore(e, next){
                listFun()
                var next_page = cur_page + 1;
                pull_list_data(function(){
                    next(e, _listData)
                })
            }


            listModule(_listData, {
                container: 'listtopic',
                globalName: 'Blogs',
                listClass: 'like_lagou',
                itemClass: 'lg_item',
                listMethod: listFun,
                itemMethod: itemFun,
                scrollEnd: loadMore
            })
        }
    })

    // websocket 模块化调用
    // var ws = require('modules/wsocket/index')
    WS.on('article_count', function(val){
        console.log(val.data);
    })

})
