var libs = require('libs/libs');
var DateMobile = require('./_component/_dateMobile')()
var render = React.render;

libs.addSheet([
    '/css/t/ui/form.css'
    ,'formform'
])

function date(data, ele, cb){
    console.log(data);
    console.log('data');

    this.stat = false;
    this.value;
    this.ipt;
    this.name;
    var _this = this;

    function ntips(msg){
        console.log(msg);
    }

    function dm(){
        // var the_dateMobile = this;
        // _this.ipt = the_dateMobile;
        // var formValide = libs.formValide({popmsg: false});
        //
        // function setDateMobileStat(zt, ipt){
        //     if(!zt){
        //         $(the_DateMobile).addClass('error')
        //         _this.stat = false
        //     }
        //     else {
        //         _this.stat = true;
        //         $(the_DateMobile).removeClass('error')
        //     }
        //     _this.value = ipt.value;
        //     _this.name = ipt.name;
        //     _this.ipt = ipt;
        // }
        //
        // if(data.valide==='license'){
        //         $(this).find('input').blur(function(){
        //             var stat = formValide(this.value, 'license','上牌时间格式出错')()
        //             setDateMobileStat(stat, this)
        //         })
        //     }
        // else{
        //     $(this).find('input').blur(function(){
        //         setDateMobileStat(true, this)
        //     })
        // }

        // if ( data.min ){
        //     $(this).find('input').attr('min', data.min)
        // }
        //
        // if ( data.max ){
        //     $(this).find('input').attr('max', data.max)
        // }

    }

    if(data===true)
        return DateMobile
    else{
        render(
            <DateMobile name={ele} data={data} itemDefaultMethod={dm} itemMethod={cb}/>,
            document.getElementById(ele)
        )
    }
}

module.exports = date
