function mkQrCode(elem,content){
    if(!elem) return;
    if(!content) return;
    var qrcode = new QRCode(elem, {
       width : 96,//设置宽高
       height : 96
    });
    qrcode.makeCode(content);
}

$('.qrcode').one('click', function(){
    var cnt = $(this).attr('value');
    mkQrCode(this, cnt);
})
