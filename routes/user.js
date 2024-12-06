const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Content = require('../models/content');



router.get('/home',(req,res)=>{
    
    res.render('home');
})

router.get('/signup',(req,res)=>{
    res.render('signup');
})

router.get('/signin',(req,res)=>{
    res.render('signin');
})



router.post('/signup',async(req,res)=>{
    const {fullName , email , password } = req.body;

    await User.create({
        fullName,
        email,
        password
    })
    res.redirect('/user/signin');
})




router.post('/signin',async(req,res)=>{
    const {email , password} = req.body;
    const token = await User.matchPassword(email,password);

    if (!token) {
        return res.status(400),res.render('signin',{error:"Incorrect email or password!"});
    }

    res.cookie('Token',token,{ httpOnly: true, secure: false });
    res.redirect('/user/content');

})



router.get('/signout',(req,res)=>{
    res.clearCookie('Token');
    res.redirect('/user/home');
})



module.exports = router;



