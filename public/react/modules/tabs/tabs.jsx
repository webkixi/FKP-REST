var BaseTabs = require('./_component/base_tabs')
var render = React.render;


function tabs(data, opts, c){
    var libs = require('libs/libs');
    var noop = false,
        dft = {
            container: '',
            globalName: '',   // TabsModule
            theme: 'tabs',
            class: '',
            itemMethod: noop,
            listMethod: noop,
            component: false,
            mulitple: true,
            event: 'click'
        }

    dft = _.assign(dft, opts)

    if (!dft.container) return false;
    if (data) {
        dft.data = data
    }

    var inject = libs.inject().css;
    inject([
        '/css/t/ui/'+dft.theme+'.css'
        ,'ui_'+dft.theme
    ])

    var Tabs = BaseTabs(dft.globalName);

    var _fun = function(data, ele, cb){
        this.data = _.cloneDeep(data)
        this.value;
        this.ipt;   // list item dom
        this.lpt;   // list dom
        this.group;
        this.stat;
        var self = this;

        function dm(){
            self.ipt = this;
            // $(this).on(dft.event, function(){
        }

        if (!dft.listMethod){
            dft.listMethod = function(){
                self.lpt = this;
                self.group = $(this).parent();
                var _eles = []
                $(this).parent().find('.tabs-box').each(function(i, view){
                    view.content = function(cnt){
                        React.render(<div className="box-content">{cnt}</div>, view)
                    }
                    _eles.push(view);
                })

                $(this).parent().find('.tabs-menu').each(function(i, item){
                    // $(item).click(function(){
                    $(item).on(dft.event, function(){
                        var _href = $(this).attr('data-href')
                        if(_href && _href!=='#'){
                            return;
                        }
                        $(this).siblings().removeClass('selected');
                        $(this).addClass('selected');
                        var view = _eles[i];
                        $(view).siblings().removeClass('selected');
                        $(view).addClass('selected')

                    })
                })


                if (cb&&typeof cb==='function'){
                    if (!self.stat){
                        self.select();
                        cb.call(this, _eles)
                    }
                    else {
                        self.stat = false;
                    }
                }
            }
        }

        var options = {
            mulitple: dft.mulitple,
            itemMethod: dft.itemMethod,
            itemDefaultMethod: dm,
            listMethod: dft.listMethod,
            cls: dft.class
        }

        if (dft.component){
            return <Tabs data={self.data} opts={options} />
        }
        else {
            render(
                <Tabs data={self.data} opts={options} />,
                (function(){return ele.nodeType ? ele : document.getElementById(ele)}())
            )
        }
    }
    _fun.prototype = {
        add: function(data, cb){
            this.data.push(data);
            this.stat = 'add';
            var self = this;
            if (dft.globalName){
                SAX.setter(dft.globalName, {data: this.data})
            }
            else {
                libs.msgtips('定义时没有指定globalName')
            }

            // 回调中为新的tab增加新的内容
            function _select(content){
                var len = self.data.length;
                self.select((len-1), content);
            }

            if (cb&&typeof cb==='function'){
                cb(_select)
            }

        },
        // 选中某一个标签，通过id
        select: function(idf, content){
            if (!idf){
                idf = 0;
            }
            var groupClass = dft.class ? $('.'+dft.class) : $(this.group);
            var menus = groupClass.find('.tabs-menu');
            menus.each(function(i, item){
                $(item).siblings().removeClass('selected')
                if (idf === i){
                    $(item).addClass('selected')
                }
            })
            if (dft.mulitple){
                _view = groupClass.find('.tabs-box-'+idf);
                if (_view.length){
                    var _content = content || '初始数据'+idf;
                    React.render(<div className="box-content">{_content}</div>, _view[0])
                    $(_view).siblings().removeClass('selected');
                    $(_view).addClass('selected')
                }
            }
        }
    }
    return new _fun(dft.data, dft.container, c)

}

tabs.pure = BaseTabs.pure;

tabs.store = function(_name){
    return BaseTabs.store(_name)
}

module.exports = tabs
