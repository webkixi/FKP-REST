var libs = require('libs/libs');
var Select = require('./_component/_select')()
var pop = require('../pop/index')
var render = React.render;


function select(data, ele, cb){
    pop({})
    $(".pop_bg").click(function(){
      SA.setter('Pop',{data:{display:'none'}})
    })
    if(data===true)
        return Select
    else{
        render(
            <Select name={ele} data={data} itemMethod={cb} listClass={'form select'}/>,
            document.getElementById(ele)
        )
    }
}

module.exports = select
