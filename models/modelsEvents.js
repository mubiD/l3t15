const mongoose = require('mongoose'); //Require Mongoose.

//Build Schema for documentation.
let Events = mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  createdBy:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  location:{
    type:String,
    required:true
  },
  dateOfEvent:{
    type:String,
    required:true
  },
  timeOfEvent:{
    type:String,
    required:true
  },
  createDate:{
    type:Date,
    required:false,
    default: Date.now
  },
});

//Create the Events model using mongoose.
//First param is the collection name. second is the name of the model created.
module.exports = mongoose.model('eventscollections', Events);