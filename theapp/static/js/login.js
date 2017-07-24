$(document).ready(function(){
    $("body").css("display", "none");
    $("body").fadeIn(800);
    var $login_button = $("#mylogin");
    var $slogan = $('.slogan');
    var $form = $('.form');
    var $welcome= $('#welcome');
    var $login_div = $('.login-button');
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $login_button.click(function(){
        $welcome.css('z-Index', '3');
        $login_button.addClass('animated flipOutY');
        $slogan.addClass('animated flipOutX').one(animationEnd, function(){
            $form.addClass('animated flipInY').one(animationEnd, function(){
                $(this).removeClass('animated flipInY');
                $login_div.remove();
            });
            $welcome.css('opacity' , '1');
        });
    });
    
    
    $('.tab a').on('click', function (e) {  
        e.preventDefault(); 
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
        target = $(this).attr('href');
        $('.tab-content > div').not(target).hide();
        $(target).fadeIn(600);
    
    });


    var flag = true;
    var form = $('form').on('submit', function ( event ){
        event.preventDefault();
        var firstName = $('input.firstName').val();
        var lastName   = $('input.lastName').val();
        var emailAddress = $('input.emailAddress').val();
        var alias = $('input.alias').val();

        var user = {
            firstName: firstName,
            lastName: lastName,
            email: emailAddress,
            alias: alias 
        }

        flag = false;
        for (var key in user) {
            if(user[key]==false) {
                $form.addClass('animated shake').one(animationEnd, function(){
                    $(this).removeClass('animated shake');
                    });
                flag = true;
            }
        }

        if (flag == false) {
                $('input.firstName').val('');
                $('input.lastName').val('');
                $('input.emailAddress').val('');
                $('input.alias').val('');
                setTimeout(wait_link, 10);    
        }
        if (typeof(Storage) !== "undefined") {
            sessionStorage.setItem("alias", user.alias)
            console.log(sessionStorage.getItem("alias"));
        }
    });

    function wait_link (){
        linkLocation = "/chat/general";
        $("body").fadeOut(1000, redirectPage);      
        function redirectPage() {
            window.location = linkLocation;
        }
    }
});





