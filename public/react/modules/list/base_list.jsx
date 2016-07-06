/**
 * 单列带自动加载列表
 */

var libs = require('libs/libs'),
    List = require('./_component/_loadlist'); //设定列表域为 lagou


function doneNext(eve){
    var me = this;
    return function(_name, ddd){
        try {
            if (!_name){
                throw 'must specify global name'
            }
            if (!ddd || libs.type(ddd)!=='Array')
                throw 'must specify ddd, ddd is Array type'

            if (!ddd.length){
              setTimeout(function(){
                  $(me).find('.loadtype').parent().css('display','none')
              }, 5000)
              return false
            }

            var _data = SA.get(_name).data
            _data = _data.concat(ddd)

            if(!eve || eve!=='auto'){
                $(me).find('li[data-cls="loadbar"]').click(function(){
                    SA.setter(_name, {data: _data});
                })
            }
            else
            if(eve === 'auto'){
                SA.setter(_name, {data: _data});
            }

        } catch (e) {
            libs.msgtips('tabs_list :: doneNext: '+ e, 'alert')
        }
    }
}

function applist(data, ele, opts){
    ItemMixin = require('react/mixins/item'),
    render = React.render,
    inject = libs.inject();


    var noop = function(){},
        dft = {
            container: '',
            trigger: 'auto',
            theme: 'lagou.css',
            globalName: 'LagouLists',
            itemMethod: noop,
            listMethod: noop,
            itemClass: '',
            listClass: '',
            scroll: 'window',   // 指定self，则自身滚动，需要指定父级容器的特定高度，如果高度自适应，则不会产生滚动事件
            // 如父级高度为100%，需要指定html,body都为100%,且overflow为hidden
            scrollEnd: noop,
            empty: <div>没有数据</div>
        }

    if (_.isObject(ele))
        opts = ele;

    dft = _.assign(dft, opts)

    if (!dft.container) return false;

    SA.set(dft.globalName, {data: data})

    //注入like_lagou的样式
    inject.css(['/css/t/list/'+dft.theme, 'like_lagou']);
    // inject.js(['/js/t/jq/draggabilly.pkgd.min.js', 'draggabilly']);

    function xxx(sem){
        var _name = dft.globalName
        return function(top){
            var self = this;
            sem.call(self, _name, doneNext.call(self, dft.trigger))
        }
    }

    dft.scrollEnd = xxx(dft.scrollEnd)

    // 定义列表
    var LISTS = List(dft.globalName);

    var data_lists = data;

    var VTabs = React.createClass({
        mixins: [ItemMixin],
        getInitialState: function(){
            return {
                lists: []
            }
        },
        componentWillMount: function(){
            if (this.props.data){
                var data = this.props.data;
                if (data.lists){
                    this.setState({
                        lists: data.lists
                    })
                }
            }
        },
        render:function(){
            return (
                <LISTS itemClass={dft.itemClass} listClass={dft.listClass} listMethod={dft.listMethod} onscrollend={dft.scrollEnd} scroll={dft.scroll} data={this.state.lists} itemMethod={dft.itemMethod}/>
            );
        }
    })

    var data_render = {lists:data_lists}

    render(
        <VTabs data={data_render} />,
        _.isObject(dft.container)&&dft.container.nodeType ? dft.container : document.getElementById(dft.container)
    )
}

applist.server = function(){
    return List.pure();
}

applist.pure = function(){
    return List.pure();
}

applist.store = function(_name){
    return List.store(_name);
}

module.exports = applist;
