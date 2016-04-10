 /*
 * 数据处理部分
 * f_div / f_li 的公共数据处理部分
 */

 var libs = require('../../libs/libs');

 function dealWithData(){
    var clsName = "item";
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

    // var icon = this.state.icon;
    // var iconPre = this.state.iconPre;


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
            var liDom;

            var k1 = data.id||'',
                v1 = data.url||'javascript:void();',

                k2 = data.title||data.caption||data.catName
                    ||data.model||data.quality||data.vender
                    ||(typeof data==='string'||typeof data==='number'||React.isValidElement(data)?data:'')||'',
                v2 = data.attr||'',

                k3,
                v3 = data.value||'';

                if (data.url){
                    if (typeof k2 === 'string')
                        k2 = <a href={v1} target="_blank">{k2}</a>
                }

                function lazyimg(img, idf){
                    if (img.indexOf('$$$')>-1){
                        var tmp = img.split('$$$')
                        if (tmp.length===2){
                            if (idf)
                                return <img data-iid={idf} key={'img'+idf} data-src={tmp[1]} src={tmp[0]} alt={k2}/>
                            else
                                return <img data-src={tmp[1]} src={tmp[0]} alt={k2}/>
                        }
                    }
                    else{
                        if (idf)
                            return <img data-iid={idf} key={'img'+idf} src={img} alt={k2}/>
                        else
                            return <img src={img} alt={k2}/>
                    }
                }

                if(data.li){
                    var lis = []
                    if(Array.isArray(data.li)){
                        lis = []
                        data.li.map(function(li_item, li_i){
                            lis.push(<li key={'li-'+li_i} data-id={'li-'+li_i}>{li_item}</li>)
                        })
                        k3 = <ul>{lis}</ul>
                    }
                    else{
                        lis = []
                        lis.push(<li>{data.li}</li>)
                        k3 = <ul>{lis}</ul>
                    }
                }

                if(data.img){
                    if(Array.isArray(data.img)){
                        var tmp_k2 = [];
                        data.img.map(function(pic,j){
                            // tmp_k2.push(<img data-iid={j} key={'img'+j} src={pic} alt={k2}/>)
                            var _img = lazyimg(pic, j)
                            tmp_k2.push(<li className="himg-item">{_img}</li>)
                        })
                        // k2 = <div className={'pics'}>{tmp_k2}</div>;
                        v3 = k2 = <ul className="himg">{tmp_k2}</ul>;
                    }
                    else{
                        v3 = k2 = <div className="himg">{lazyimg(data.img)}</div>
                    }
                }

            if(data.body){
                body = data.body;
                if(!Array.isArray(body))
                    body = [ body ]

                body.map(function(item,i){
                    if(typeof item==='string'|| typeof item==='number'){
                        bodys.push(<div data-pid={i} key={'body'+i}>{item}</div>)
                    }
                    if(libs.getObjType(item)==='Object'){
                        var cls = item.caption?'hb-item caption':'hb-item';
                        if(!React.isValidElement(item)){
                            var title = item.title||item.caption||item.text;
                            if(title){
                                if(item.url){
                                    bodys.push(<div data-pid={i} key={'body'+i} className={cls}><a href={item.url}>{title}</a></div>)
                                }else
                                    bodys.push(<div data-pid={i} key={'body'+i} className={cls}>{title}</div>)
                            }else{
                                //attr定义一些特殊的状态
                                var ppp = !item.attr

                                //没有attr
                                ? (function(){
                                    if (item.k)  //k v结构
                                        return <div data-pid={i} key={'body'+i} className={cls}>
                                                {item.k}{item.v}
                                            </div>

                                    if (item.li){  //li结构
                                        var lis = []
                                        item.li.map(function(li_item, li_i){
                                            lis.push(<li>{li_item}</li>)
                                        })
                                        return <ul className={cls}>{lis}</ul>
                                    }
                                })()

                                //已定义attr
                                : (function(){
                                    if (item.attr === 'select'){   //h5 自定义下拉菜单
                                        if (item.k)
                                            return <div data-pid={i} data-src={item.attr} className={cls} data-value={item.v} key={'body'+i}>{item.k}</div>
                                        else
                                        if (item.li){
                                            var lis = []
                                            item.li.map(function(li_item, li_i){
                                                lis.push(<li>{li_item}</li>)
                                            })
                                            return <ul className={cls} data-src={item.attr}>{lis}</ul>
                                        }
                                    }
                                    else {
                                        return <div className={cls} data-pid={i} data-src={item.attr} key={'body'+i}>{item.k}{item.v}</div>
                                    }
                                })()

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
                        footers.push(<div data-pid={i} key={'footer'+i}>{item}</div>)
                    }
                    if(libs.getObjType(item)==='Object'){
                        var cls = item.caption?'hf-item caption':'hf-item';
                        if(!React.isValidElement(item)){
                            var title = item.title||item.caption||item.text;
                            if(title){
                                if(item.url){
                                    footers.push(<div data-pid={i} key={'footer'+i} className={cls}><a href={item.url}>{title}</a></div>)
                                }else
                                    footers.push(<div data-pid={i} key={'footer'+i} className={cls}>{title}</div>)
                            }else{
                                //attr定义一些特殊的状态
                                var ppp = !item.attr

                                //没有attr
                                ? (function(){
                                    if (item.k)  //k v结构
                                        return <div data-pid={i} key={'footer'+i} className={cls}>
                                            {item.k}{item.v}
                                        </div>

                                    if (item.li){  //li结构
                                        var lis = []
                                        item.li.map(function(li_item, li_i){
                                            lis.push(<li>{li_item}</li>)
                                        })
                                        return <ul className={cls}>{lis}</ul>
                                    }
                                })()

                                //已定义attr
                                : (function(){
                                    if (item.attr === 'select'){  //h5 自定义下拉菜单
                                        if (item.k){
                                            return <div data-pid={i} data-src={item.attr} className={cls} data-value={item.v} key={'footer'+i}>{item.k}</div>
                                        }
                                        else
                                        if (item.li){
                                            var lis = []
                                            item.li.map(function(li_item, li_i){
                                                lis.push(<li>{li_item}</li>)
                                            })
                                            return <ul data-src={item.attr} className={cls}>{lis}</ul>
                                        }
                                    }
                                    else {
                                        return <div data-pid={i} data-src={item.attr} className={cls} key={'footer'+i}>{item.k}{item.v}</div>
                                    }
                                })()

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
                        dots.push(<div data-did={i} key={'dot'+i} className={'dot'}><div>{item}</div></div>)
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
                                    dots.push(<div data-did={i} key={'dot'+i} className={'dot'} style={styl}><div>{title}</div></div>)
                                }
                            }
                    }
                })
            }

            if (k3) {
                liDom = k3
            }

            if(k2&&k2!=''){
                if(React.isValidElement(k2))
                    headerDom = <div className={"hheader"}>{k2}</div>
                else
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
        // //数组
        // else{
        //     var seprete = '、';
        //     if (typeof this.props.inline === 'string')
        //         seprete = this.props.inline;
        //
        //     data.map(function(item,iii){
        //         var body;
        //         var footer;
        //
        //         var bodys = []
        //         var footers = []
        //
        //         var headerDom;
        //         var bodyDom;
        //         var footerDom;
        //         var dotDom;
        //         var liDom;
        //
        //         var k1 = item.id || '',
        //             v1 = item.url||'javascript:;',
        //
        //             // k2 = item.title||item.caption||item.catName||item.model||item.quality||item.vender||(typeof item==='string'|| typeof item==='number'?item:'')||'',
        //             k2 = item.title||item.caption||item.catName
        //                 ||item.model||item.quality||item.vender
        //                 ||(typeof item==='string'||typeof item==='number'||React.isValidElement(item)?item:'')||'',
        //             v2 = item.attr||'',
        //
        //             k3,
        //             v3 = item.value||'';
        //
        //             if (item.url){
        //                 k2 = <a href={v1} target="_blank">{k2}</a>
        //             }
        //
        //             // if(item.img)
        //             // 	k2 = <img src={item.img} alt={k2}/>
        //
        //             function lazyimg(img, idf){
        //                 if (img.indexOf('$$$')>-1){
        //                     var tmp = img.split('$$$')
        //                     if (tmp.length===2){
        //                         if (idf)
        //                             return <img data-iid={idf} key={'img'+idf} data-src={tmp[1]} src={tmp[0]} alt={k2}/>
        //                         else
        //                             return <img data-src={tmp[1]} src={tmp[0]} alt={k2}/>
        //                     }
        //                 }
        //                 else{
        //                     if (idf)
        //                         return <img data-iid={idf} key={'img'+idf} src={img} alt={k2}/>
        //                     else
        //                         return <img src={img} alt={k2}/>
        //                 }
        //             }
        //
        //             if(item.li){
        //                 var lis = []
        //                 if(Array.isArray(item.li)){
        //                     lis = []
        //                     item.li.map(function(li_item, li_i){
        //                         lis.push(<li key={'li-'+li_i} data-id={'li-'+li_i}>{li_item}</li>)
        //                     })
        //                     k3 = <ul>{lis}</ul>
        //                 }
        //                 else{
        //                     lis = []
        //                     lis.push(<li>{data.li}</li>)
        //                     k3 = <ul>{lis}</ul>
        //                 }
        //             }
        //
        //             if(item.img){
        //                 if(Array.isArray(item.img)){
        //                     var tmp_k2 = [];
        //                     item.img.map(function(pic,j){
        //                         // tmp_k2.push(<img data-iid={j} key={'img'+j} src={pic} alt={k2}/>)
        //                         tmp_k2.push(lazyimg(pic, j))
        //                     })
        //                     // k2 = <div className={'pics'}>{tmp_k2}</div>;
        //                     k2 = tmp_k2;
        //                 }
        //                 else
        //                     k2 = lazyimg(item.img)
        //             }
        //
        //
        //
        //             if(item.body){
        //                 body = item.body;
        //                 if(!Array.isArray(body))
        //                     body = [ body ]
        //
        //                 body.map(function(_item,i){
        //                     if(typeof _item==='string'|| typeof _item==='number'){
        //                         bodys.push(<div data-pid={i} key={'body'+i}>{_item}</div>)
        //                     }
        //                     if(libs.getObjType(_item)==='Object'){
        //                         if(!React.isValidElement(_item)){
        //                             var title = _item.title||_item.caption||_item.text;
        //                             if(title){
        //                                 var cls = _item.caption?'caption':'';
        //                                 if(_item.url){
        //                                     bodys.push(<div data-pid={i} key={'body'+i} className={cls}><a href={_item.url}>{title}</a></div>)
        //                                 }else
        //                                     bodys.push(<div data-pid={i} key={'body'+i} className={cls}>{title}</div>)
        //                             }else{
        //
        //                                 //attr定义一些特殊的状态
        //                                 var ppp = !_item.attr
        //
        //                                 //没有attr
        //                                 ? (function(){
        //                                     if (_item.k)  //k v结构
        //                                         return <div data-pid={i} key={'body'+i}><em>{_item.k}</em>{_item.v}</div>
        //
        //                                     if (_item.li){  //li结构
        //                                         var lis = []
        //                                         _item.li.map(function(li_item, li_i){
        //                                             lis.push(<li>{li_item}</li>)
        //                                         })
        //                                         return <ul>{lis}</ul>
        //                                     }
        //                                 })()
        //
        //                                 //已定义attr
        //                                 : (function(){
        //                                     if (_item.attr === 'select'){   //h5 自定义下拉菜单
        //                                         if (_item.k)
        //                                             return <div data-pid={i} key={'body'+i}><em>{_item.k}</em>{_item.v}</div>
        //                                         else
        //                                         if (_item.li){
        //                                             var lis = []
        //                                             _item.li.map(function(li_item, li_i){
        //                                                 lis.push(<li>{li_item}</li>)
        //                                             })
        //                                             return <ul data-src={_item.attr}>{lis}</ul>
        //                                         }
        //                                     }
        //                                     else {
        //                                         return <div data-pid={i} data-src={_item.attr} key={'body'+i}><em>{_item.k}</em>{_item.v}</div>
        //                                     }
        //                                 })()
        //
        //                                 bodys.push(ppp)
        //                             }
        //                         }else{
        //                             bodys.push(_item)
        //                         }
        //                     }
        //                 })
        //             }
        //
        //             if(item.footer){
        //                 footer = item.footer;
        //                 if(!Array.isArray(footer))
        //                     footer = [ footer ]
        //
        //                 footer.map(function(_item,i){
        //                     if(typeof _item==='string'|| typeof _item==='number'){
        //                         footers.push(<div data-pid={i} key={'footers'+i}>{_item}</div>)
        //                     }
        //                     if(libs.getObjType(_item)==='Object'){
        //                         if(!React.isValidElement(_item)){
        //                             var title = _item.title||_item.caption||_item.text;
        //                             if(title){
        //                                 var cls = _item.caption?'caption':'';
        //                                 if(_item.url){
        //                                     footers.push(<div data-pid={i} key={'footers'+i} className={cls}><a href={_item.url}>{title}</a></div>)
        //                                 }else
        //                                     footers.push(<div data-pid={i} key={'footers'+i} className={cls}>{title}</div>)
        //                             }else{
        //
        //                                 //attr定义一些特殊的状态
        //                                 var ppp = !_item.attr
        //
        //                                 //没有attr
        //                                 ? (function(){
        //                                     if (_item.k)  //k v结构
        //                                         return <div data-pid={i} key={'footers'+i}><em>{_item.k}</em>{_item.v}</div>
        //
        //                                     if (_item.li){  //li结构
        //                                         var lis = []
        //                                         _item.li.map(function(li_item, li_i){
        //                                             lis.push(<li>{li_item}</li>)
        //                                         })
        //                                         return <ul>{lis}</ul>
        //                                     }
        //                                 })()
        //
        //                                 //已定义attr
        //                                 : (function(){
        //                                     if (_item.attr === 'select'){   //h5 自定义下拉菜单
        //                                         if (_item.k)
        //                                             return <div data-pid={i} data-src={_item.attr} data-value={_item.v} key={'footers'+i}>{_item.k}</div>
        //                                         else
        //                                         if (_item.li){
        //                                             var lis = []
        //                                             _item.li.map(function(li_item, li_i){
        //                                                 lis.push(<li>{li_item}</li>)
        //                                             })
        //                                             return <ul data-src={_item.attr}>{lis}</ul>
        //                                         }
        //                                     }
        //                                     else {
        //                                         return <div data-pid={i} data-src={_item.attr} key={'footers'+i}><em>{_item.k}</em>{_item.v}</div>
        //                                     }
        //                                 })()
        //
        //                                 footers.push(ppp)
        //                             }
        //                         }else{
        //                             footers.push(_item)
        //                         }
        //                     }
        //                 })
        //             }
        //
        //             if (k3) {
        //                 liDom = k3
        //             }
        //
        //             if(k2&&k2!=''){
        //
        //                 if(React.isValidElement(k2))
        //                     headerDom = <div className={"hheader"}>{k2}</div>
        //                 else
        //                     headerDom = <div className={"hheader"}><a href={v1} key={'a'+i} target={'_blank'}>{k2}</a></div>
        //             }
        //
        //
        //             if(bodys.length){
        //                 // bodyDom = <div className={'hbody'}>{bodys}</div>
        //                 if(item.img && k2.length){
        //                     bodyDom = <div className={'hbody rebody'}>{bodys}</div>
        //                 }else
        //                     bodyDom = <div className={'hbody'}>{bodys}</div>
        //             }
        //
        //             if(footers.length){
        //                 footerDom = <div className={'hfoot'}>{footers}</div>
        //             }
        //
        //             items.push(
        //                 (
        //                     item.img && k2.length
        //                     ? <div key={'items'+iii} className={'inner'}>{headerDom}{bodyDom}{liDom}{footerDom}{dotDom}<div className={'pics'}>{k2}</div></div>
        //                     : bodyDom || footerDom || dotDom
        //                         ? <div key={'items'+iii} className={'inner'}>{headerDom}{bodyDom}{liDom}{footerDom}{dotDom}</div>
        //                         : liDom
        //                             ? k2 ? <div className="hlist">{k2}{liDom}</div> : liDom
        //                             : k2
        //                             // : <a key={'items'+iii} href={v1} className={data.caption?'caption':''} target={'_blank'}>{k2}</a>
        //                 )
        //             );
        //             if(i < (data.length-1))
        //                 items.push(seprete);
        //     })
        // }
    }

    // var fill = this.props.inline&&Array.isArray(data)
    var fill = Array.isArray(data)
    ? items
    : (
        (
            data.img && k2.length
            ? <div className={'inner'}>{headerDom}{bodyDom}{liDom}{footerDom}{dotDom}<div className={'pics'}>{k2}</div></div>
            : bodyDom || footerDom || dotDom
                ? <div className={"inner"}>{headerDom}{bodyDom}{liDom}{footerDom}{dotDom}</div>
                : liDom
                    ? k2 ? <div className="hlist">{k2}{liDom}</div> : liDom
                    : k2
                    // : <a href={v1} className={data.caption?'caption':''} target={'_blank'}>{k2}</a>
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
