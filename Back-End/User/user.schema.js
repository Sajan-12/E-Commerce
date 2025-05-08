const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cartData:{
      type:Object
     },
     date:{
        type:Date,
        default:Date.now
     }
    
})

const userModel=new mongoose.model('User',userSchema);

module.exports=userModel;