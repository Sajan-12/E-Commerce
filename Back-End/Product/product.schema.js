const mongoose= require("mongoose");

const productSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    name:{
        type: String,
        required: true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    ratings:[{
      type:mongoose.Schema.Types.ObjectId,
       ref:'RatingReview'
    }],
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'RatingReview'
    }],
    date:{
        type:Date,
        default:Date.now()
    },
    avilable:{
       type:Boolean,
       default: true
    }
})
const productModel=mongoose.model('Product',productSchema);
module.exports=productModel;