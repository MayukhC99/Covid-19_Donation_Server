
$(function(){

      let admin_str= `<header>Dashboard</header>
        <ul class="side_bar" style="padding-left: 0;">
          <li><a href="./Account/index.html"><i class="fa fa-user-circle"></i>Account</a></li>
          <li><a href="/login/logout"><i class="fa fa-sign-out"></i>Logout</a></li>
          <li><a href="./donation_request/index.html"><i class="fas fa-hands-helping"></i>Donation Requests</a></li>
          <li><a href="#Donateus"><i class="fas fa-hands"></i>Donate</a></li>
          <li><a href="https://github.com/MayukhC99/En-linea-Banking/"><i class="fa fa-github"></i>Contribute</a></li>
          <li><a href="#contact"><i class="fa fa-envelope"></i>Contact Us</a></li>
        </ul>`;

      let success_str= `<header>Dashboard</header>
        <ul class="side_bar" style="padding-left: 0;">
          <li><a href="./Account/index.html"><i class="fa fa-user-circle"></i>Account</a></li>
          <li><a href="/login/logout"><i class="fa fa-sign-out"></i>Logout</a></li>
          <li><a href="#Donateus"><i class="fas fa-hands"></i>Donate</a></li>
          <li><a href="https://github.com/MayukhC99/En-linea-Banking/"><i class="fa fa-github"></i>Contribute</a></li>
          <li><a href="#contact"><i class="fa fa-envelope"></i>Contact Us</a></li>
        </ul>`;
  
      let failure_str= `<header>Dashboard</header>
        <ul style="padding-left: 0;">
          <li><a href="./login/login.html"><i class="fa fa-sign-in"></i>Login</a></li>
          <li><a href="./login/signup.html"><i class="fa fa-user-plus"></i>Signup</a></li>
          <li><a href="#Donateus"><i class="fas fa-hands"></i>Donate</a></li>
          <li><a href="https://github.com/MayukhC99/En-linea-Banking/"><i class="fa fa-github"></i>Contribute</a></li>
          <li><a href="#contact"><i class="fa fa-envelope"></i>Contact Us</a></li>
        </ul>`;
  
      $.get('/root/verify_user',function(response){
        if(response=== 'admin'){
          $('.sidebar').html(admin_str);
        }
        else if (response=== 'success'){
          $('.sidebar').html(success_str);
        }
        else
          $('.sidebar').html(failure_str);
      })
  
  })