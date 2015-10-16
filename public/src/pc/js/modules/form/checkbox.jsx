var libs = require('libs/libs');
var Ckb = require('./_component/_checkbox')()
var render = React.render;


function Checkbox(data, ele, cb){
    console.log('data');
    if(data===true)
        return Ckb
    else{
        render(
            <Ckb data={data} itemMethod={cb} listClass={'form checkbox'}/>,
            document.getElementById(ele)
        )
    }
}

module.exports = Checkbox
