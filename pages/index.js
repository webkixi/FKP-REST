function *index(oridata) {
    var api = this.include('apis/javaapi')

    var method = this.method;

    if (method === 'GET') {
        oridata.fkp = 'FKP-REST'
        var kkk = yield api.req(this, '$listtopic')
        console.log('======= kkk ========');
        console.log('======= kkk ========');
        console.log('======= kkk ========');
        console.log(kkk);
        return oridata;
    }

    if (method === 'POST') {
        var post_data = '我是post数据'
        oridata.pdata = post_data;
        return oridata;
    }

}

module.exports = {
    getData : index
}
