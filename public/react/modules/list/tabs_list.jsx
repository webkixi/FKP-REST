/**
 * 左边是导航部分
 * 右边列表部分
 * 现在比较流行的一种ui方式
 */
var libs = require('libs/libs'),
    List = require('./_component/_loadlist'), //设定列表域为 lagou
    ItemMixin = require('react/mixins/item'),
    render = React.render,
    inject = libs.inject(),
    req = require('libs/api').req;

//注入css
inject.css(['/css/t/list/tabslist.css', 'tabslist']);

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
              $(me).find('li[data-cls="loadbar"]').html('没有更多主题可看了')
              return false
            }

            var _data = SAX.get(_name).data
            _data = _data.concat(ddd)

            if(!eve || eve!=='auto'){
                $(me).find('li[data-cls="loadbar"]').click(function(){
                    SAX.setter(_name, {data: _data});
                })
            }
            else
            if(eve === 'auto'){
                SAX.setter(_name, {data: _data});
            }

        } catch (e) {
            libs.msgtips('tabs_list :: doneNext: '+ e, 'alert')
        }
    }
}

function applist(m, l, ele, opts){
    var noop = function(){},
        dft = {
            container: '',
            trigger: 'auto',
            globalName: {
                menu: 'TabsMenus',
                list: 'TabsLists'
            },
            itemMethod: {
                menu: noop,
                list: noop
            },
            listMethod:{
                menu: noop,
                list: noop
            },
            itemClass: {
                menu: '',
                list: ''
            },
            listClass: {
                menu: '',
                list: ''
            },
            scroll: {
                menu: noop,
                list: noop
            },
            scrollEnd:{
                menu: noop,
                list: noop
            },
            empty: {
                menu: <div>没有数据</div>,
                list: <div>没有数据</div>
            }
        }

    if (_.isObject(ele))
        opts = ele;


    dft = _.assign(dft, opts)

    if (!dft.container){
        console.log('tabs_list需要指定id');
        return false
    }

    SAX.set(dft.globalName.menu, {data: m})
    SAX.set(dft.globalName.list, {data: l})

    function xxx(type, sem){
        var _name = dft.globalName[type]
        return function(top){
            var self = this;
            sem.call(self, _name, doneNext.call(self, dft.trigger))
        }
    }

    for (var type in dft.scrollEnd){
        dft.scrollEnd[type] = xxx(type, dft.scrollEnd[type])
    }

    // 定义列表
    var MENUS = List(dft.globalName.menu),
        LISTS = List(dft.globalName.list);


    var data_menus = m,
        data_lists = l;


    var VTabs = React.createClass({
        mixins: [ItemMixin],
        getInitialState: function(){
            return {
                menus: [],
                lists: []
            }
        },
        componentWillMount: function(){
            if (this.props.data){
                var data = this.props.data;
                if (data.menus){
                    this.setState({
                        menus: data.menus
                    })
                }

                if (data.lists){
                    this.setState({
                        lists: data.lists
                    })
                }
            }
        },
        render:function(){
            var _this = this;
            return (
                <div className="tabslist">
                    <div ref='tabs-menu' className="tabs-menu">
                        {(function(){
                            if (_this.state.menus && _this.state.menus.length){
                                return <MENUS onscrollend={dft.scrollEnd.menu} scroll="self" itemClass={dft.itemClass.menu} listClass={dft.listClass.menu} data={_this.state.menus} itemMethod={dft.itemMethod.menu}/>
                            }
                            else {
                                return dft.empty.menu
                            }
                        })()}
                    </div>
                    <div ref='tabs-list' className="tabs-list">
                        {(function(){
                            if (_this.state.lists && _this.state.lists.length){
                                return <LISTS onscrollend={dft.scrollEnd.list} scroll="self" itemClass={dft.itemClass.list} listClass={dft.listClass.list} data={_this.state.lists} itemMethod={dft.itemMethod.list}/>
                            }
                            else {
                                return dft.empty.list
                            }
                        })()}
                    </div>
                </div>
            );
        }
    })

    var data_render = {menus: data_menus, lists:data_lists}
    render(
        <VTabs data={data_render} />,
        document.getElementById(dft.container)
    )
}

module.exports = applist;
