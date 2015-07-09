 require('../_common/header');

  if (! +"\v1"){
    $("#wrapper img").addClass('fade').delay(800).queue(function(next){
      $("#wrapper h1,#wrapper p").addClass("fade");
      $("#wrapper a.link").css("opacity", 1);
      next();
    });
  }else{
    $("#wrapper img,#wrapper h1,#wrapper p").addClass('fade');
    $('#wrapper a.link').css('opacity', 1);
  }

function lazyGo() {
  var sec = $("#sec").text();
  $("#sec").text(--sec);
  if (sec > 0)
    setTimeout(lazyGo, 1000);
  else
    window.location.href = "/index.html";
}

   setTimeout(lazyGo, 1000);