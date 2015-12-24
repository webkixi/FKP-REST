var libs = require('./libs')
var core = require('./_component/core')

function pages(opts){

    page = SA.get('_CURENT_PAGE')
    if (page){
        var intent = SA.get(page)
        this.intent = intent;
    }
    else {
        this.intent = false;
    }

    var _this = this;
    var _ = libs.lodash;

    var _dft = [];
    var defaults = {
        init: function(){},
        goback: function(){},
        ready: function(){},
        main: function(){},
        end: function(){}
    }
    _dft = Object.keys(defaults)

    if (libs.getObjType(opts) === 'Object'){
        var defaults = libs.extend(true, defaults, opts)
    }

    var dft = defaults;
    var funs = Object.keys(dft)
    funs.map(function(item, i){
        _this[item] = dft[item];
    })

    function run(){
        funs.map(function(item, i){
            if (typeof dft[item] === 'function'){
                if (_.indexOf(_dft, item)>-1)
                    dft[item].call(_this, _this, _this.intent)
            }
        })
    }

    if (_.indexOf(funs, 'boot')>-1){
        var stat = dft['boot'].call(_this, _this)
        if (stat)
            run();
    }
    else
        run();

    return this;
}

pages = core.extend(pages, core)

pages.prototype.render = function(obj, ele){
    var dom;
    if (!ele) return false;
    if (typeof ele === 'string'){
        dom = document.getElementById(ele)
        if (!dom) return false;
    }
    else
    if (ele.nodeType)
        dom = ele;

    if (dom){
        if (this.libs.getObjType(obj) === 'Object')
            if (React && React.isValidElement(obj))
                React.render(obj, dom)
        else
        if (typeof obj === 'string'){
            if (Zepto||jQuery){
                var $$ = Zepto||jQuery||$;
                $$(dom).html($$(obj))
            }
        }

    }


    this.render = React.render;
}

pages.new = function(opts){
    return new pages(opts)
}

module.exports = pages
// pages.extend = function(opts){
//     return new pages(opts)
// }
