var libs = require('libs/libs');
var Input = require('react/widgets/ui/input1')
var render = React.render;

function text(data, opts, callback){

    var noop = function(){},
      dft = {
          container: '',
          theme:      'index',
          itemMethod: noop
      }
      dft = _.assign(dft, opts)

    if (!dft.container) {
      console.log('没有指定容器');
      return false;
    }
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
        this.form = {};
        this.ipt;
        var self = this;

        // ItemMixin的回调方法
        // @intent，props.intent | this.intent
        function dm(intent){
            self.ipt = this;

            // 引入select的插件
            // self.ipt, self.value
            require('./_plugin/select')(self, intent)

            if (typeof cb==='function'){
              cb.call(this)
            }
        }


        if( typeof ele === 'string'){
            Input = Input(ele);
        }
        else {
            Input = Input();
        }

        render(
            <Input data={data} itemMethod={dft.itemMethod} itemDefaultMethod={dm}/>,
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
                                if( _item.length ){
                                    var _val=[]
                                    _item.each(function(j, it){
                                        _val.push(it.value)
                                    })
                                    values[item.input.name[0]] = _val
                                }
                                else {
                                    values[item.input.name[0]]=[]
                                }
                            })()
                            : values[item.input.name[0]] = _item.val()
                        : values[item.input.id] = _item.attr('data-value')|| _item.val()
                    }
                })
                return values;
            }
        }
    }

    return new _fun(dft.data, dft.container, callback)
}

text.pure = function(){
    return Input();
}

module.exports = text
