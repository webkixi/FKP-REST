var libs = require('libs/libs');
var Input = require('../../widgets/ui/input1')
var render = React.render;
var inject = libs.inject().css;


function text(d, e, c){
    var _css = d.theme ? d.theme :'input'
    inject([
        '/css/t/ui/form/'+_css+'.css'
        ,'fkp_form_input'
    ])

    var _fun = function(data, ele, cb){
        this.ipt;
        var _this = this;

        function dm(){
            _this.ipt = this;
            if (cb&&typeof cb==='function')
                cb.call(this)
        }

        render(
            <Input data={data} itemDefaultMethod={dm}/>,
            (function(){return ele.nodeType ? ele : document.getElementById(ele)}())
        )
    }

    if (d === true)
        return Input;

    return new _fun(d, e, c)
}

module.exports = text
