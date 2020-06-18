const express= require('express');
const express_sessions = require('express-session');
const passport= require('./passport').passport;
const nodemailer= require('nodemailer');
const path= require('path');
const http= require('http');

const app= express();
let port= process.env.PORT || 3000 ;
const server= http.createServer(app);

let ouremail= 'shareforindiahelpinghands@gmail.com';
let ourpassword= 'avsharshe1234'

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: ouremail,
      pass: ourpassword
    }
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express_sessions({
  secret: 'Covid19DonationServer'
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname,'public')));
app.use('/donations',require('./route/donations').route);
app.use('/signup',require('./route/signup').route);
app.use('/login',require('./route/login').route);
app.use('/root',require('./route/root').route);



app.post('/contactus',(req,res)=>{
    let name= req.body.name;
    let mobile= req.body.mobile;
    let email= req.body.email.trim();
    let msg= req.body.msg;

    let mailOptions = {
        from: ouremail,
        to: ouremail,
        subject: 'Contact US',
        text: `Name: ${name}\nMobile: ${mobile}\nEmail: ${email}\nMessage: ${msg}`
    };

    let mailOptions2 = {
        from: ouremail,
        to: email,
        subject: 'Thank You',
        text: `Thank You for contacting us. Our team will soon review your message.`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });

    transporter.sendMail(mailOptions2, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });

    res.redirect('back');
})



server.listen(port,()=>{console.log('Server listening')});

module.exports= {
  app
}
