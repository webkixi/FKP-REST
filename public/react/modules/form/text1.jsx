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


function text(d, e, c){
    // 只需要react结构
    // 比如服务器端
    if (d === true)
        return Input();


    var inject = libs.inject().css;
    var _css = d.theme ? d.theme :'index'
    inject([
        '/css/t/ui/form/'+_css+'.css'
        ,'fkp_form_input'
    ])

    var _fun = function(data, ele, cb){
        this.ipt;
        var self = this;

        // ItemMixin的回调方法
        // @intent，由组件内部传出
        function dm(intent){
            self.ipt = this;

            // 引入select的插件
            require('./_plugin/select')(this, intent)

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
    return Input();
}

module.exports = text
