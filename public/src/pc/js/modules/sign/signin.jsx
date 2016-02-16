var libs = require('libs/libs');
var Signin = require('./_component/_signin')()
var render = React.render;

var Text = require('modules/form/text')
var Number = require('modules/form/number')

// libs.addSheet([
//     '/css/t/ui/form.css'
//     ,'formform'
// ])

function signin(data, ele, cb){

    function dm(){
        // _car.number = new Text({label:'车牌号',valide: 'username'}, 'number',function(){
        //     $(this).find('input').before('<span class="provice">粤</span>');
        // });
        $(this).html('abcccc')
        cb.call(this)
    }

    render(
        <Signin name={ele} itemDefaultMethod={dm}/>,
        document.getElementById(ele)
    )
}

module.exports = signin
