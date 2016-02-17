var libs = require('libs/libs');
var Number = require('./_component/_number')()
var render = React.render;

libs.addSheet([
    '/css/t/ui/form.css'
    ,'formform'
])

function number(data, ele, cb){

    this.stat = false;
    this.value;
    this.ipt;
    this.name;
    var _this = this;

    function ntips(msg){
        console.log(msg);
    }

    function dm(){
        var the_text = this;
        _this.ipt = the_text;
        var formValide = libs.formValide({popmsg: false});

        function setNumStat(zt, ipt){
            if(!zt){
                $(the_text).addClass('error')
                _this.stat = false;
            }
            else {
                _this.stat = true;
                $(the_text).removeClass('error')
            }
            _this.value = ipt.value;
            _this.name = ipt.name;
            _this.ipt = ipt;
        }

        if(data.valide==='mobile'){
            $(this).find('input').blur(function(){
                var stat = formValide(this.value, 'mobile','请输入正确的手机号码')()
                setNumStat(stat, this)
            })
        }
        else
            if(data.valide==='verify_m'){
                $(this).find('input').blur(function(){
                    var stat = formValide(this.value, 'verify_m','手机验证码不正确')()
                    setNumStat(stat, this)
                })
            }
        else
            if(data.valide==='money'){
                $(this).find('input').blur(function(){
                    var stat = formValide(this.value, 'money','输入金额不正确')()
                    setNumStat(stat, this)
                })
            }
        else{
            $(this).find('input').blur(function(){
                setNumStat(true, this)
            })
        }

    }

    if(data===true)
        return Number
    else{
        render(
            <Number name={ele} data={data} itemDefaultMethod={dm} itemMethod={cb}/>,
            document.getElementById(ele)
        )
    }
}

module.exports = number
