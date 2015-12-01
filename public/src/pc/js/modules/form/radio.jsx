var libs = require('libs/libs');
var Radio = require('./_component/_radio')()
var render = React.render;

libs.addSheet([
    '/css/t/ui/form.css'
    ,'formform'
])

function radio(data, ele, cb){

    this.value = true;
    this.ipt;
    this.name;
    this.class;
    var _this = this;

    function dm(){

    }

    if(data===true)
        return Radio
    else{
        render(
            <Radio  data={data} value={data.value} name={data.name} class={data.class} itemDefaultMethod={dm}  itemMethod={cb} listClass={'form radio'}/>,
            document.getElementById(ele)
        )
    }
}

module.exports = radio
