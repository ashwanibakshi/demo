const userModel  = require("../models/userModel");

module.exports={
    addUserService(data,cb){
        userModel.addUser(data,(err,result)=>{
           if(err){
            cb(err,null);
           }
           else{
            cb(null,result);
           }
        });
    },
    userLoginService(data,cb){
        userModel.userLogin(data,(err,result)=>{
              if(err){
                cb(err,null);
              }
              else{
                cb(null,result);
              }
        });
    }
}