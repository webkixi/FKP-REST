var libs = require('libs/libs');
var Select = require('./_component/_select')()
var pop = require('../pop/index')
var render = React.render;

libs.addSheet([
    '/css/t/ui/form.css'
    ,'formform'
])

function select(data, ele, cb){

    this.stat = false;
    this.value;
    this.text;
    this.ipt;
    var _this = this;

    pop({})
    $(".pop_bg").click(function(){
      SA.setter('Pop',{data:{display:'none'}})
    })


    var close = true;
    if(data.popclose===false) close = data.popclose;
    function dm(){
        _this.ipt = this;
        var input;
        $(this).click(function(){
            var the = this;
            $("#pop-box").undelegate("p", "click")
            input = $(this).find('input')
            $("#pop-box").delegate("p", "click", function(){
                if($(this).attr('data-src')==='select'){
                    var val = $(this).attr('data-value')
                    var text = $(this).text();
                    _this.stat = true;
                    _this.value = val;
                    _this.text = text;
                    $(input).val(val)
                    $(the).find('span').addClass("active").text(text)
                    if(close)
                        SA.setter('Pop',{data:{display:'none'}})
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
