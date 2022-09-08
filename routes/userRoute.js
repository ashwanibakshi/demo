const express = require('express');
const userService = require('../services/userService');

const router = express.Router();

router.post('/register',(req,res,next)=>{
    userService.addUserService(req.body,(err,data)=>{
        if(err){
            // console.log(err);
            next(err);
        }
        else{
            res.json({data:data});
        }
    });
});

router.post('/login',(req,res,next)=>{
    userService.userLoginService(req.body,(err,result)=>{
           if(err){
            next(err);
           } 
           else{
            res.json({msg:"login success",token:result});
           }
    });
});

module.exports=router;