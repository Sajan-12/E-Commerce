const mongoose=require('mongoose');
 const ratingReviwsSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    review:{
       type:String
    }
 })
 const rrmodel=mongoose.model('RatingReview',ratingReviwsSchema);
 module.exports=rrmodel;