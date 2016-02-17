var libs = require('libs/libs');
var Textarea = require('./_component/_textarea')()
var render = React.render;

libs.addSheet([
    '/css/t/ui/form.css'
    ,'formform'
])

function select(data, ele, cb){

    if(data===true)
        return Select
    else{
        render(
            <Textarea name={ele} data={data} itemMethod={cb} listClass={'form textarea'}/>,
            document.getElementById(ele)
        )
    }
}

module.exports = select
