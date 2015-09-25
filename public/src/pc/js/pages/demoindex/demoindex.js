$('.fnode').hide()
$('.dnode').click(function(){
    $(this).siblings(".fnode").toggle()
})

function mkQrCode(elem,content){
    if(!elem) return;
    if(!content) return;
    var qrcode = new QRCode(elem, {
       width : 96,//设置宽高
       height : 96
    });
    qrcode.makeCode(content);
}

$('.qrcode').on('click', function(){
    if($(this).find('canvas').length){
        $(this).html('二维码');
    }else{
        var cnt = $(this).attr('value');
        mkQrCode(this, cnt);
    }
})
