var jsdom = require('jsdom');
var env = jsdom.env;
var jsd = jsdom.jsdom;
var jq = require('jquery');
var $,jQuery,$$;

function trim(s){
    // s.replace(/(\/\/)[^\n]*/g,'');
    return s.replace(/(\/\/)[^\n]*/g,'').replace(/(^\s*)|(\s*$)/g, '').replace(/\s+/g,' ');
}

function __getClass(object){
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
};

var tpl = function(tpl,data){   
    return function(fn){        
        var tmp = tpl.split(/[=]{5,}/);         
        var doc = tmp[0];
        var head = [];      
        
        var jqstr = trim(tmp[1].replace(/<[\/]?(script)>/g,''));        
        
        var browseconsoles = jqstr.match(/bc\((.*?)\)[\;]?/g);
        var browseJs = jqstr.match(/bjs\((.*?)\)[\;]?/g);           
        jqstr = jqstr.replace(/bc\((.*?)\)[\;]?[\s]?/g,'');
        jqstr = jqstr.replace(/bjs\((.*?)\)[\;]?[\s]?/g,'');


        env(doc,function(err,window){
            $ = jQuery = jq(window);
            
            function bc(){              
                if(browseconsoles&&browseconsoles.length>0){
                    head.push('<script type="text/javascript">');
                    var b = browseconsoles;
                    for(var i=0; i<b.length; i++){
                        var para = b[i].match(/\((.*)\)/);
                        if(para[0].indexOf("('")>-1){
                            head.push('console.log('+para[1]+');');
                        }else{
                            var tmppara = eval(para[1]);
                            if(__getClass(tmppara)=='Array'){
                                $.each(tmppara,function(j,v){
                                    tmppara[j]=JSON.stringify(v);
                                });
                                head.push("var tmpdata=["+tmppara.toString()+"];\nconsole.log(tmpdata);");
                            }
                            if(__getClass(tmppara)=='Object'){
                                tmppara = JSON.stringify(tmppara);
                                head.push("console.log("+tmppara+");");
                            }                           
                        }
                    }                   
                }               
            }
            function bjs(){
                var bjs = browseJs;
                if(bjs&&bjs.length>0){
                    if(!browseconsoles) head.push('<script type="text/javascript">');
                    for(var i=0; i<bjs.length; i++){
                        var para = trim(bjs[i]).match(/\((.*)\)/);
                        if(para[0].indexOf("('")>-1){
                            if(para[1].indexOf('\'\+')>-1){
                                var pos = para[1].indexOf('\'+')
                                ,leftend = para[1].substring(1,pos)
                                ,rightend = eval(para[1].substring(pos+2));
                                para[1] = leftend+rightend+';';
                            }                           
                            head.push(para[1]);
                        }else{  
                            throw new Error('bjs function parameter must be String');
                        }
                    }
                }
            }
            eval(jqstr);
            bc();
            bjs();
            doc = $('html').html();
            head.push('</script>');         
            if(browseconsoles||browseJs)doc = doc.replace('</head>',head.join('\n')+'\n</head>');
            fn(null,doc);
        });
    }
}

var tmpl = function(doc,cb){
    // env(doc,function(err,window){
    //     $ = jQuery = jq(window);
    //     if(cb) cb.call(null,$);
    // });
    
    return function(fn){
        env(doc,function(err,window){
            $ = jQuery = jq(window);        
            fn(null,$);
        });
    }
}

exports.tpl = tpl;
exports.tmpl = tmpl;