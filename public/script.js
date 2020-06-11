$(document).ready(function(){

    navbar_obj={
        trigger_carousel: $('.navbar-nav li:first-child a'),
        trigger_about: $('.navbar-nav li:nth-child(2) a'),
        trigger_donate: $('.navbar-nav li:nth-child(3) a'),
        trigger_contact: $('.navbar-nav li:nth-child(4) a')
    }

    //Simulating navbar movements
    let prev_nav_flag = $('.navbar-nav li:first-child a');
    prev_nav_flag.toggleClass('active');

    //for toggling navbar active class when navbar links are clicked
    $(".navbar-nav li a").click(function(){
        prev_nav_flag.toggleClass('active');
        prev_nav_flag = $(this);
        $(this).toggleClass('active');
    });

    function isScrolledIntoView(elem)
    {
        var docViewTop = $(window).scrollTop();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        if(elem !== ".carousel")
            return ((elemBottom - 50 >= docViewTop) && (elemTop - 70 <= docViewTop));
        else
            return ((elemBottom >= docViewTop) && (elemTop <= docViewTop));
    }

    $(window).scroll( function(){
        $('.card').each( function(i){
            var bottom_of_object = $(this).offset().top + 50;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object ){
                $(this).animate({'opacity':'1'},3000);
            }
        });

        if (isScrolledIntoView($('.carousel'))){
            prev_nav_flag.toggleClass('active');
            prev_nav_flag= navbar_obj['trigger_carousel'];
            prev_nav_flag.toggleClass('active');
        }
        if (isScrolledIntoView($('.about'))){
            prev_nav_flag.toggleClass('active');
            prev_nav_flag= navbar_obj['trigger_about'];
            prev_nav_flag.toggleClass('active');
        }
        if (isScrolledIntoView($('.donate'))){
            prev_nav_flag.toggleClass('active');
            prev_nav_flag= navbar_obj['trigger_donate'];
            prev_nav_flag.toggleClass('active');
        }
        if (isScrolledIntoView($('#contact'))){
            prev_nav_flag.toggleClass('active');
            prev_nav_flag= navbar_obj['trigger_contact'];
            prev_nav_flag.toggleClass('active');
        }
    });

    var i;
    for (i=0; i<5; i++) {
        $(window).trigger( "scroll" );
    }

    var trace = new Set();

    $(".btn1").on('click', function(){
        $(`<div class="form-group">
            <label for="formGroupExampleInput">Quantity(approx.)</label>
            <input type="text" class="form-control" id="formGroupExampleInput" name="quantityapprox" placeholder="100" required>
        </div>`).insertAfter(".modal-body form div:nth-child(5)");
        $(".modal-title").text("Donate Groceries");
        $(".modal-body #InputName2").val('Grocery Donation')
    });
    $(".btn2").on('click', function(){
        $(`<div class="form-group">
            <label for="formGroupExampleInput">Quantity(approx.)</label>
            <input type="text" class="form-control" id="formGroupExampleInput" name="quantityapprox" placeholder="100" required>
        </div>`).insertAfter(".modal-body form div:nth-child(5)");
        $(".modal-title").text("Donate Medical");
        $(".modal-body #InputName2").val('Medical Donation')
    });
    $(".btn3").on('click', function(){
        $(`<div class="form-group">
            <label for="formGroupExampleInput">Quantity(approx.)</label>
            <input type="text" class="form-control" id="formGroupExampleInput" name="quantityapprox" placeholder="100" required>
        </div>`).insertAfter(".modal-body form div:nth-child(5)");
        $(".modal-title").text("Donate Food Packets");
        $(".modal-body #InputName2").val('Food Donation')
    });
    $(".btn4").on('click', function(){
        $(`<div class="form-group">
            <label for="formGroupExampleInput">Quantity(approx.)</label>
            <input type="text" class="form-control" id="formGroupExampleInput" name="quantityapprox" placeholder="100" required>
        </div>`).insertAfter(".modal-body form div:nth-child(5)");
        $(".modal-title").text("Donate Clothes");
        $(".modal-body #InputName2").val('Cloth Donation')
    });
    $(".btn5").on('click', function(){
        $(`<div class="form-group">
            <label for="formGroupExampleInput">Quantity(approx.)</label>
            <input type="text" class="form-control" id="formGroupExampleInput" name="quantityapprox" placeholder="100" required>
        </div>`).insertAfter(".modal-body form div:nth-child(5)");
        $(".modal-title").text("Donate Books");
        $(".modal-body #InputName2").val('Book Donation')
    });
    $(".btn6").on('click', function(){
        $(".modal-title").text("Miscellaneous");
        $(".modal-body #InputName2").val('Multiple Donation')
        $(".multiple_donations").show();
        $(".modal-body form").hide();
    });

    $('.modal').on('hidden.bs.modal', function (e) {
        $(this).find("input,textarea").val('').end();
        $(".multiple_donations").hide();
        $(".modal-body form").show();
        $(".multiple_donations div a").removeClass("add_donation");
        $(".multiple_donations div a").children('i').removeClass("fa-rotate-45");
        trace.clear();
        $(".modal-body form .added").remove();
        $(".modal-body form div:nth-child(6)").remove();
    })

    $(document).on('click', '.multiple_donations div a', function(){
        $('.multiple_donations .text').text("");
        var t = $(this).text().substr($(this).text().indexOf(' ')+1);
        if(trace.has(t))
            trace.delete(t)
        else
            trace.add(t);
        $(this).toggleClass('add_donation');
        $(this).children('i').toggleClass("fa-rotate-45");
    })

    $("#donate_multiple").on('click', function(){
        if($('.multiple_donations div').find('a.add_donation').length !== 0){
            $('.multiple_donations .text').text("");
            const iterator1 = trace.values();
            let i = 0;
            for(i=0; i < trace.size; i++){
                let donation_name = iterator1.next().value;
                var trimStr = donation_name.split(" ").join("");
                $(`<div class="form-group added">
                    <label for="formGroupExampleInput">${donation_name} Quantity(approx.)</label>
                    <input type="text" class="form-control" id="formGroupExampleInput" name="${trimStr}quantityapprox" placeholder="100" required>
                </div>`).insertAfter(".modal-body form div:nth-child(5)");
            }
            $(".multiple_donations").hide();
            $(".modal-body form").show();
        }
        else{
            $('.multiple_donations .text').text("Select at least one item!!");
        }
    })

    let div_width = $(".multiple_img").width();
    let div_height = $(".card").height();
    $(".multiple_img img").attr('width', `${(div_width/2) - 2.5}`);
    $(".multiple_img img:nth-child(2)").attr('width', `${(div_width/2) - 2}`);
    $(".multiple_img img:nth-child(4)").attr('width', `${(div_width/2) - 2}`);
    if($(window).width() >= 1183)
        $(".multiple_img img").attr('height', `${(div_height/3.2)}`);
    else if($(window).width() >= 975 && $(window).width() < 1200)
        $(".multiple_img img").attr('height', `${(div_height/3.4)}`);
    else if($(window).width() >= 751 && $(window).width() < 992)
        $(".multiple_img img").attr('height', `${(div_height/4.25)}`);
    else if($(window).width() < 751)
        $(".multiple_img img").attr('height', `${(div_height/3.2)}`);
    $(window).bind('resize', function() {
        let div_width = $(".multiple_img").width();
        let div_height = $(".card").height();
        $(".multiple_img img").attr('width', `${(div_width/2) - 2.5}`);
        $(".multiple_img img:nth-child(2)").attr('width', `${(div_width/2) - 2}`);
        $(".multiple_img img:nth-child(4)").attr('width', `${(div_width/2) - 2}`);
        if($(window).width() >= 1183)
            $(".multiple_img img").attr('height', `${(div_height/3.2)}`);
        else if($(window).width() >= 975 && $(window).width() < 1200)
            $(".multiple_img img").attr('height', `${(div_height/3.4)}`);
        else if($(window).width() >= 751 && $(window).width() < 992)
            $(".multiple_img img").attr('height', `${(div_height/4.25)}`);
        else if($(window).width() < 751)
            $(".multiple_img img").attr('height', `${(div_height/3.2)}`);
    })
});

$('.donate_form form').submit(function(){
    alert('Donation successfull recorded. Our team will soon reach you. Please check your email.');
})

$('.contact_form').submit(function(){
    alert('Our team has been informed. Please check your email');
})




