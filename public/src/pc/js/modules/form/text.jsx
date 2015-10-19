var libs = require('libs/libs');
var Text = require('./_component/_text')()
var render = React.render;


function select(data, ele, cb){

    if(data===true)
        return Select
    else{
        render(
            <Text name={ele} data={data} itemMethod={cb} listClass={'form text'}/>,
            document.getElementById(ele)
        )
    }
}

module.exports = select
