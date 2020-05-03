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
    });
    $(".btn2").on('click', function(){
        $(".modal-title").text("Donate Medical");
    });
    $(".btn3").on('click', function(){
        $(".modal-title").text("Donate Food Packets");
    });
    $(".btn4").on('click', function(){
        $(".modal-title").text("Donate Clothes");
    });
    $(".btn5").on('click', function(){
        $(".modal-title").text("Donate Books");
    });

    $('.modal').on('hidden.bs.modal', function (e) {
        $(this).find("input,textarea").val('').end();
      })
});