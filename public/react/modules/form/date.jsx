var libs = require('libs/libs');
var Date = require('./_component/_date')()
var render = React.render;

libs.addSheet([
    '/css/t/ui/form.css'
    ,'formform'
])

function date(data, ele, cb){

    this.stat = false;
    this.value;
    this.ipt;
    this.name;
    var _this = this;

    function ntips(msg){
        console.log(msg);
    }

    function dm(){
        var the_date = this;
        _this.ipt = the_date;
        var formValide = libs.formValide({popmsg: false});

        function setDateStat(zt, ipt){
            if(!zt){
                $(the_date).addClass('error')
                _this.stat = false
            }
            else {
                _this.stat = true;
                $(the_date).removeClass('error')
            }
            _this.value = ipt.value;
            _this.name = ipt.name;
            _this.ipt = ipt;
        }

        if(data.valide==='license'){
                $(this).find('input').blur(function(){
                    var stat = formValide(this.value, 'license','上牌时间格式出错')()
                    setDateStat(stat, this)
                })
            }
        else{
            $(this).find('input').blur(function(){
                setDateStat(true, this)
            })
        }

        if ( data.min ){
            $(this).find('input').attr('min', data.min)
        }

        if ( data.max ){
            $(this).find('input').attr('max', data.max)
        }

    }

    if(data===true)
        return Date
    else{
        render(
            <Date name={ele} data={data} itemDefaultMethod={dm} itemMethod={cb}/>,
            document.getElementById(ele)
        )
    }
}

module.exports = date
