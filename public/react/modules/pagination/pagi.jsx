var _Pagi = require('./_component/index'),
    render = React.render

// itemDefaultMethod form itemMiXin
function idm(_name, itemMethod){
    var _imtd = itemMethod;
    if (typeof _imtd === 'function'){
        _imtd.call(this, _name)
    }
    else{
        $(this).click(function(e){
            e.preventDefault();
            var page = $(this).attr("data-page"),
                jump = $(this).attr("data-jump"),
                tmp = SA.get(_name);

            _jump = jump;
            tmp.begin.start = page-1;
            tmp.begin.jump = _jump;

            SA.setter( _name, tmp );
        })
    }

}

// function pagination(data, begin, ele, cb){
function pagination(data, opts ){

    var noop = false,
        dft = {
            container: '',
            globalName: '_Pagi',
            itemMethod: noop,
            listMethod: noop,
            itemClass: '',
            listClass: 'pagenation wid-12',
            data: {
                total: 200,
                per:   10,
                url:   '/',
                query: 'page='
            },
            begin: { start: 0, off: 7 }
        }

    dft = _.assign(dft, opts)

    if (!dft.container) return false;
    if (data) {
        dft.data = data
    }

    SA.set(dft.globalName, {
        data: data,
        begin: dft.begin
    })

    var Pagi = _Pagi(dft.globalName)

    render(
        <Pagi data={data} begin={dft.begin} itemDefaultMethod={idm} itemMethod={dft.itemMethod} listMethod={dft.listMethod} itemClass={dft.itemClass} listClass={dft.listClass}/>,
        document.getElementById(dft.container)
    )
}

pagination.server = function(){
    return _Pagi(true)
};

module.exports = pagination
