var libs = require('libs/libs');
var DateMobile = require('./_component/_mobiscroll_treelist')()
var render = React.render;

libs.inject()
    .css(['/css/t/ui/form.css', 'mobiscroll_id'])


function date(data, ele, cb){
    this.stat = false;
    this.value;
    this.ipt;
    this.name;
    var _this = this;

    function dm(){
        _this.ipt = this;

        var now = new Date();
        var mb_config = {
            labels: ['Region', 'Country'],
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

        $(this).find('input').mobiscroll().treelist( mb_config );  //treelist 树形列表

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
