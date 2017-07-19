$(document).ready(function(){

    $("body").css("display", "none");
    $("body").fadeIn(800);

	console.log("this working?");

	
	var $login_button = $("#mylogin");
	var $slogan = $('.slogan');
	var $form = $('.form');
	var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	$login_button.click(function(){
		console.log("hello");
		$login_button.addClass('animated flipOutY');
		$slogan.addClass('animated flipOutX').one(animationEnd, function(){
			$form.addClass('animated flipInY');
			$form.css('z-Index' , '2');
			$form.css('opacity' , '1');
			$('login-button').css('z-Index', '1');
		});

	});
	
	
	
    $("a").click(function(event){
        event.preventDefault();
        linkLocation = this.href;
        $("body").fadeOut(1000, redirectPage);      
    });
         
    function redirectPage() {
        window.location = linkLocation;
    }
	
	
	



});

