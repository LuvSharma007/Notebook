const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

const userRoutes = require('./routes/user');
const contentRoutes = require('./routes/content');


mongoose.connect('mongodb://127.0.0.1:27017/Notebook')
.then(()=>{
    console.log('database connected !');    
}).catch((error)=>{
    console.log(`database is not connected , ${error}`);
})

app.use(express.urlencoded({extended:false}));

app.use(express.json());
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));








//mounted route
app.use('/user',userRoutes);
app.use('/user',contentRoutes);

app.listen(3000,()=>{
    console.log(`http://localhost:3000/user/home`);
})


