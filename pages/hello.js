function *hello(oridata) {

    var method = this.method;

    if (method === 'GET') {
        oridata.fkp = 'FKP-REST'
        return oridata;
    }

    if (method === 'POST') {
        var post_data = '我是post数据'
        oridata.pdata = post_data;
        return oridata;
    }

}

module.exports = {
    getData : hello
}
