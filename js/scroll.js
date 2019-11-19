// 視窗底部碰到物件-100px就產生fadein
function scrollanimation(a, b) {
    $(a).each(function () {
      // Check the location of each desired element //
      // var objectBottom = $(this).offset().top + $(this).outerHeight();
      var objectBottom = $(this).offset().top;
      var windowBottom = $(window).scrollTop() + $(window).innerHeight() - 100;
      if (objectBottom < windowBottom) {
        $(this).css('opacity', '0').addClass(b);
      } else {
        $(this).removeClass(b)
      }
    });
  };
  
  $(window).scroll(function () {
    //複製以下新增
    // for (var i = 0; i < $(".step-2 .col-sm-4").length; i++) {
    //   $('.step-2 .col-sm-4').eq(i).attr('style', 'animation-delay:' + i / 4 + 's')
    // }
    scrollanimation(".section-title svg", 'line');
  });