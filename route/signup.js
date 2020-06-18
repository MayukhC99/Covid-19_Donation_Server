const express= require('express');
const users= require('../database').users;
const route= express.Router();

route.post('/getin',(req,res)=>{
    console.log(req.body);
    users.create({
        username: req.body.username,
        email_id: req.body.email_id,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile_number: req.body.mobile_number,
        address: null,
        profile_picture: '000.png'
    }).then((created_user)=>{
        if(created_user){
            console.log("User Created");
            res.send(created_user);

        } else {
            res.send(undefined);
        }
    }).catch((err)=>{
        res.send(undefined);
    })

})


module.exports= {
    route
};