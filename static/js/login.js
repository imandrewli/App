$(document).ready(function(){

    $("body").css("display", "none");
    $("body").fadeIn(800);

	console.log("this working?");

	
	var $login_button = $("#mylogin");
	var $slogan = $('.slogan');
	$login_button.click(function(){
		console.log("hello");
		$login_button.addClass('animated flipOutY');
		$slogan.addClass('animated flipOutX');
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

