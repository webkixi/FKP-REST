var libs = require('libs/libs');
var Input = require('../../widgets/ui/input1')
var render = React.render;
var api = require('libs/api');

/*
    // CASE I
    var inputs = [
        {
            input:{
                name:      'aaa',
                id:        'aaa',
                value:     null,
                type:      'text',
                placehold: '聊天内容'
            },
            title:     '聊天',
            class:     null,
            desc:      null
        },
        {
            input:{
                name:      'bbb',
                id:        'bbb',
                value:     '发射',
                type:      'button',
                placehold: null
            },
            title:     null,
            class:     'chatSubmit',
            desc:      null
        }
    ]

    // CASE II
    var inputs = {
        name:      ['aaa' , 'bbb'],
        id:        ['aaa' , 'bbb'],
        type:      ['text', 'button'],
        title:     ['聊天' , ''],
        value:     [null    , '发射'],
        class:     [null    , 'chatSubmit'],
        placehold: ['聊天内容']
    }
*/


function text(d, e, c){
    // 只需要react结构
    // 比如服务器端
    if (d === true)
        return Input();


    var inject = libs.inject().css;
    var _css = d.theme ? d.theme :'input'
    inject([
        '/css/t/ui/form/'+_css+'.css'
        ,'fkp_form_input'
    ])

    var _fun = function(data, ele, cb){
        this.ipt;
        var _this = this;

        // ItemMixin的回调方法
        // @intent，由组件内部传出
        function dm(intent){
            var _ctx = intent.ctx;  //Input的实例
            _this.ipt = this;

            function removeUnionTarget(id, cb){
                var indexOfIntent = _.findIndex(intent, {id: id});
                if (indexOfIntent>-1){
                    var theIntent = intent[indexOfIntent]
                    $('.for-'+theIntent.target.id).find('.fkp-dd').find('ul').remove();
                    removeUnionTarget(theIntent.target.id)
                }
            }

            // 下拉菜单默认方法
            // 支持联动
            $('.fkp-dd').click(function(){
                var me = this;
                var _ipt = $(me).find('.fkp-dd-input');
                // var _ipt_txt = $(me).find('.fkp-dd-input-txt');
                var _ul = $(this).find('ul');
                var _ipt_id = _ipt[0].id;

                _ul.toggle();

                // 检测union，联动下拉菜单
                removeUnionTarget(_ipt_id)
                var indexOfIntent = _.findIndex(intent, {id: _ipt_id})
                if (indexOfIntent>-1){
                    optionClick(intent[indexOfIntent])
                }
                else {
                    optionClick()
                }

                function optionClick(opts){
                    $(me).find('.fkp-dd-option')
                    .off('click')
                    .click(function(e){
                        e.stopPropagation();
                        var _opt_val = $(this).attr('data-value'),
                        _opt_txt = $(this).text(),
                        _opt_attr = $(this).attr('data-attr');

                        _ipt.attr('data-value', _opt_val)
                        _ipt.val(_opt_txt)

                        // 下拉菜单显示隐藏
                        _ul.toggle();

                        if (opts){
                            if (opts.param){
                                var _str =  JSON.stringify(opts.param).replace('$value', _opt_val) .replace('$text', _opt_txt) .replace('$attr', _opt_attr)
                                opts.param = JSON.parse(_str)
                            }
                            if (opts.url){
                                //关联select取回数据
                                api.req(opts.url, opts.param)
                                .then(function(data){
                                    var _uObj = $('.for-'+opts.target.id)[0]
                                    // 执行回调
                                    if (opts.cb && typeof opts.cb==='function'){
                                        opts.cb.call(_uObj, data, _fill.call(_uObj, opts))
                                    }
                                })
                            }
                        }
                    })
                }

            })

            //填充数据到关联select
            // @data 根据异步数据处理过的符合select的数据，二维数组
            // @itnt intent数据，由ItemMixin下传过来的数据
            function fill(data, itnt){
                if( !_.isArray(data) ) return false;

                if (_.isArray(data)){
                    _vals = data[0];
                    _texts = data[1]||[];
                    _attrs = data[2]||[];
                    if (_vals.length !== _texts.length){
                        alert('option的value与text不匹配')
                    }
                    var options=['<ul>']
                    _vals.map(function(_val, i){
                        options.push('<li class="fkp-dd-option" data-value='+_val+' data-attr='+_attrs[i]+'>'+_texts[i]+'</li>')
                    })
                    options.push('</ul>');
                    $(this).find('.fkp-dd').append(
                        options.join('')
                    )
                }
            }

            function _fill(_intent){
                var that = this;
                return function(data){
                    fill.call(that, data, _intent)
                }
            }

            if (cb&&typeof cb==='function')
                cb.call(this)
        }


        if( typeof ele === 'string'){
            Input = Input(ele);
        }
        else {
            Input = Input();
        }
        render(
            <Input data={data} itemDefaultMethod={dm}/>,
            (function(){return ele.nodeType ? ele : document.getElementById(ele)}())
        )
    }

    return new _fun(d, e, c)
}

text.server = function(){
    return Input;
}

module.exports = text
