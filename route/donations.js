const express= require('express');
const donations= require('../database').donations;
const nodemailer= require('nodemailer');
const route= express.Router();

let ouremail= 'shareforindiahelpinghands@yahoo.com';
let ourpassword= 'duzfeteoamccsbtc';

let transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 465,
    service:'yahoo',
    secure: false,
    auth: {
      user: ouremail,
      pass: ourpassword
    }
});

route.post('/donate_request',(req,res)=>{
    let sub= req.body.subject;
    let email= req.body.emailadd.trim();
    var quantity = { 
        Medicalquantityapprox: '0',
        Clothesquantityapprox: '0', 
        Booksquantityapprox: '0', 
        FoodPacketsquantityapprox: '0', 
        Groceriesquantityapprox: '0', 
        quantityapprox: '0'
    };

    let txt= `Name: ${req.body.name}\nMobile number: ${req.body.mobileno}\nEmail id: ${req.body.emailadd}\nAddress: ${req.body.addressin}`;
    
    let kys = Object.keys(req.body);
    for(let i = 5; i < kys.length; i++){
      let quantity_name = kys[i];
      let left = quantity_name.split("quantityapprox");
      if(left[0] == "FoodPackets")
        left[0] = "Food Packets";
      let total_quantity = `\n${left[0]} Quantity(approx.): ${req.body[quantity_name]}`;
      quantity[quantity_name] = req.body[quantity_name];
      txt += total_quantity;
    }

    let kys_quantity = Object.keys(quantity);
    donations.create({
        username: req.user.dataValues.username,
        subject: req.body.subject,
        name: req.body.name,
        email_id: req.body.emailadd,
        mobile_number: req.body.mobileno,
        address: req.body.addressin,
        Medicalquantityapprox: quantity[kys_quantity[0]],
        Clothesquantityapprox: quantity[kys_quantity[1]],
        Booksquantityapprox: quantity[kys_quantity[2]],
        FoodPacketsquantityapprox: quantity[kys_quantity[3]],
        Groceriesquantityapprox: quantity[kys_quantity[4]],
        quantityapprox: quantity[kys_quantity[5]],
        status: 'pending'
    }).then((created_user)=>{
        if(created_user){
            console.log("User Created");
            res.send(created_user);

        } else {
            res.send(undefined);
        }
    }).catch((err)=>{
        console.log(err);
        res.send(undefined);
    })
    console.log(sub);
    console.log(email);
    console.log(txt);
    console.log(req.body);

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

route.get('/all_donations', (req,res) =>{
    donations.findAll({
        where: {
            username: req.user.username
        }
    }).then((user)=>{
        if(!user){
            console.log('requested user for donations, not found');
            res.send(undefined);
        }
        else{
            console.log('requested user for donations, found');
            res.send(user);
        }
    })
})

route.get('/get/all_donation_requests', (req,res) =>{
    if(req.user.username && req.user.username=='admin'){
        donations.findAll({
            where: {
                status: 'pending'
            }
        }).then((donation)=>{
            if(!donation){
                console.log('No pending donations found');
                res.send(undefined);
            }
            else{
                console.log('Donations are found');
                res.send(donation);
            }
        })
    }
})

route.post('/delete_request',(req,res)=>{
    if(req.user.username && req.user.username=='admin'){
        donations.findOne({
            where: {
                username: req.body.username,
                Medicalquantityapprox: req.body.Medicalquantityapprox,
                Clothesquantityapprox: req.body.Clothesquantityapprox,
                Booksquantityapprox: req.body.Booksquantityapprox,
                FoodPacketsquantityapprox: req.body.FoodPacketsquantityapprox,
                Groceriesquantityapprox: req.body.Groceriesquantityapprox,
                quantityapprox: req.body.quantityapprox,
                status: req.body.status
            }
        }).then((user)=>{

            if(!user){
                console.log("User doesn't exist");
                res.redirect('back');
            }
            user.destroy();
            console.log('Deleted successfully');

            res.redirect('back');

        }).catch((err)=>{
            console.log(err);
            res.redirect('back');
        })
    }
   
    res.send(undefined);
})

route.post('/collected_request',(req,res)=>{
    if(req.user.username && req.user.username=='admin'){
        donations.findOne({
            where: {
                username: req.body.username,
                Medicalquantityapprox: req.body.Medicalquantityapprox,
                Clothesquantityapprox: req.body.Clothesquantityapprox,
                Booksquantityapprox: req.body.Booksquantityapprox,
                FoodPacketsquantityapprox: req.body.FoodPacketsquantityapprox,
                Groceriesquantityapprox: req.body.Groceriesquantityapprox,
                quantityapprox: req.body.quantityapprox,
                status: req.body.status
            }
        }).then((user)=>{

            if(!user){
                console.log("User doesn't exist");
                res.redirect('back');
            }
            console.log('Updated successfully');
            user.update({status: 'collected'});

            res.redirect('back');

        }).catch((err)=>{
            console.log(err);
            res.redirect('back');
        })
    }
    else{
        res.send(undefined);
    }
})

module.exports= {
    route
};