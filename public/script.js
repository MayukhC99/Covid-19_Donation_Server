$(document).ready(function(){

    $(window).scroll( function(){
        $('.card').each( function(i){
            var bottom_of_object = $(this).offset().top + 50;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object ){
                $(this).animate({'opacity':'1'},3000);
            }
        });
    });

    var i;
    for (i=0; i<5; i++) {
        $(window).trigger( "scroll" );
    }

    $(".btn1").on('click', function(){
        $(".modal-title").text("Donate Groceries");
        $(".modal-body #InputName2").val('Grocery Donation')
    });
    $(".btn2").on('click', function(){
        $(".modal-title").text("Donate Medical");
        $(".modal-body #InputName2").val('Medical Donation')
    });
    $(".btn3").on('click', function(){
        $(".modal-title").text("Donate Food Packets");
        $(".modal-body #InputName2").val('Food Donation')
    });
    $(".btn4").on('click', function(){
        $(".modal-title").text("Donate Clothes");
        $(".modal-body #InputName2").val('Cloth Donation')
    });
    $(".btn5").on('click', function(){
        $(".modal-title").text("Donate Books");
        $(".modal-body #InputName2").val('Book Donation')
    });

    $('.modal').on('hidden.bs.modal', function (e) {
        $(this).find("input,textarea").val('').end();
      })
});

$('.donate_form form').submit(function(){
    alert('Donation successfull recorded. Our team will soon reach you. Please check your email.');
})

$('.contact_form').submit(function(){
    alert('Our team has been informed. Please check your email');
})

//Simulating navbar movements
let prev_nav_flag = $('.navbar-nav li:first-child a');
prev_nav_flag.toggleClass('active');

//for toggling navbar active class when navbar links are clicked
$(".navbar-nav li a").click(function(){
    prev_nav_flag.toggleClass('active');
    prev_nav_flag = $(this);
    $(this).toggleClass('active');
});




