const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  likeStatus:{
     type:Boolean
  }
});

const likeModel=mongoose.model('like', likeSchema);

module.exports=likeModel;
