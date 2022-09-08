const express         = require('express');
const taskService     = require('../services/taskService');
const multer          = require('multer');
const auth            = require('../middleware/authentication');

var storage = multer.diskStorage({
  destination:function(req,file,cb){
      cb(null,'./public/uploads')
  },
  filename:function(req,file,cb){
      cb(null,file.originalname)
  }
})
var upload = multer({storage:storage})


const router = express.Router();



router.post('/add',auth.authentication(),upload.single('attachement'),(req,res,next)=>{
   var x = 'uploads/'+req.file.originalname;
   req.body.attachement = x;
   taskService.addTask(req.body,(err,result)=>{
          if(err){
            next(err);
          }
          else{
             res.json({data:result});  
          }
   });
});

router.get('/showall',auth.authentication(),(req,res,next)=>{
  const dataa = {
    userid : req.user
  }
  taskService.showTaskService(dataa,(err,result)=>{
           if(err){
            next(err);
           }
           else{
            res.json({data:result});
           }
      });
});

router.get('/edit/:id',auth.authentication(),(req,res,next)=>{
      const dataa = {
        userid : req.user,
        id     : req.params.id
      }
      taskService.getTaskByIdService(dataa,(err,result)=>{
          if(err){
            next(err);
          }
          else{
            res.json({data:result});
          }
      });
});

router.delete('/delete',auth.authentication(),(req,res,next)=>{
  const dataa = {
    userid : req.user,
    ... req.body
  }
  taskService.deleteTaskByIdService(dataa,(err,result)=>{
         if(err){
          next(err);
         }
         else{
          res.json({msg:'task removed successfully!'});
         }
  });
});

module.exports=router;