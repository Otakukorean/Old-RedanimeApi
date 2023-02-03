const express = require('express');
const {Users} = require('../models');
const bcrypt = require('bcrypt');
const route = express.Router();
const dotenv = require('dotenv')
const {sign} = require('jsonwebtoken');
const fs = require('fs');
const multer = require("multer");
const path = require("path");
dotenv.config()
const {
    validateToken ,
    verifyTokenAndAdmin,


  } = require("../middlewares/validateAuth.js");
    const storage = multer.diskStorage({
    destination : (req,file,cb) => {
      cb(null , 'Uploads')
    },
    filename : (req,file,cb) => {
      const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g,'-')}`;
      cb(null , fileName)
    }
   })
   const upload = multer({storage : storage}).single('image')
  route.post("/", async (req, res) => {
    const { username, email,password } = req.body;
    const checkifuserexiest = await Users.findOne({where : {username: username, email: email}})
    
    if(checkifuserexiest) 
    {
      res.send({error : "الحساب موجود "})
    }
    else {
      bcrypt.hash(password, 10).then((hash) => {
        Users.create({
          username: username,
          email : email,
          password: hash,
        });
        res.json("SUCCESS");
      
      });
    }
  
  });


  route.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    const user = await Users.findOne({ where: { username: username } });
  
    if (!user){ 
      res.json({ error: " لايوجد هذا الحساب " })
      return;
    };
  
    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match) {
        res.send({ error: "مشكلة في اسم المستخدم او في كلمة السر" })
        return;
      }
      
      else {
        const accessToken = sign(
          { username: user.username, id: user.id , isAdmin : user.isAdmin , isCeo: user.isCeo, isModiratore : user.isModiratore,image : user.image }, process.env.JWT_TOKEN , {expiresIn : "10d"}
        );
          res.cookie("token",accessToken, {
          httpOnly : true,
          maxAge : 24 * 60 * 60 * 1000
        })
        res.json({ token: accessToken, username: username, id: user.id , isAdmin: user.isAdmin , isCeo : user.isCeo,isModiratore : user.isModiratore,image : user.image });
      }

    });
  });

route.get('/logout', function(req, res){
    cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }    
        res.cookie(prop, '', {expires: new Date(0)});
    }
    res.json("logout")
    
});


route.get('/auth' , validateToken,(req,res) => {
    res.json(req.user)

    
  })
  
  route.get('/image' ,validateToken,async (req,res) => {
  
           try {
   const Image = await Users.findOne({
   where : {id : req.user.id} ,
   attributes: ['id', 'image']
   
   } )
  res.json(Image)
 } catch (error) {
 
    res.json(error.message)
 }
  
  } )
  
  
  route.put('/image' , upload ,validateToken , async (req,res) => {
         try {
   const Image = await Users.update({image: req.file.filename} , {where : {id : req.user.id}} )
  res.json(Image)
 } catch (error) {
 
    res.json(error.message)
 }
  
  } )



  route.post('/changepassword' , validateToken,async (req,res) => {
   const {oldpassword , newpassword} = req.body
   const user = await Users.findOne({ where: { username: req.user.username} });
   bcrypt.compare(oldpassword, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    bcrypt.hash(newpassword, 10).then((hash) => {
      Users.update({password : hash} , {where : {username : req.user.username}})
      res.json("SUCCESS");
    
    });
   
  });
  })





module.exports =route