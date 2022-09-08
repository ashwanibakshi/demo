const taskschema = require('../schema/taskSchema');
const taskModel = require('../schema/taskSchema');


module.exports = {
    addTask(data,cb){
        try {
          let taskData = new taskModel({
              userid  : data.userid,
              title   : data.title,
              dueDate : data.dueDate,
            attachement : data.attachement   
          });    
          taskData.save((err,result)=>{
                 if(err){
                    cb(err,null);
                 }
                 else{
                    cb(null,result);
                 }
          });
        } catch (error) {
            cb(error,null);
        }
    },
    showTask(data,cb){
        try {
          console.log(data);
          taskschema.find({'userid':data.userid},(err,result)=>{
              if(err){
                cb(err,null);
              }
              else{
                cb(null,result);
              }
          });
        } catch (error) {
          cb(error,null);
        }
    },
    editTask(data,cb){
      try {
        taskschema.findById({'_id':data.id,'userid':data.userid},(err,result)=>{
             if(err){
              cb(err,null);
             }
             else{
               cb(null,result);
             }
        });
      } catch (error) {
        cb(error,null);
      }
    },
    deleteTask(data,cb){
      try {
        taskschema.findByIdAndDelete({'_id':data.id,'userid':data.userid},(err,result)=>{
            if(err){
              cb(err,null);
            }
            else{
              cb(null,result);
            } 
        });
      } catch (error) {
        cb(error,null);
      }
    }
}