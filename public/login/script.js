
$(function(){
    
    $("#login_btn").click(function(){
        console.log("Login button clicked")
        let user_text= $('#username');
        let user_password= $('#password')

        let username= user_text.val().trim();
        let password= user_password.val();

        if((username !== "") && (password !== "")){
            //alert('post request is being made');
            $("#login_btn").prop('disabled', true);
            $("#login_btn").addClass("back");
            console.log($("#login_btn").attr('class'));
            $.post('/login/getin',{
                username: username,
                password: password
            },function(user){
                if(!user){
                    alert('Invalid Username or Password');
                    window.location.reload(true);
                } else {
                    alert('You have successfully logged in.Redirecting you to Home page');
                    window.location.assign('/');
                }
            })
        }
    })

})