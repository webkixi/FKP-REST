var _List = require('./_component/_loadlist2')
var render = React.render;
var ITEM = require('widgets/itemView/f_li');



function applist(data, ele, opts){
    var List;
    if (data === true){
        if (typeof ele==='string'){
            return _List(ele);
        }
        return _List();
    }
    else
    if (typeof data === 'string' && data === 'list'){
        var _L = require('widgets/listView/list')
        return _L;
    }
    else{
        List = _List();
    }
    var _cls='list_app_class';
    if (opts.cls){
        _cls = opts.cls
    }
    render(
        <List data={data} listClass={_cls} itemView={ITEM}/>,
        document.getElementById(ele)
    )
}

module.exports = applist;
