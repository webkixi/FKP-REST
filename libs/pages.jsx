/* pages类及pages生周期 */
function pages(opts){

    var page = SAX.get('_CURENT_PAGE')
    if (page){
        var intent = SAX.get(page)
        this.intent = intent;
    }
    else {
        this.intent = false;
    }

    var _this = this;

    var _dft = [];
    var defaults = {
        init: function(){},
        // goback: function(){},
        ready: function(){},
        main: function(){}
        // end: function(){}
    }
    _dft = Object.keys(defaults)

    if ( _.isObject(opts) ){
        var defaults = _.extend({}, defaults, opts)
    }

    var dft = defaults;
    var funs = Object.keys(dft)
    funs.map(function(item, i){
        _this[item] = dft[item];
    })

    function run(){
        var _this = this;
        funs.map(function(item, i){
            if (typeof dft[item] === 'function'){
                if (_.indexOf(_dft, item)>-1)
                    dft[item].call(_this, _this, _this.intent)
            }
        })
    }

    _this.next = function(stat,data){
        if (stat){
            if (!_this.innerData){
                _this.innerData = data;
            }
            else{
                var tmp = _.extend({}, _this.innerData, data)
                _this.innerData = tmp;
            }
            run.call(_this)
        }
    }

    if (_.indexOf(funs, 'boot')>-1){
        var stat = dft['boot'].call(_this, _this)
        if (stat)
            run.call(_this);
    }
    else
        run.call(_this);

    return this;
}

pages.prototype = {
    render: function(obj, ele){
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
            if (_.isObject(obj))
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
    },

    watch: function(){},
}

pages.new = function(opts){
    return new pages(opts)
}

module.exports = pages
