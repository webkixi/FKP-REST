var libs = require('libs/libs');
var DateMobile = require('./_component/_dateMobile')()
var render = React.render;

// libs.addSheet([
//     '/css/t/ui/form.css'
//     ,'formform'
// ])
libs.inject()
    .css(['/css/t/ui/form.css', 'mobiscroll_id'])


// var dpi; //viewport 0.5
// var dview = libs.DocmentView()
// if(window.devicePixelRatio)
//     dpi = window.devicePixelRatio;

function date(data, ele, cb){
    this.stat = false;
    this.value;
    this.ipt;
    this.name;
    var _this = this;

    function dm(){
        _this.ipt = this;
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
        // var mb_config = {
        //     minWidth: (function(){//viewport 0.5
        //         if( dpi )
        //             return 100 * dpi
        //         else {
        //             return 100
        //         }
        //     })(),
        //     maxWidth: (function(){
        //         return dview.width * 0.9;
        //     })(),
        //     height: (function(){
        //         return 150
        //     })(),
        //     dateFormat: 'yy-mm-dd',
        //     dateOrder: 'yymmdd',
        //     setText: '确定',
        //     cancelText: '取消',
        //
        //     onSelect: function(val, inst){
        //         _this.stat = true;
        //         _this.value = val;
        //     }
        // }
        var now = new Date();
        var mb_config = {
            // minWidth: (function(){
            //     if( dpi )
            //         return 100 * dpi
            //     else {
            //         return 100
            //     }
            // })(),
            // maxWidth: (function(){
            //     return dview.width * 0.9;
            // })(),
            // height: (function(){
            //     return 150
            // })(),
            dateFormat: 'yy-mm-dd',
            display: 'bottom', //modal,inline,bottom,top,display
            dateOrder: 'yymmdd',
            // minDate: new Date(now.getFullYear(), now.getMonth(), now.getDate()),  // More info about minDate: http://docs.mobiscroll.com/2-17-1/datetime#!opt-minDate
            // invalid: ['w0', 'w6', '5/1', '12/24', '12/25'],                        // More info about invalid: http://docs.mobiscroll.com/2-17-1/datetime#!opt-invalid
            setText: '确定',
            cancelText: '取消',

            onSelect: function(val, inst){
                _this.stat = true;
                _this.value = val;
            }
        }

        if ( data.min )
            mb_config.minDate = new Date(data.min);

        if ( data.max )
            mb_config.maxDate = new Date(data.max);

        $(this).find('input').mobiscroll().date( mb_config );  //datetime是有具体时间的  date是没有时分秒的

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
