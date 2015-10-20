var libs = require('libs/libs');
var Text = require('./_component/_text')()
var render = React.render;

libs.addSheet([
    '/css/t/ui/form.css'
    ,'formform'
])

function text(data, ele, cb){

    this.stat = false;
    this.value;
    var _this = this;

    function ntips(msg){
        console.log(msg);
    }

    function dm(){
        var the_text = this;
        var formValide = libs.formValide({popmsg: false});

        function setTextStat(zt, val){
            if(!zt)
                $(the_text).addClass('error')
            else {
                _this.stat = true;
                _this.value = val;
                $(the_text).removeClass('error')
            }
        }

        if(data.valide==='mobile'){
            $(this).find('input').blur(function(){
                var stat = formValide(this.value, 'mobile','请输入正确的手机号码')()
                setTextStat(stat, this.value)
            })
        }
        if(data.valide==='username'){
            $(this).find('input').blur(function(){
                var stat = formValide(this.value, 'username','用户名不能包含非法字符')()
                setTextStat(stat, this.value)
            })
        }
        if(data.valide==='email'){
            $(this).find('input').blur(function(){
                var stat = formValide(this.value, 'email','邮箱地址不正确')()
                setTextStat(stat, this.value)
            })
        }
        if(data.valide==='email'){
            $(this).find('input').blur(function(){
                var stat = formValide(this.value, 'email','邮箱地址不正确')()
                setTextStat(stat, this.value)
            })
        }
        if(data.valide==='verify_m'){
            $(this).find('input').blur(function(){
                var stat = formValide(this.value, 'verify_m','手机验证码不正确')()
                setTextStat(stat, this.value)
            })
        }
    }

    if(data===true)
        return Select
    else{
        render(
            <Text name={ele} data={data} itemDefaultMethod={dm} itemMethod={cb}/>,
            document.getElementById(ele)
        )
    }
}

module.exports = text
