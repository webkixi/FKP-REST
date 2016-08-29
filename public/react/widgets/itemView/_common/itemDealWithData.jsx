/*
* 数据处理部分
* f_div / f_li 的公共数据处理部分
*/

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

           if(data.itemClass){
               clsName = "item "+data.itemClass;
           }
           if(data.itemStyle){
               clsName = 'item';
               sty = data.itemStyle;
           }

           var k1 = data.id||'',
               v1 = data.url||'javascript:void();',

               k2 = data.title||data.caption||data.catName||data.text
                   ||data.model||data.quality||data.vender
                   ||(typeof data==='string'||typeof data==='number'||React.isValidElement(data)?data:'')||'',
               v2 = data.attr||'',

               k3,
               v3 = data.value||'';

               if (data.url){
                   k2 = <a href={v1} target="_blank">{k2}</a>
               }


               function lazyimg(img, idf){
                   if (img.indexOf('$$$')>-1){
                       var tmp = img.split('$$$')
                       if (tmp.length===2){
                           if (idf)
                               return <li key={'img'+idf} className='himg-item lazyimg' data-imgsrc={tmp[1]} data-imgtmp={tmp[0]} />
                            //    return <li className='himg-item' data-imgsrc={tmp[1]} data-imgtmp={tmp[0]}><img data-iid={idf} key={'img'+idf} data-src={tmp[1]} src={tmp[0]} alt={k2}/></li>
                           else
                               return <div className='himg lazyimg' data-imgsrc={tmp[1]} data-imgtmp={tmp[0]}/>
                            //    return <div className='himg-item'><img data-src={tmp[1]} src={tmp[0]} alt={k2}/></div>
                       }
                   }
                   else{
                       if (idf)
                           return <li data-iid={idf} key={'img'+idf} data-imgsrc={img} className="himg-item lazyimg" title={k2}></li>
                       else
                           return <div className="himg lazyimg" data-imgsrc={img} title={k2}></div>
                   }
               }

               // 处理title及url
               // 处理li的相关数据
               function normalItem(obj){
                   if (typeof obj === 'string' || React.isValidElement(obj)){
                       return obj;
                   } else
                   if (_.isArray(obj)){
                       if (obj[0].li){
                           return obj.map(function(_obj_item, i){
                               return (
                                   <div className={_obj_item.className||''}>
                                       {_obj_item.title}
                                       {dealWithLi(_obj_item.li)}
                                   </div>
                               )
                           })
                       }
                       else {
                           return dealWithLi(obj)
                       }
                   }
                   else {
                       if(_.isObject(obj)){
                           if (obj.title){
                               if (obj.url) {
                                   return <a href={obj.url} >{obj.title}</a>
                               }
                               if (obj.li){
                                   return (
                                       <div className={obj.className||''}>
                                           {obj.title}
                                           {dealWithLi(obj.li)}
                                       </div>
                                   )
                               }
                               return obj.title;
                           }
                           else
                           if (obj.li){
                               return dealWithLi(obj.li)
                           }
                           else {
                               return '';
                           }
                       }
                   }

               }

               function dealWithLi(prop_li){
                   var lis = []
                   if(Array.isArray(prop_li)){
                       prop_li.map(function(li_item, li_i){
                           var _item = normalItem(li_item);
                           if (Array.isArray(li_item)){
                               lis.push(<li className="nextLevel2" key={'li-'+li_i} data-id={'li-'+li_i}>{_item}</li>)
                           }
                           else {
                               lis.push(<li key={'li-'+li_i} data-id={'li-'+li_i}>{_item}</li>)
                           }
                       })
                       return <ul>{lis}</ul>
                   }
                   else{
                    //    lis = []
                       lis.push(<li key={'li-'+li_i}>{prop_li}</li>)
                       return <ul>{lis}</ul>
                   }
               }

               if(data.li){
                   k3 = dealWithLi(data.li)
               }

               if(data.img){
                   if(Array.isArray(data.img)){
                       var tmp_k2 = [];
                       data.img.map(function(pic,j){
                           // tmp_k2.push(<img data-iid={j} key={'img'+j} src={pic} alt={k2}/>)
                           var _img = lazyimg(pic, j)
                           tmp_k2.push(_img)
                       })
                       // k2 = <div className={'pics'}>{tmp_k2}</div>;
                       v3 = k2 = <ul className="himg">{tmp_k2}</ul>;
                   }
                   else{
                       v3 = k2 = lazyimg(data.img)
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
                   if(_.isObject(item)){
                       var cls = item.caption?'hb-item caption':'hb-item';
                       if(!React.isValidElement(item)){
                           var title = item.title||item.caption||item.text;

                           if (title &&
                               typeof title==='string' &&
                               item.url &&
                               typeof item.url==='string'
                           ){
                               title = <a href={item.url}>{title}</a>
                           }

                           var ppp = !item.attr
                               //没有attr
                               ? (function(){
                                   if (item.k){  //k v结构
                                       return  <div key={'bodyk-'+i} data-pid={i} className={cls}>{title}{item.k}{item.v}</div>
                                   }

                                   if (item.li){  //li结构
                                       //var lis = []
                                       //item.li.map(function(li_item, li_i){
                                       //   lis.push(<li key={'lis-'+li_i}>{li_item}</li>)
                                       //})
                                       var lis = dealWithLi(item.li)
                                       return <div key={'bodyul-'+i} className={cls}>{title}{lis}</div>
                                   }
                               })()
                               //已定义attr
                               : (function(){
                                   if (item.attr === 'select'){   //h5 自定义下拉菜单
                                       if (item.k)
                                           return <div data-pid={i} data-src={item.attr} className={cls} data-value={item.v} >{title}{item.k}</div>
                                       else
                                       if (item.li){
                                        //    var lis = []
                                        //    item.li.map(function(li_item, li_i){
                                        //        lis.push(<li key={'lis-'+li_i}>{li_item}</li>)
                                        //    })
                                           var lis = dealWithLi(item.li)
                                           return <div key={'bodyul-'+i}  className={cls} data-src={item.attr}>{title}{lis}</div>
                                       }
                                   }
                                   else {
                                       return <div className={cls} data-pid={i} data-src={item.attr} key={'body'+i}>{title}{item.k}{item.v}</div>
                                   }
                               })()

                           bodys.push(ppp)


                            //    if(title){
                            //        if(item.url){
                            //            bodys.push(<div data-pid={i} key={'body'+i} className={cls}><a href={item.url}>{title}</a></div>)
                            //        }else
                            //            bodys.push(<div data-pid={i} key={'body'+i} className={cls}>{title}</div>)
                            //    }else{
                            //        //attr定义一些特殊的状态
                            //        var ppp = !item.attr
                               //
                            //        //没有attr
                            //        ? (function(){
                            //            if (item.k){  //k v结构
                            //                return  <div key={'bodyk-'+i} data-pid={i} className={cls}>{item.k}{item.v}</div>
                            //            }
                               //
                            //            if (item.li){  //li结构
                            //                var lis = []
                            //                item.li.map(function(li_item, li_i){
                            //                    lis.push(<li key={'lis-'+li_i}>{li_item}</li>)
                            //                })
                            //                return <ul key={'bodyul-'+i} className={cls}>{lis}</ul>
                            //            }
                            //        })()
                               //
                            //        //已定义attr
                            //        : (function(){
                            //            if (item.attr === 'select'){   //h5 自定义下拉菜单
                            //                if (item.k)
                            //                    return <div data-pid={i} data-src={item.attr} className={cls} data-value={item.v} >{item.k}</div>
                            //                else
                            //                if (item.li){
                            //                    var lis = []
                            //                    item.li.map(function(li_item, li_i){
                            //                        lis.push(<li key={'lis-'+li_i}>{li_item}</li>)
                            //                    })
                            //                    return <ul key={'bodyul-'+i}  className={cls} data-src={item.attr}>{lis}</ul>
                            //                }
                            //            }
                            //            else {
                            //                return <div className={cls} data-pid={i} data-src={item.attr} key={'body'+i}>{item.k}{item.v}</div>
                            //            }
                            //        })()
                               //
                            //        bodys.push(ppp)

                            //    }
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
                   if(_.isObject(item)){
                       var cls = item.caption?'hf-item caption':'hf-item';
                       if(!React.isValidElement(item)){
                           var title = item.title||item.caption||item.text;

                           if (title &&
                               typeof title==='string' &&
                               item.url &&
                               typeof item.url==='string'
                           ){
                               title = <a href={item.url}>{title}</a>
                           }


                           //attr定义一些特殊的状态
                           var ppp = !item.attr

                           //没有attr
                           ? (function(){
                               if (item.k)  //k v结构
                                   return <div data-pid={i} key={'footer'+i} className={cls}>{title}{item.k}{item.v}</div>

                               if (item.li){  //li结构
                                //    var lis = []
                                //    item.li.map(function(li_item, li_i){
                                //        lis.push(<li key={'lis-'+li_i}>{li_item}</li>)
                                //    })
                                   var lis = dealWithLi(item.li)
                                   return <div key={'footerul'+i} className={cls}>{title}{lis}</div>
                               }
                           })()

                           //已定义attr
                           : (function(){
                               if (item.attr === 'select'){  //h5 自定义下拉菜单
                                   if (item.k){
                                       return <div data-pid={i} data-src={item.attr} className={cls} data-value={item.v} key={'footer'+i}>{title}{item.k}</div>
                                   }
                                   else
                                   if (item.li){
                                    //    var lis = []
                                    //    item.li.map(function(li_item, li_i){
                                    //        lis.push(<li key={'lis-'+li_i}>{li_item}</li>)
                                    //    })
                                       var lis = dealWithLi(item.li)
                                       return <div key={'footerul'+i} data-src={item.attr} className={cls}>{title}{lis}</div>
                                   }
                               }
                               else {
                                   return <div data-pid={i} data-src={item.attr} className={cls} key={'footer'+i}>{title}{item.k}{item.v}</div>
                               }
                           })()

                           footers.push(ppp)

                            //    if(title){
                            //        if(item.url){
                            //            footers.push(<div data-pid={i} key={'footer'+i} className={cls}><a href={item.url}>{title}</a></div>)
                            //        }else
                            //            footers.push(<div data-pid={i} key={'footer'+i} className={cls}>{title}</div>)
                            //    }else{
                            //        //attr定义一些特殊的状态
                            //        var ppp = !item.attr
                               //
                            //        //没有attr
                            //        ? (function(){
                            //            if (item.k)  //k v结构
                            //                return <div data-pid={i} key={'footer'+i} className={cls}>{item.k}{item.v}</div>
                               //
                            //            if (item.li){  //li结构
                            //                var lis = []
                            //                item.li.map(function(li_item, li_i){
                            //                    lis.push(<li key={'lis-'+li_i}>{li_item}</li>)
                            //                })
                            //                return <ul key={'footerul'+i} className={cls}>{lis}</ul>
                            //            }
                            //        })()
                               //
                            //        //已定义attr
                            //        : (function(){
                            //            if (item.attr === 'select'){  //h5 自定义下拉菜单
                            //                if (item.k){
                            //                    return <div data-pid={i} data-src={item.attr} className={cls} data-value={item.v} key={'footer'+i}>{item.k}</div>
                            //                }
                            //                else
                            //                if (item.li){
                            //                    var lis = []
                            //                    item.li.map(function(li_item, li_i){
                            //                        lis.push(<li key={'lis-'+li_i}>{li_item}</li>)
                            //                    })
                            //                    return <ul key={'footerul'+i} data-src={item.attr} className={cls}>{lis}</ul>
                            //                }
                            //            }
                            //            else {
                            //                return <div data-pid={i} data-src={item.attr} className={cls} key={'footer'+i}>{item.k}{item.v}</div>
                            //            }
                            //        })()
                               //
                            //        footers.push(ppp)
                            //    }
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
                       dots.push(<div key={'dot-'+i} data-did={i} key={'dot'+i} className={'dot'}>{item}</div>)
                   }

                   if(_.isObject(item)){
                       if(React.isValidElement(item)){
                           var it = item;
                           var props = _.cloneDeep(it.props)
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
                               if (title &&
                                   typeof title==='string' &&
                                   item.url &&
                                   typeof item.url==='string'
                               ){
                                   title = <a href={item.url}>{title}</a>
                               }
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
               if(React.isValidElement(k2)){
                   headerDom = liDom ? <div className={"hheader"}>{k2}{liDom}</div>
                                     : <div className={"hheader"}>{k2}</div>
               }
               else{
                   headerDom = liDom ? <div className={"hheader"}><a href={v1} target={'_blank'}>{k2}</a>{liDom}</div>
                                     : <div className={"hheader"}><a href={v1} target={'_blank'}>{k2}</a></div>
               }
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
   }

   var fill = Array.isArray(data)
   ? items
   : (
       (
           data.img && k2.length
           ? <div className={'inner'}>{headerDom}{bodyDom}{liDom}{footerDom}{dotDom}<div className={'pics'}>{k2}</div></div>
           : bodyDom || footerDom || dotDom
               ? <div className={"inner"}>{headerDom}{bodyDom}{footerDom}{dotDom}</div>
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
