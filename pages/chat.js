const libs = include('libs/libs')
function *chat(oridata) {

    var method = this.method;

    if (method === 'GET') {
        oridata.fkp = 'FKP-REST'
        // var location = this.local;
        // if (location.query.xxx==='123'){
        //     this.status = 301
        //     this.redirect('http://www.163.com')
        // }

        return oridata;
    }

    if (method === 'POST') {
        var post_data = '我是post数据'

        try {
            var body = yield libs.$parse(this);
            if (!body){
                this.throw("The topic body is empty", 400);
            }
            var rtn_data = {
                user: body.user||'匿名',
                message: body.message
            }
            // post_data = body.message
            wspush('imchat', rtn_data)
            return [];
        } catch (e) {
            console.log(e);

        } finally {
            post_data = '你看看，我是websocket的数据'
        }


    }

}

module.exports = {
    getData : chat
}
