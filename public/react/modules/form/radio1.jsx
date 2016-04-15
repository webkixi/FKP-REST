var libs = require('libs/libs');
var inject = libs.inject().css;

var Radio = require('../../widgets/ui/radio')
var render = React.render;

function radio(d, e, c){
    var _css = d.theme ? d.theme :'radio'
    inject([
        '/css/t/ui/form/'+_css+'.css'
        ,'formradio'
    ])
    delete d.theme

    var _fun = function(data, ele, cb){
        this.value;
        this.ipt;
        this.name;
        var self = this;

        function dm(){
            self.ipt = this;
            $(this).find('input[type=radio]').change(function(){
                $('fkp-radio-box active').removeClass('active')
                self.value = this.value;
            })

            if (cb&&typeof cb==='function')
                cb.call(self, this)
        }

        render(
            <Radio data={data} itemDefaultMethod={dm}/>,
            (function(){return ele.nodeType ? ele : document.getElementById(ele)}())
        )
    }

    if (d === true)
        return Radio;

    return new _fun(d, e, c)

}

module.exports = radio
