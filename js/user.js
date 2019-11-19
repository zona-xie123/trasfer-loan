if ($(window).width() > 800) {
		// 選單置頂
		$(window).scroll(function () {
			if ($(this).scrollTop() > 480) {
		
				$('header').addClass('headFixed').addClass('animated slideInDown');
			} else {
				
				$('header').removeClass('headFixed animated slideInDown');
			}
			
		});
}

$(document).ready(function () {
		 //faq_down
		 $('.faq .qa-section').each(function(i) {
		
			var _number = i;
			$(this).click(function() {
				$(this).toggleClass('active-qa')
					$('.answer').eq(_number).slideToggle(200);
			});
	});
	var gotop = $('.top-btn');
	// gotop.click(function () {
	// 	$('html,body').animate({
	// 		scrollTop: 0
	// 	}, 500);
	// });
	$(window).scroll(function () {
		if ($(this).scrollTop() > 200) {
			gotop.fadeIn();
		} else {
			gotop.stop().fadeOut();
		}
	});
		// 選單置頂
		$(window).scroll(function () {
			if ($(this).scrollTop() > 480) {
				$('.sub-nav').addClass('navFixed').addClass('animated slideInDown');
				
			} else {
				$('.sub-nav').removeClass('navFixed animated slideInDown');
			
			}
			
		});
		$(window).scroll(function () {
			if ($(this).scrollTop() > 180) {
				$('.footer_fix').addClass('footerFixed').addClass('animated slideInUp');
			} else {
				
				$('.footer_fix').removeClass('footerFixed animated slideInUp');
			}
			
		});
			//錨點
	function scrollNav() {
		$('.sub-nav a').click(function () {

			//Animate
			$('html, body').stop().animate({
				scrollTop: $($(this).attr('href')).offset().top - 160
			}, 400);
			return false;
		});
		$('.scrollTop a').scrollTop();
	}
	//scroll-down
	$('.scroll-down a').bind('click', function(event) {
		// alert("hi");
		 var $anchor = $(this);
		 $('html, body').stop().animate({
		   scrollTop: $($anchor.attr('href')).offset().top
		 }, 1500);
		 event.preventDefault();
	   });
	//錨點
	function scrollNav() {
		$('.sub-nav a').click(function () {

			//Animate
			$('html, body').stop().animate({
				scrollTop: $($(this).attr('href')).offset().top - 160
			}, 400);
			return false;
		});
		$('.scrollTop a').scrollTop();
	}
	scrollNav();
	if ($(window).width() < 768) {
		$(window).scroll(function () {
			last = $("body").height() - $(window).height()
			if ($(window).scrollTop() >= last) {
				$(".footer_fix").hide()
			} else {
				$(".footer_fix").show()
			}
		})
	}


	$('.notice-con').click(function () {
		event.preventDefault();
		$('.notice .con').slideToggle();
	})

	$('.scroll-down').bind('click', function(event) {
		// alert("hi");
		 var $anchor = $(this);
		 $('html, body').stop().animate({
		   scrollTop: ($($anchor.attr('href')).offset().top - 100)
		 }, 1500);
		 event.preventDefault();
	   });


	$('.main-nav ul .dropdown').each(function () {
		$(this).find('.sec').click(function () {

			event.preventDefault();
			$(this).next('.dropdown-menu').toggleClass('active-dropdown-menu')
		})
	})
	AOS.init();


	$('a.target-burger').click(function (e) {
		$('.main-nav .container, nav.main-nav, a.target-burger').toggleClass('toggled');
		$('header').toggleClass('toggled-fixed');
		e.preventDefault();
	});
})