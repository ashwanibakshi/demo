const express  = require('express');
const mongoose = require('mongoose');
const con      = require('./config/db').conn;
const path     = require('path');
const  cookieParser = require('cookie-parser')

const app = express();

mongoose.connect(con)
.then(()=>{
    console.log('connected to db');
})
.catch((err)=>{
    console.log('connection err',err);
})


app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(express.static(path.resolve(__dirname,'public')));

app.use('/user',require('./routes/userRoute'));
app.use('/task',require('./routes/taskRoute'));

app.use((err,req,res,next)=>{
    if(err){
        res.json({error:err.message});
    }
    else{
        next();
    }
});


var port = process.env.PORT || 3000;

app.listen(port,()=>console.log(`server run at ${port}`));