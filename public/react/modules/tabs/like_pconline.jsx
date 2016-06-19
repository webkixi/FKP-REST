
// require compoent
var Tabswitch = require('./_component/tabswitch')('pc_tab');
var Uls = require('./_component/uls')('pc_uls');
var SelectBar = require('./_component/select_bar')('pc_sele');
var render = React.render;


/*
* navData {Array}   一维数组
* cntData {Array}   二维数组
* ele     {String}  页面元素的ID
* {return}  渲染结构到指定ID
*/
function likePConline( navData, cntData, ele, opts ){

    // 绑定tab的item元素的方法
    var tabItemDefaultMethod = function(){
        $(this).click(function(e){
            $(this).addClass('active')
            $(this).siblings().removeClass('active')
            $('.tab-cnt li').removeClass('active')
            $('.tabswitch li[data-cls="second"]').addClass('active');

            var idf = $(this).attr('data-idf');
            SA.setter('pc_uls', { data: cntData[idf] })
        })
    }

    // 绑定所有的attr的item元素的方法
    var ulItemDefaultMethod = function(){
        $(this).click(function(e){
            if($(this).attr('data-cls')=="first") return false;
            $(".cateTags").show();

            var that = this;
            dealWithSelectBarData( {item: that})
        })
    }

    var seleDefaultMethod = function(){

        $(this).delegate('dd','click',function(){
            console.log($(this).find('dd'));
            var filter = SA.getter('pc_sele').data;
            var the = this;
            var findIt = -1;
            var title = $(the).text();
            var value = $(the).attr('data-value');
            filter.data.map(function(it,i){
                if( it.title===title && it.value===value ){
                    $(it.ctx).removeClass('active');
                    $(it.ctx).parent().find('li[data-cls="second"]').addClass('active');
                    findIt = i;
                }
            })
            if(findIt>-1){
                filter.data.splice(findIt,1);
            }
            SA.setter( 'pc_sele',filter );
        })
    }



    //添加、删除selectBar元素事件中需要处理的数据及处理完数据后的动作
    var dealWithSelectBarData = function( opts ){
        var the = opts.item;
        var text = $(the).text();

        var seleItem = {
            group: $(the).parent().attr('data-group'),
            title: $(the).text(),
            value: $(the).attr('data-value'),
            ctx: the
        }

        if($(the).hasClass('active')){
            $(the).parent().find('li[data-cls="second"]').addClass('active')
            setSelectBar(seleItem,'delete')
        }else{
            $(the).siblings().removeClass('active')
            setSelectBar(seleItem,'other')
        }
        $(the).toggleClass('active')

        function setSelectBar(item,type){
            var filter = SA.getter('pc_sele').data;

            if( filter && filter.data ){
                if( type === 'delete' ){
                    _.remove( filter.data, function( n ){ return ( n.title === item.title && n.value===item.value ) })
                    if(!filter.data.length)
                        $(".cateTags").hide();
                }
                else{
                    var dublicatIndex = false;
                    var dublicatGroup = -1;
                    filter.data.map(function(it,i){
                        if(it.title===item.title)
                            dublicatIndex = true;
                        if(it.group === item.group )
                            dublicatGroup = i
                    })
                    if(!dublicatIndex){
                        if(dublicatGroup>-1){
                            filter.data.splice(dublicatGroup,1);
                        }
                        filter.data.push( item );
                    }
                }
                SA.setter( 'pc_sele',filter );
            }else{
                SA.setter( 'pc_sele',{ data: [item] } );
            }
        }
    }

    // 渲染结构到页面
    render(
        <Tabswitch data={navData} listClass={'tab-nav'} itemStyle={{width:'150px'}} itemDefaultMethod={tabItemDefaultMethod}>
            <Uls data={cntData} listClass={'fox'} itemDefaultMethod={ulItemDefaultMethod}/>
            <SelectBar itemDefaultMethod={seleDefaultMethod}/>
        </Tabswitch>
        ,document.getElementById(ele)
    )
}

module.exports = likePConline





//参考
// from http://jsfiddle.net/aabeL/1/
// https://github.com/jeroencoumans/react-scroll-components
// https://github.com/guillaumervls/react-infinite-scroll
// http://levi.cg.am/archives/3099   //getBoundingClientRect
//
// http://www.cnblogs.com/dingyingsi/archive/2013/09/24/3337813.html   scrollHeight
