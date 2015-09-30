var libs = require('libs/libs');
var Sidepop = require('./_component/_sidepop')()
var render = React.render;


function sidepop(data, cb){
    var container = document.getElementById('sidepop-box');
	if(!container){
		libs.node.append('body','div',{id:'sidepop-box'})
    }

    ele = document.getElementById('sidepop-box');

    if(data===true)
        return Sidepop
    else{
        render(
            <Sidepop data={data} itemMethod={cb} />,
            ele
        )
    }
}

module.exports = sidepop
