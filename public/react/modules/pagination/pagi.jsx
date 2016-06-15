var libs = require('libs/libs'),
    _Pagi = require('./_component/index'),
    render = React.render,
    req = libs.api.req,
    _ = libs.lodash;

// itemDefaultMethod form itemMiXin
function idm(){

}

// function pagination(data, begin, ele, cb){
function pagination(data, opts ){

    if (data === true){
        return _Pagi()
    }

    var noop = function(){},
        dft = {
            container: '',
            globalName: '_Pagi',
            itemMethod: noop,
            listMethod: noop,
            listClass: 'pagi',
            begin: { start: 0, off: 7 }
        }

    dft = _.assign(dft, opts)

    if (!dft.container) return false;
    if (!data) return false;

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

module.exports = pagination
