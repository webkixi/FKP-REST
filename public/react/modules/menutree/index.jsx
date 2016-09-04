var MenuTree = require('./_menutree/index');
var render = React.render;

function menuTree(data, opts ){
    // var noop = false,
    //     dft = {
    //         container: '',
    //         globalName: '_Mtree',
    //         itemMethod: noop,
    //         listMethod: noop,
    //         itemClass: '',
    //         listClass: 'pagenation wid-12',
    //         data: {
    //             total: 200,
    //             per:   10,
    //             url:   '/',
    //             query: 'page='
    //         },
    //         begin: { start: 0, off: 7 }
    //     };
    //
    //     dft = _.assign(dft, opts)
    //
    // if (!dft.container) return false;
    // if (data) {
    //     dft.data = data
    // }
    //
    // var Mt = MenuTree(dft.globalName)
    //
    // render(
    //     <Mt itemDefaultMethod={idm} itemMethod={dft.itemMethod} listMethod={dft.listMethod} itemClass={dft.itemClass} listClass={dft.listClass}/>,
    //     document.getElementById(dft.container)
    // )
}

menuTree.pure = function(){
    return MenuTree()
};

module.exports = menuTree
