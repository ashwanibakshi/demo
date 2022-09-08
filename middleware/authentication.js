const jwt   = require('jsonwebtoken');
require('dotenv').config();

module.exports.authentication=()=>{
 return(req,res,next)=>{
        if(req.header('authorization')){
        jwt.verify(req.header('authorization'),process.env.jwtSecretKey,(err,decoded)=>{
            if(err){
                res.json({error:err.message});
            }
            else{   
                if(decoded){
                    console.log('dsf',decoded);
                    req.user = decoded.userid;
                    next();
                }
                else{
                  res.json({message:"you dont have permission"});
                }
              }
            });
        }
        else {
            res.sendStatus(401);
        }
    }
 }