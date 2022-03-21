$(document).ready(function(){

    /*start transparent navbar while go down in page*/
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.mainNavBar').addClass("sticky");
        }else{
            $('.mainNavBar').removeClass("sticky");
        }

        if(this.scrollY>500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    /*slide up function*/
    $('.scroll-up-btn').click(function (){
        $('html').animate({scrollTop: 0})
    });

    /*end transparent navbar while go down in page*/

    /*start auto type in index page*/
    var typed = new Typed(".typing", {
        strings: ["YouTuber", "Developer", "Blogger", "Designer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
    /*end auto type in index page*/
});

/*start carousel in about page*/
$("#sli").owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
});
/*end carousel in about page*/
