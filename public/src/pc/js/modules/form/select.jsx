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
    this.selected;
    var _this = this;



    pop({})
    $(".pop_bg").click(function(){
      SA.setter('Pop',{data:{display:'none'}})
    })

    this.empty = function(){
        var input = $(_this.ipt).find('input')
        input[0].value = '';
        _this.value = ''
        _this.text = ''
        _this.stat = false;
        $(_this.ipt).find('.body span').removeClass('active')
        $(_this.ipt).find('.body span').text('请选择')
    }

    var close = true;
    if(data.popclose===false) close = data.popclose;
    function dm(){
        _this.ipt = this;
        var input;
        $(this).click(function(){
            var the = this;
            $("#pop-box").undelegate("p", "click")
            input = $(this).find('input')

            //弹窗中p的data-src为select时，会响应点击
            $("#pop-box").delegate("p", "click", function(){
                if($(this).attr('data-src')==='select'){
                    var val = $(this).attr('data-value')
                    var text = $(this).text();
                    if(_this.selected && typeof _this.selected==='function')
                        _this.selected.call(_this,text,val)
                    _this.stat = true;
                    $(_this.ipt).removeClass('error')
                    _this.value = val;
                    _this.text = text;
                    $(input).val(val)
                    $(the).find('.body span').addClass("active").text(text)
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
