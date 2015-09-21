var libs = require('libs/libs');
var List = require('widgets/listView/list')
var Pt = require('widgets/itemView/pic_title');
var render = React.render;


function slide(data, ele){
    libs.addSheet(['\
    #'+ele+'{overflow: hidden;position: relative;}\n\
    #'+ele+' .list-wrap{visibility: hidden}\n\
    .list-wrap .pagi-point{position:absolute;bottom:0.5rem;text-align:center;font-size:0.5rem;width:100%;}\n\
    .list-wrap .pagi-point a{color:#fff;display: inline-block; margin:0 0.1rem;width:0.8rem;height:0.8rem;border-radius:1rem;background-color:green;}\n\
    .list-wrap .pagi-point a.on{background-color:red;}\n'
    ,'scrolllist']);

    var lmd = function(){
        var that = this;
        var slider = new Swipe(that, {
            startSlide: 2,
            speed: 400,
            auto: 3000,
            continuous: true,
            disableScroll: false,
            stopPropagation: false,
            callback: function(index, elem){
                $(that).find('.pagi-point a').map(function(i, item){
                    if(i===index){
                        $(item).addClass('on');
                    }else
                        $(item).removeClass('on');
                })
            },
            transitionEnd: function(index, elem){}
        });
    }
    var points = (function(){
        var pts = []
        data.map(function(item,i){
            pts.push(<a >{i+1}</a>)
        })
        if(pts.length){
            return <div className={'pagi-point'}>
                {pts}
            </div>
        }else{
            return '';
        }
    })()
    render(
        <List data={data} listMethod={lmd} listClass={'gally_caption'} itemClass={'wid-12'} itemView={Pt}>
            {points}
        </List>,
        document.getElementById(ele)
    )
}

module.exports = slide;
