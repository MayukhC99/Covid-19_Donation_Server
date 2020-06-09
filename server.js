const express= require('express');
const path= require('path');
const nodemailer= require('nodemailer');

const app= express();
let port= process.env.PORT || 3000 ;

app.use(express.static(path.join(__dirname,'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let ouremail= 'shareforindiahelpinghands@gmail.com';
let ourpassword= 'avsharshe1234'

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: ouremail,
      pass: ourpassword
    }
});

app.post('/donate_request',(req,res)=>{
    let sub= req.body.subject;
    let email= req.body.emailadd.trim();
    let txt= `Name: ${req.body.name}\nMobile number: ${req.body.mobileno}\nEmail id: ${req.body.emailadd}\nAddress: ${req.body.addressin}\nQuantity(approx.): ${req.body.quantityapprox}`;
    
    console.log(sub);
    console.log(email);
    console.log(txt);

    let mailOptions = {
        from: ouremail,
        to: ouremail,
        subject: sub,
        text: txt
    };

    let mailOptions2 = {
        from: ouremail,
        to: email,
        subject: "Thank you for "+ sub,
        text: `We heartly thank you for your donation. Your donation records:\n${txt}\n\n#StayHome #StaySafe`
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

app.listen(port,()=>{console.log('Server listening')});
