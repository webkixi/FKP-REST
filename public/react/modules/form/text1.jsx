var libs = require('libs/libs');
var Input = require('../../widgets/ui/input1')
var render = React.render;

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


function text(data, opts, c){

    var noop = false,
        dft = {
            container: '',
            theme:      'index',
            itemMethod: noop
        }

    dft = _.assign(dft, opts)

    if (!dft.container) return false;
    if (data) {
        dft.data = data
    }

    var inject = libs.inject().css;
    inject([
        '/css/t/ui/form/'+dft.theme+'.css'
        ,'fkp_form_input'
    ])

    var _fun = function(data, ele, cb){
        this.data = data
        this.value = {};
        this.ipt;
        var self = this;

        // ItemMixin的回调方法
        // @intent，由组件内部传出
        function dm(intent){
            self.ipt = this;

            // 引入select的插件
            require('./_plugin/select')(self, intent)

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

    _fun.prototype = {
        getValue: function(){
            var values = {}
            if(_.isArray(this.data)){
                this.data.map(function(item, i){
                    if (_.isObject(item)){
                        var _isRadioOrCbx = ['radio','checkbox'].indexOf(item.input.type)
                        var _item = _isRadioOrCbx > -1
                                    ? $('input[name='+item.input.name[0]+']:checked')
                                    : $('#'+item.input.id)

                        _isRadioOrCbx>-1
                        ? item.input.type==='checkbox'
                            ? (function(){
                                console.log(item.input.name[0]);
                                values[item.input.name[0]]
                                ? values[item.input.name[0]].push(_item.attr('data-value')|| _item.val())
                                : values[item.input.name[0]] = [(_item.attr('data-value')|| _item.val())]
                            })()
                            : values[item.input.name[0]] = _item.attr('data-value')|| _item.val()
                        : values[item.input.id] = _item.attr('data-value')|| _item.val()
                    }
                })
                return values;
            }
        }
    }

    return new _fun(dft.data, dft.container, c)
}

text.server = function(){
    return Input();
}

module.exports = text
