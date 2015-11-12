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

        function setTextStat(zt, ipt){
            if(!zt){
                $(the_text).addClass('error')
                _this.stat = false
            }
            else {
                _this.stat = true;
                $(the_text).removeClass('error')
            }
            _this.value = ipt.value;
            _this.name = ipt.name;
            _this.ipt = ipt;
        }

        if(data.valide==='username'){
                $(this).find('input').blur(function(){
                    var stat = formValide(this.value, 'username','用户名不能包含非法字符')()
                    setTextStat(stat, this)
                })
            }
        else
            if(data.valide==='email'){
                $(this).find('input').blur(function(){
                    var stat = formValide(this.value, 'email','邮箱地址不正确')()
                    setTextStat(stat, this)
                })
            }
        else
            if(data.valide==='email'){
                $(this).find('input').blur(function(){
                    var stat = formValide(this.value, 'email','邮箱地址不正确')()
                    setTextStat(stat, this)
                })
            }
        else{
            $(this).find('input').blur(function(){
                setTextStat(true, this)
            })
        }

    }

    if(data===true)
        return Text
    else{
        render(
            <Text name={ele} data={data} itemDefaultMethod={dm} itemMethod={cb}/>,
            document.getElementById(ele)
        )
    }
}

module.exports = text
