/**
 * 仿拉钩列表
 */
var libs = require('libs/libs')
var List = require('./_component/_loadlist')('LAGOU') //设定列表域为 lagou
var ITEM = require('widgets/itemView/f_li');
var render = React.render;
var inject = libs.inject();
var req = require('libs/api').req;


//注入like_lagou的样式
inject.css(['/css/t/list/lagou.css', 'like_lagou']);
inject.js(['/js/t/jq/draggabilly.pkgd.min.js', 'draggabilly']);


function applist(data, ele, opts){

    var defaults = {
        sem: function(){},   //scroll end method
        evt: 'click',       // scroll end event
        callback: function(){}  //after list rendered, bind some behavior on dom
    }

    if( opts && typeof opts==='object' ){
        defaults = libs.extend({}, defaults, opts)
    }


    var lm = function(){};
    if (typeof defaults.callback === 'function'){
        lm = defaults.callback
    }

    var scrollEndMethod = function(){
        var me = this;
        var td;
        var tmpData = SA.getter('LAGOU')
        if(!tmpData.data){
            td = data;
            SA.set('LAGOU', {data:data})
        }

        if (defaults.sem && typeof defaults.sem === 'function') {
            defaults.sem(defaults.evt, doneNext)
        }
        else {
            //load more content
            doneNext(defaults.evt, td)
        }

        // refresh item's event of list
        setTimeout(lm, 200)

        //load more content function is click or auto-load
        function doneNext(eve, ddd){
            try {
                if (!ddd || libs.type(ddd)!=='Array')
                    throw 'must specify ddd, ddd is Array type'

                if (!ddd.length){
                  $(me).find('li[data-cls="loadbar"]').html('没有更多主题可看了')
                  return false
                }

                var _data = SA.get('LAGOU').data
                _data = _data.concat(ddd)

                if(!eve || eve!=='auto'){
                    $(me).find('li[data-cls="loadbar"]').click(function(){
                        SA.setter('LAGOU', {data: _data});
                    })
                }
                else
                if(eve === 'auto'){
                    SA.setter('LAGOU', {data: _data});
                }

            } catch (e) {
                libs.msgtips('like_lagou :: doneNext: '+e, 'alert')
            }
        }

    }



    render(
        <List data={data} onscrollend={scrollEndMethod} listMethod={lm} itemClass={'lg_item'} listClass={'like_lagou'} itemView={ITEM}/>,
        document.getElementById(ele)
    )
}

module.exports = applist;
