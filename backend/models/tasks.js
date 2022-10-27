const mongoose = require('mongoose');

const taskSchema=mongoose.Schema({
  title:String,
  content:String,
  creator:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true}
});

module.exports=mongoose.model('Task',taskSchema);
