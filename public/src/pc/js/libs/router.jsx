var libs = require('./libs')

function router(name, back){
    // if(typeof name!=='string') return;
    var url = libs.urlparse(location.href);

    if(back){
        if(typeof router.cb === 'function'){
            router.cb.call(this, name)
            return;
        }
    }

    if(name.indexOf('/')===0 || name.indexOf('http')===0){
        console.log('-------router jump ------');
        if(name.indexOf('#')>-1){
            var next = name.substring(0,name.indexOf('#'))
            if(url.path==next){
                var hash = name.substring(name.indexOf('#')+1)
                router(hash);
            }else{
                window.location.href = name
            }
        }else{
            window.location.href = name
        }
    }else{
        var _uri;
        if(url.params.hash){
            var tmp = 'hash='+url.params.hash;
            var len = Object.keys(url.params)
            var href='';
            if(len.length===1){
                href = url.source.replace('?'+tmp,'')
            }else{
                href = url.source.replace(tmp,'')
            }
            url = libs.urlparse( href );

            if(!back){
                SA.setter('_HISTORY', url);
                _uri = href+'#'+name;
                historyStat({uri: _uri}, null, _uri)
            }
        }else{
            if(!back){
                SA.setter('_HISTORY', url);
                _uri = name;
                historyStat({uri: _uri}, null, '#'+name)
            }
        }

        libs.addSheet(['#pageloading{width:2rem;height:2rem;\n\
            position:absolute;\n\
            top:0;left:0;right:0;bottom:0;margin:auto;}','loadingcss' ])
        libs.node.append('body','img',{id: 'pageloading',src: '/images/loading1.gif'})

        var temp = SA.getter(name)
        if(temp){
            router.cb = false;
            console.log('==='+name);
            SA.setter(name,{})
        }
    }
}

router.goback = function(){
    var history = SA.getter('_HISTORY').data;
    if(history.hash){
        router(history.hash)
    }else{
        window.location.href = history.source
    }
}

router.clear = function(){

    setTimeout(function(){
        $('#pageloading').remove()
    },500)
    // var load = document.getElementById('loading')
    // libs.node.remove(load)
}

//html5
if(window.history.pushState){
    libs.addEvent(window, 'popstate', function(e){
        var val = e.state;
        if(val && val.uri ){
            router(val.uri, true);
        }else{
            router(val, true)
        }
    })
}

function historyStat(args, title, uri){
    window.history.pushState(args, title, uri)
}

var route = function(name, handle){
    if(typeof SA!=='object'){
        console.log("don't set global SA variable ");
        return;
    }

    if(libs.getObjType(name)==='Object'){
        var keys = Object.keys(name);
        keys.map(function(item, i){
            SA.setter(item, name[item])
        })
    }

    if(typeof name === 'string'){
        if(typeof handle === 'function')
            SA.setter(name, handle)
    }
}

module.exports = {
    router: router,
    route: route
}

/*
* 每一条路由都必须匹配一个方法
* init route
* 'abc'  name: {string}
* abc   value: {function}
*/
// route({
//     'abc': abc,
//     'bcd': bcd
// });
