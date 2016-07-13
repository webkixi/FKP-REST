/*
 * JQ 是全局
 * React是全局
 * ReactDom 是全局
 * SAX/SA 是全局
 * 正常请使用 typings 安装相关的头文件 如 typings install jQuery
 * 这里做了粗暴处理
*/
declare let $: any;
declare let jQuery: any;
declare let React: any;
declare let ReactDom: any;
declare let SAX: any;
declare let SA: any;


interface _aaa {
    x: string;
}

interface _bbb {
    y: number;
}

// 接口多继承
interface _ccc extends _aaa, _bbb {
    [key: string]: any;
}

declare namespace tpagi.test {
    // 该接口只能支持x, y
    export interface aaa extends _ccc { }

    // 该接口支持 x, y及更多其他参数
    export interface moreParam extends _ccc {
        [propName: string]: any;
    }
}
