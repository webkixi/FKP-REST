var libs = require('libs/libs');
var Pagi = require('./_component/index')();
var render = React.render;

function pagination(data, begin, ele){

    render(
        <Pagi data={data} begin={begin} listClass={'pagi'}/>,
        document.getElementById(ele)
    )
}

module.exports = pagination
