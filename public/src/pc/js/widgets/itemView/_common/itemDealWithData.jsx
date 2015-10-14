 /*
 * 数据处理部分
 * f_div / f_li 的公共数据处理部分
 */

 var libs = require('libs/libs');

 function dealWithData(){
    var clsName = "item wid-3";
    var itemStyle = '';
    var sty = {};
    var wid = '';
    var data = this.props.data;
    var items = [];

    if(this.props.itemClass){
        clsName = "item "+this.props.itemClass;
    }
    if(this.props.itemStyle){
        clsName = 'item';
        sty = this.props.itemStyle;
    }

    var icon = this.state.icon;
    var iconPre = this.state.iconPre;


    if(data){
        if(!Array.isArray(data)){
            var body;
            var footer;
            var dot;

            var bodys = []
            var footers = []
            var dots = []

            var headerDom;
            var bodyDom;
            var footerDom;
            var dotDom;

            var k1 = data.id||'',
                v1 = data.url||'javascript:void();',

                k2 = data.title||data.caption||data.catName||data.model||data.quality||data.vender||(typeof data==='string'||typeof data==='number'?data:'')||'',
                v2 = data.attr||'',

                v3 = data.value||'';

                if(data.img){
                    if(Array.isArray(data.img)){
                        var tmp_k2 = [];
                        data.img.map(function(pic,j){
                            tmp_k2.push(<img data-iid={i} key={'img'+j} src={pic} alt={k2}/>)
                        })
                        // k2 = <div className={'pics'}>{tmp_k2}</div>;
                        k2 = tmp_k2;
                    }
                    else
                        k2 = <img src={data.img} alt={k2}/>
                }

            if(data.body){
                body = data.body;
                if(!Array.isArray(body))
                    body = [ body ]

                body.map(function(item,i){
                    if(typeof item==='string'|| typeof item==='number'){
                        bodys.push(<p data-pid={i} key={'body'+i}>{item}</p>)
                    }
                    if(libs.getObjType(item)==='Object'){
                        if(!React.isValidElement(item)){
                            var title = item.title||item.caption||item.text;
                            if(title){
                                var cls = item.caption?'caption':'';
                                if(item.url){
                                    bodys.push(<p data-pid={i} key={'body'+i} className={cls}><a href={item.url}>{title}</a></p>)
                                }else
                                    bodys.push(<p data-pid={i} key={'body'+i} className={cls}>{title}</p>)
                            }else{
                                var ppp = item.attr
                                ? <p data-pid={i} data-src={item.attr} key={'body'+i}><em>{item.k}</em>{item.v}</p>
                                : <p data-pid={i} key={'body'+i}><em>{item.k}</em>{item.v}</p>
                                bodys.push(ppp)
                            }
                        }else{
                            bodys.push(item)
                        }
                    }
                })
            }

            if(data.footer){
                footer = data.footer;
                if(!Array.isArray(footer))
                    footer = [ footer ]

                footer.map(function(item,i){
                    if(typeof item==='string'|| typeof item==='number'){
                        footers.push(<p data-pid={i} key={'footer'+i}>{item}</p>)
                    }
                    if(libs.getObjType(item)==='Object'){
                        if(!React.isValidElement(item)){
                            var title = item.title||item.caption||item.text;
                            if(title){
                                var cls = item.caption?'caption':'';
                                if(item.url){
                                    footers.push(<p data-pid={i} key={'footer'+i} className={cls}><a href={item.url}>{title}</a></p>)
                                }else
                                    footers.push(<p data-pid={i} key={'footer'+i} className={cls}>{title}</p>)
                            }else{
                                var ppp = item.attr
                                ? <p data-pid={i} data-src={item.attr} key={'footer'+i}><em>{item.k}</em>{item.v}</p>
                                : <p data-pid={i} key={'footer'+i}><em>{item.k}</em>{item.v}</p>
                                footers.push(ppp)
                            }
                        }else{
                            footers.push(item)
                        }
                    }
                })
            }

            if(data.dot){
                dot = data.dot;
                if(!Array.isArray(dot))
                    dot = [ dot ]

                dot.map(function(item,i){
                    if(typeof item==='string'|| typeof item==='number'){
                        dots.push(<div data-did={i} key={'dot'+i} className={'dot'}><p>{item}</p></div>)
                    }

                    if(libs.getObjType(item)==='Object'){
                        if(React.isValidElement(item)){
                            var it = item;
                            var props = libs.clone(it.props)
                            var styl = props.style;
                            delete props.style;
                            var tmp = React.createElement(it.type, props, it.props.children)
                            dots.push(<div data-did={i} key={'dot'+i} className={'dot'} style={styl}>{tmp}</div>)
                        }
                        else
                            {
                                var lft, top, botm, rht;
                                if(item.position){
                                    lft = item.position.left
                                    top = item.position.top
                                    botm = item.position.bottom
                                    rht = item.position.right
                                }

                                var styl = (function(){
                                    var kkk = {}
                                        lft ? kkk.left = lft : '';
                                        top ? kkk.top  = top : '';
                                        botm ? kkk.bottom = botm : '';
                                        rht ? kkk.right = rht : '';
                                        return kkk;
                                })()

                                var title = item.title||item.caption||item.text||item.price;
                                if(title){
                                    dots.push(<div data-did={i} key={'dot'+i} className={'dot'} style={styl}><p>{title}</p></div>)
                                }
                            }
                    }
                })
            }

            if(k2&&k2!=''){
                headerDom = <div className={"hheader"}><a href={v1} target={'_blank'}>{k2}</a></div>
            }

            if(bodys.length){
                if(data.img && k2.length){
                    bodyDom = <div className={'hbody rebody'}>{bodys}</div>
                }else
                    bodyDom = <div className={'hbody'}>{bodys}</div>
            }

            if(footers.length){
                footerDom = <div className={'hfoot'}>{footers}</div>
            }

            if(dots.length){
                dotDom = dots;
            }

        }
        else{
            var seprete = '、';
            if (typeof this.props.inline === 'string')
                seprete = this.props.inline;

            data.map(function(item,iii){
                var body;
                var footer;

                var bodys = []
                var footers = []

                var headerDom;
                var bodyDom;
                var footerDom;

                var k1 = item.id || '',
                    v1 = item.url||'javascript:;',

                    k2 = item.title||item.caption||item.catName||item.model||item.quality||item.vender||(typeof item==='string'|| typeof item==='number'?item:'')||'',
                    v2 = item.attr||'',

                    v3 = item.value||'';

                    // if(item.img)
                    // 	k2 = <img src={item.img} alt={k2}/>

                    if(item.img){
                        if(Array.isArray(item.img)){
                            var tmp_k2 = [];
                            item.img.map(function(pic,j){
                                tmp_k2.push(<img data-iid={j} key={'img'+j} src={pic} alt={k2}/>)
                            })
                            // k2 = <div className={'pics'}>{tmp_k2}</div>;
                            k2 = tmp_k2;
                        }
                        else
                            k2 = <img src={item.img} alt={k2}/>
                    }



                    if(item.body){
                        body = item.body;
                        if(!Array.isArray(body))
                            body = [ body ]

                        body.map(function(_item,i){
                            if(typeof _item==='string'|| typeof _item==='number'){
                                bodys.push(<p data-pid={i} key={'body'+i}>{_item}</p>)
                            }
                            if(libs.getObjType(_item)==='Object'){
                                if(!React.isValidElement(_item)){
                                    var title = _item.title||_item.caption||_item.text;
                                    if(title){
                                        var cls = _item.caption?'caption':'';
                                        if(_item.url){
                                            bodys.push(<p data-pid={i} key={'body'+i} className={cls}><a href={_item.url}>{title}</a></p>)
                                        }else
                                            bodys.push(<p data-pid={i} key={'body'+i} className={cls}>{title}</p>)
                                    }else{
                                        var ppp = _item.attr
                                        ? <p data-pid={i} data-src={_item.attr} key={'body'+i}><em>{_item.k}</em>{_item.v}</p>
                                        : <p data-pid={i} key={'body'+i}><em>{_item.k}</em>{_item.v}</p>
                                        bodys.push(ppp)
                                    }
                                }else{
                                    bodys.push(_item)
                                }
                            }
                        })
                    }

                    if(item.footer){
                        footer = item.footer;
                        if(!Array.isArray(footer))
                            footer = [ footer ]

                        footer.map(function(_item,i){
                            if(typeof _item==='string'|| typeof _item==='number'){
                                footers.push(<p data-pid={i} key={'footers'+i}>{_item}</p>)
                            }
                            if(libs.getObjType(_item)==='Object'){
                                if(!React.isValidElement(_item)){
                                    var title = _item.title||_item.caption||_item.text;
                                    if(title){
                                        var cls = _item.caption?'caption':'';
                                        if(_item.url){
                                            footers.push(<p data-pid={i} key={'footers'+i} className={cls}><a href={_item.url}>{title}</a></p>)
                                        }else
                                            footers.push(<p data-pid={i} key={'footers'+i} className={cls}>{title}</p>)
                                    }else{
                                        var ppp = _item.attr
                                        ? <p data-pid={i} data-src={_item.attr} key={'footers'+i}><em>{_item.k}</em>{_item.v}</p>
                                        : <p data-pid={i} key={'footers'+i}><em>{_item.k}</em>{_item.v}</p>
                                        footers.push(ppp)
                                    }
                                }else{
                                    footers.push(_item)
                                }
                            }
                        })
                    }

                    if(k2&&k2!=''){
                        headerDom = <div className={"hheader"}><a href={v1} key={'a'+i} target={'_blank'}>{k2}</a></div>
                    }

                    if(bodys.length){
                        // bodyDom = <div className={'hbody'}>{bodys}</div>
                        if(item.img && k2.length){
                            bodyDom = <div className={'hbody rebody'}>{bodys}</div>
                        }else
                            bodyDom = <div className={'hbody'}>{bodys}</div>
                    }

                    if(footers.length){
                        footerDom = <div className={'hfoot'}>{footers}</div>
                    }

                    items.push(
                        (
                            item.img && k2.length
                            ? <div key={'items'+iii} className={'inner'}>{bodyDom}{footerDom}<div className={'pics'}>{k2}</div></div>
                            : bodyDom || footerDom
                                ? <div key={'items'+iii} className={'inner'}>{headerDom}{bodyDom}{footerDom}</div>
                                : <a key={'items'+iii} href={v1} className={data.caption?'caption':''} target={'_blank'}>{k2}</a>
                        )
                    );
                    if(i < (data.length-1))
                        items.push(seprete);
            })
        }
    }

    // var fill = this.props.inline&&Array.isArray(data)
    var fill = Array.isArray(data)
    ? items
    : (
        (
            data.img && k2.length
            ? <div className={'inner'}>{bodyDom}{footerDom}{dotDom}<div className={'pics'}>{k2}</div></div>
            : bodyDom || footerDom
                ? <div className={"inner"}>{headerDom}{bodyDom}{footerDom}{dotDom}</div>
                : <a href={v1} className={data.caption?'caption':''} target={'_blank'}>{k2}</a>
        )
    )

    return {
        k1: k1,
        v1: v1,
        k2: k2,
        v2: v2,
        clsName: clsName,
        sty: sty,
        fill: fill
    }
}

module.exports = dealWithData;
