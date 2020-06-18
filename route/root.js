const express= require('express');
const multer= require('multer');
const path= require('path');
const db= require('../database').db;
const users= require('../database').users;
const fs= require('fs');
const route= express.Router();

const storage_engine = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req,file,done){

        done(null,req.user.username+'-'+Date.now()+path.extname(file.originalname));//path.extname can extract extension name from file name
    }
});

//creating fileFilter function

const customFileFilter = function(req,file,done){
    const regex= /\jpg$|\jpeg$|\png$|\gif$/

    const check_filename = regex.test(file.originalname);

    const check_mimetype= regex.test(file.mimetype);

    if(check_filename && check_mimetype){
        done(null,true);
    } else {
        done('Error: Images only');
    }
}

const upload = multer({
    storage: storage_engine,
    limits: {fileSize: 1000000},
    fileFilter: customFileFilter
}).single('profile_image');  //name should be profile_image

//handling post request containing the file(profile_picture)
route.post('/upload/profile_image',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            res.send(undefined);
        } else {
            if(req.file === undefined){
                res.send("undefined");
            } else {

                if(req.user.profile_picture !== '000.png'){
                    //deleting the file
                    fs.unlink('./public/uploads/'+req.user.profile_picture , (err) => {
                        if (err){
                            console.log(err);
                            throw err;
                        }
                        console.log('The file has been deleted');
                    });
                }
                db.query(`UPDATE users SET profile_picture="${req.file.filename}" WHERE username= "${req.user.username}"`);
                req.user.profile_picture = req.file.filename;
                res.send(req.file.filename);
            }
        }
    })
})

route.post('/profile_update', (req,res) =>{
    db.query(`UPDATE users`+
            ` SET first_name='${req.body.first_name}' , last_name='${req.body.last_name}' , email_id='${req.body.email_id}' , mobile_number='${req.body.mobile_number}' , address='${req.body.address}'`+
            ` WHERE username='${req.user.username}'`);

    res.send("Personal details updated.")
})


//to delete profile picture
route.get('/delete/profile_image',(req,res)=>{

    if(req.user.profile_picture !== '000.png'){
        fs.unlink('./public/uploads/'+req.user.profile_picture , (err) => {
            if (err){
                console.log(err);
                throw err;
            }
            console.log('The file has been deleted');
        });
    } else {
        res.send(undefined);
    }

    db.query(`UPDATE users SET profile_picture="000.png" WHERE username= "${req.user.username}"`);
    req.user.profile_picture = "000.png";

    res.redirect('back');
})

//get whole user
route.get('/get/user_details',(req,res)=>{
  res.send(req.user);
})

route.get('/get/username',(req,res)=>{
    res.send(req.user.username);
})

//verify existance of a user
route.get('/verify_user',(req,res)=>{
    console.log('Verifying User ');
    if (req.user){
        if(req.user.username === 'admin'){
            console.log('admin');
            res.send('admin');
        } else if(req.user.username !== undefined) {
            console.log('user verified');
            res.send('success');
        } else{
            console.log('No user in cache');
            res.send(undefined);
        }
    }
    else
        res.send(undefined);
});

module.exports= {
    route
}