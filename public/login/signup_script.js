$(function(){
    $('#preloader').delay(350).fadeOut('slow');
    
    // let typed_name= $('#name');
    let typed_username= $('#username');
    let typed_first_name= $('#first_name');
    let typed_last_name= $('#last_name');
    let typed_email_id= $('#email_id');
    let typed_mobile_number= $('#mobile_number');
    let typed_password= $('#password');
    let signup_btn= $('#signup_btn');

    signup_btn.click(function(){
        let username = typed_username.val().trim();
        let first_name = typed_first_name.val().trim();
        let last_name = typed_last_name.val().trim();
        let email_id= typed_email_id.val().trim();
        let mobile_number = typed_mobile_number.val();
        let password= typed_password.val();

        if((username!=='') && (first_name!=='') && (last_name!=='') && (email_id!=='') && (mobile_number!=='') && (password!=='')){
            //alert('post request is being made');
            $.post('/signup/getin',{
                username: username,
                email_id: email_id,
                password: password,
                first_name: first_name,
                last_name: last_name,
                mobile_number: mobile_number
            },function(user){
                if(user){
                    alert(`Welcome ${user.first_name} ${user.last_name}, Please Login to continue`);
                    window.location.href='/';
                } else {
                    alert('User already exists. Please Signup with a different username');
                    window.location.href= './signup.html';
                }
            })
        }
    })
})