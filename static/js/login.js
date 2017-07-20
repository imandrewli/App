$(document).ready(function(){

    $("body").css("display", "none");
    $("body").fadeIn(800);

	console.log("this working?");

	
	var $login_button = $("#mylogin");
	var $slogan = $('.slogan');
	var $form = $('.form');
	var $welcome= $('#welcome');
	var $login_div = $('.login-button');
	var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	$login_button.click(function(){

		$welcome.css('z-Index', '3');
		console.log('welcome should have changed');

		console.log("hello");
		$login_button.addClass('animated flipOutY');
		$slogan.addClass('animated flipOutX').one(animationEnd, function(){
			$form.addClass('animated flipInY').one(animationEnd, function(){
				$(this).removeClass('animated flipInY');
				$login_div.remove();
			});
			$welcome.css('opacity' , '1');
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
	
	
	
	
	//FORMS STUFF
	
	
	$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});

	
	



});

