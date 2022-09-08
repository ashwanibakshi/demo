const userSchema = require('../schema/userSchema');
const bcrypt     = require('bcryptjs');
const jwt        = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    addUser (data,cb){
        try {
            bcrypt.genSalt(10,(err,salt)=>{
                if(err){
                  cb(err,null);
                }
                else{
                    bcrypt.hash(data.password,salt,(err,hash)=>{
                          if(err){
                            cb(err,null);
                          }
                          else{
                            let user = new userSchema({
                                name  : data.name,
                                email : data.email,
                             password : hash  
                            });
                            user.save((err,result)=>{
                               if(err){
                                cb(err,null);
                               }  
                               else{
                                cb(null,result);
                               } 
                            });                 
                          }
                    }); 
                } 
             });
           
        } catch (error) {
            cb(error,null);
        }
    },
    userLogin(data,cb){
      try {
        userSchema.findOne({'email':data.email},(err,edata)=>{
          if(err){
            cb(err,null);
          }
          
          if(edata==null){
            cb({message:'user doesnt exits!'},null);
          }
          else{
            bcrypt.compare(data.password,edata.password,(err,match)=>{
              if(err){
               cb(err,null);
              }
              else if (match){
               var token = jwt.sign({
                 userid:edata._id,
               },process.env.jwtSecretKey,{ expiresIn:"7d"});
               cb(null,token);
              }
              else{
               cb({message:'wrong password!'},null);
              }
           });
          }
      }); 
      } catch (error) {
        cb(error,null);
      }
    }
}