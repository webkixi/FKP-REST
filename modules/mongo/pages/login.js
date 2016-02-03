const mongoose = require("mongoose");

function *login(oridata) {

    var method = this.method;

    if (method === 'GET') {}

    if (method === 'POST') {
        var User = mongoose.model('User')
        // create a user a new user
        var testUser = new User({
            username: 'jmar777',
            password: 'Password123'
        });

        // save user to database
        testUser.save(function(err) {
            if (err) throw err;
        });

        var post_data = '我是post数据'
        oridata.pdata = post_data;
        return oridata;
    }

}

module.exports = {
    getData : login
}
