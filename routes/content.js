const express = require('express');
const router = express.Router();
const Content = require('../models/content');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');


router.post('/content',auth,async(req,res)=>{   
    try {
        const {content} = req.body;

    await Content.create({
        content,
        userId:req.user._id
    })
    res.redirect('/user/content')
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
})

router.get('/content',auth,async(req,res)=>{
    try {
        const tasks = await Content.find({userId:req.user._id}).sort({createdAt:-1});
               
        res.render('content',{user:req.user,tasks});
    } catch (error) {
        console.log(error);
        res.status(500).send('server error');
    }
})

router.post('/delete/:id',auth,async(req,res)=>{
    try {
            const taskId = req.params.id;
            await Content.findByIdAndDelete(taskId)
            res.redirect('/user/content');
        } catch (error) {
        console.log(error);
        res.status(500).send('server error');
    }
})

router.get('/edit/:id',async(req,res)=>{
    try {
        const task = await Content.findById(req.params.id);
        if (!task){
            return res.status(404).send('task not found');
        }
        res.render('edit',{task,user:req.user});

    } catch (error) {
        console.log(error);
        res.status(500).send('server error');
        
    }
})

router.post('/edit/:id',auth,async(req,res)=>{
    const {content} = req.body;
    try {
        await Content.findByIdAndUpdate(req.params.id,{content});
        res.redirect('/user/content');
    } catch (error) {
        console.log(error);
        res.status(500).send('server error');
    }
})



module.exports = router;
