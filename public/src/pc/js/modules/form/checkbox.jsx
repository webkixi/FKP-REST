var libs = require('libs/libs');
var Ckb = require('./_component/_checkbox')()
var render = React.render;

libs.addSheet([
    '/css/t/ui/form.css'
    ,'formform'
])

function Checkbox(data, ele, cb){

    this.value=0;
    this.ipt;
    this.name;
    var _this = this;

    function dm(){
        var thechk = this;
        $(this).click(function(){
          var chkspan = $(this).find(".chk_span");
          chkspan.toggleClass('active');
          var chkb = $(this).find("input")[0];
          if(chkb.value==0){
              chkb.value=1;
              _this.value = 1;
          }else{
              chkb.value=0;
              _this.value = 0;
          }
          cb.call(thechk, _this)
        })
    }

    if(data===true)
        return Ckb
    else{
        render(
            <Ckb name={ele} data={data} itemDefaultMethod={dm} itemMethod={cb} listClass={'form checkbox'}/>,
            document.getElementById(ele)
        )
    }
}

module.exports = Checkbox
