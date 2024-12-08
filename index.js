const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
const connectionString = process.env.DB;


app.use(cookieParser());

const userRoutes = require('./routes/user');
const contentRoutes = require('./routes/content');


mongoose.connect(connectionString)
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
