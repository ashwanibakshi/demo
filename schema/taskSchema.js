const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
       userid : {
         type:String,
         ref:'users'
       },
       title:{
        type:String
       },
       dueDate:{
        type:Date
       },
       attachement:{
        type:String
       }
});

module.exports = mongoose.model('tasks',taskSchema);