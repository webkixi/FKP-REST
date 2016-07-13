/*
 * ts 的测试方法
 * 头文件文件在  public/typings/local/global.d.ts
 * 正常跑请在 atom编辑器+atom-typescript插件
 * 或者 vitrual studio code 编辑器中
 */


// 二逼方法
// 自己定义每一个参数的类型
// sample : aaa('123', 123)
export function aaa(x:string, y:number) : string{
    console.log(x)
    console.log(y)
    return x;
}


// 普通方法
// tpagi.test 是declare过的域名空间
// tpagi.test.aaa是该域名空间下暴露的接口
// 该接口有两个参数{x: string, y: number}
// sample : ccc({x:'123', y:123})
export function ccc(a: tpagi.test.aaa): string {
    console.log(a.x)
    console.log(a.y)
    return a.x;
}



// 文艺方法
// tpagi.test 是declare过的域名空间
// tpagi.test.aaa是该域名空间下暴露的接口
// 该接口有两个参数{x: string, y: number}
// 同构泛型实现，且实现泛型继承
// sample : bbb({x:'123', y:123})
export function bbb<T extends tpagi.test.aaa>(a:T):string{
    console.log(a.x)
    console.log(a.y)
    return a.x
}


// ========== 除了规定的参数，传更多的参数 ============

// 除了定义好的x,y参数，在传多一个z
// ddd({x: '123', y: 123, z: '456'})
export function ddd(a:tpagi.test.moreParam):void{
    console.log(a)
}
