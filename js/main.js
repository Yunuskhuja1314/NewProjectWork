$('.ask').on('click', function(e) {
    e.preventDefault();
    $('.ask').not($(this)).removeClass('active')
    $('.answer').not($(this)).slideUp(500);
    $(this).toggleClass('active').next().stop().slideToggle(500);
});
$(document).ready(function() {
    
    $("#file").on("change", function(e) {
        
        var files = $(this)[0].files;

        if (files.length >= 2) {
            $("#label_span").text(files.length + " files ready to upload");
            $("#label_span").css("color", "black");
        }else{
            var filename = e.target.value.split('\\').pop();
            $("#label_span").text(filename);
            $("#label_span").css("color", "black");
        }

    })
  var $toggleButton = $('.toggle-button');
  $toggleButton.on('click', function() {
    $(this).toggleClass('button-open');
    if ($(".menubar").hasClass('active')) {
        $(".menubar").removeClass('active');
    }else{
        $(".menubar").toggleClass('active')
    }
  });
  var dept = $('.depts');
  var admn = $("#2");
  var adm = $('.admin');
  var don = $('.donat')
  var func = "donator"

  dept.on('click', function() {
    if(!$(this).hasClass('active')){
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    }
    if($(admn).hasClass('active')){
      $('.main_questionnaire').css("opacity", "0");
      $('.main_update').css("opacity", "1");
      $('.main_questionnaire').css("z-index", "0");
      $('.main_update').css("z-index", "2");
    }else if(!$(admn).hasClass('active')){
      $('.main_questionnaire').css("opacity", "1");
      $('.main_update').css("opacity", "0");
      $('.main_questionnaire').css("z-index", "2");
      $('.main_update').css("z-index", "0");
    }
  });
  adm.on('click', function() {
    if(!$(this).hasClass('active')){
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    }
    console.log(func);
  });
  don.on('click', function() {
    if(!$(this).hasClass('active')){
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    }
    console.log(func);
  });
  if (adm.hasClass('active')) {
    func = "admin"
  }else{
    func = "donat"
  }
});
