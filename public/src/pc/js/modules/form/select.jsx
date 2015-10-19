var libs = require('libs/libs');
var Select = require('./_component/_select')()
var pop = require('../pop/index')
var render = React.render;


function select(data, ele, cb){
    pop({})
    $(".pop_bg").click(function(){
      SA.setter('Pop',{data:{display:'none'}})
    })

    function dm(){
        var input;
        $(this).click(function(){
            var the = this;
            $("#pop-box").undelegate("p", "click")
            input = $(this).find('input')
            $("#pop-box").delegate("p", "click", function(){
                if($(this).attr('data-src')==='select'){
                    $(input).val($(this).attr('data-value'))
                    $(the).find('span').text($(this).text())
                }
            });
        })
    }

    if(data===true)
        return Select
    else{
        render(
            <Select name={ele} data={data} itemDefaultMethod={dm} itemMethod={cb} listClass={'form select'}/>,
            document.getElementById(ele)
        )
    }
}

module.exports = select
