// 分页演示demo
// 该demo为同构分页效果
// node端代码，请查看 root/pages/pagi.js

import {aaa, bbb, ccc, ddd} from './_module/test';

let xyz = aaa('i am aaa', 111);

let xyz1 = bbb({ x: 'i am bbb', y: 222 });

let xyz2 = ccc({ x: 'i am ccc', y: 333 });

ddd({ x: 'i am ddd', y: 444, z: 'FKPJS' });










// ================ 外部 js/jsx 文件 ===============
import * as pagination from 'react/modules/pagination/pagi';

// 初始化分页数据
// 这个要与服务端数据一致，不然react会出警告
const pageData = {
    	total: 200,
     	per:   20,
    	url:   '/',
     	query: 'page='
    }

const begin = {
    start: 0,
    off: 5
}

// 通过函数方法实现
pagination(pageData, {
    container: 'pagi',
    begin: { start: 0, off: 5 },
    listMethod: bindList
})

function bindList(){
    // list的结构 this
    console.log(this);
    $('.item').click( ()=>{
        alert(2)
    })
}

// pure方法是pagination的一个静态方法，在js中通过  pagination.pure实现

// const Pg = pagination["pure"]();
// React.render(
//     <Pg data={pageData} begin={begin}/>,
//     document.getElementById('pagi')
// );
