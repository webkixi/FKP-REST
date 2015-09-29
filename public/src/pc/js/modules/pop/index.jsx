var libs = require('libs/libs');
var Pop = require('./_component/_pop')()
var render = React.render;


function popwin(data, cb){
    var container = document.getElementById('pop-box');
	if(!container)
		libs.node.append('body','div',{id:'pop-box'})

    ele = document.getElementById('pop-box');

    if(data===true)
        return Pop
    else{
        render(
            <Pop data={data} itemMethod={cb} />,
            ele
        )
    }
}

module.exports = popwin
