const { showTask } = require('../models/taskModel');
const taskModel = require('../models/taskModel');

module.exports = {
    addTaskService(data,cb){
       taskModel.addTask(data,(err,result)=>{
             if(err){
                cb(err,null);
             }
             else{
               cb(null,data);
             }
       });
    },
    showTaskService(data,cb){
        taskModel.showTask(data,(err,result)=>{
             if(err){
               cb(err,null);
             }
             else{
               cb(null,result);
             }
        });
    },
    getTaskByIdService(data,cb){
      taskModel.editTask(data,(err,result)=>{
              if(err){
               cb(err,null);
              }
              else{
               cb(null,result);
              }
      });
    },
    deleteTaskByIdService(data,cb){
      taskModel.deleteTask(data,(err,result)=>{
            if(err){
               cb(err,null);
            }
            else{
               cb(null,result);
            }
      });
    }
}