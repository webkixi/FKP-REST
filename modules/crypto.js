/**
 * Module dependencies.
 */
//加密
// {param1}, string 混淆字符串
// {param2}, string 密码
function encrypt(str, secret) {
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
}
//解密
// {param1}, string 混淆字符串，必须与encrypt的str为相同字符串
// {param2}, string 密码
function decrypt(str, secret) {
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

module.exports = {
    en: encrypt,
    de: decrypt
}
