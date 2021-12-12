const mongoose = require('mongoose'); //Require Mongoose.

//Build Schema for documentation.
let Users = mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  role:{
    type:String,
    required:true,
    default: 'normal'
  },
  createDate:{
    type:Date,
    required:false,
    default: Date.now
  }
});

//Create the Users model using mongoose.
//First param is the collection name. second is the name of the model created.
module.exports = mongoose.model('usercollections', Users);