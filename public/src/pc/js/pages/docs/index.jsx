var libs = require('libs/libs')
var _ = require('lodash')
var Mtree = require('modules/menutree').pure()

$('li.category a').click(function(e){
    e.stopPropagation()
})

$('li.category').find('h4').click(function(){
    $(this).find('.iconfont').toggleClass('icon-xiala').toggleClass('icon-sanjiao')
    $(this).next('ul').toggle()
})

// require('libs/api').req('/docs',{mt: 'test'})
// .then(function(data){
//     React.render(
//         <Mtree data={data.docs} listMethod={lm}/>,
//         document.getElementById('mtree')
//     )
// })


//英文目录映射中文
var cl_json = require('./catalog.json')  //目录英文名，中文名映射json文件
var tmp = Object.keys(cl_json)
$('.catalog').each(function(i, item){
    var title = $(item).html()
    if (_.indexOf(tmp, title)>-1){
        $(item).html(cl_json[title])
    }
})
