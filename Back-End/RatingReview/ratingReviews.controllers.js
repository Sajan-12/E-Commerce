const productModel = require('../Product/product.schema.js');
const rrmodel=require('./ratingReviews.schema');

exports.rateReviewProduct=async(req,res)=>{
   try{
     const {productId}=req.params;
     let product=await productModel.findById(productId);
     if(!product){
        return res.status(404).json({msg:"product not found"});
     }
    const {rating,review}=req.body;
    let ratedProduct=await rrmodel.findOne({
        user:req.userId,
        product:productId
    })
    if(ratedProduct){
        ratedProduct.rating=parseFloat(rating);
        if (review && review.trim() !== "") {
             ratedProduct.review = review;
         if (!product.reviews.includes(ratedProduct._id)) {
        product.reviews.push(ratedProduct._id);
          }
           }
        await ratedProduct.save();
        if(!product.ratings.includes(ratedProduct._id)){
        product.ratings.push(ratedProduct._id);
         await product.save();
        }
        return res.status(202).json({msg:"updated"});
    }
   let newRate=new rrmodel({
    user:req.userId,
    product:productId,
    rating:parseFloat(rating),
    review:review
   })
    await newRate.save();
    product.ratings.push(newRate._id);
    if (review && review.trim() !== "")
    product.reviews.push(newRate._id);
        await product.save();
    return res.status(202).json({msg:"success"});
   }
   catch(err){
    console.log(err);
    res.status(500).json({msg:"server error"})
   }
}  

exports.getRating=async(req,res)=>{
       try{
           const {productId}=req.params;
     let ratedProduct=await rrmodel.find({product:productId});
     if(ratedProduct.length==0){
        return res.status(404).json({msg:"product is  not rated yet"});
     }
    
      let sum=ratedProduct.reduce((acc,product)=>{
        return acc+product.rating
      },0);
      let avg=parseFloat(sum/ratedProduct.length).toFixed(1);
      res.status(200).json({avgRating:avg,noOfRating:ratedProduct.length});
       }
       catch(err){
    console.log(err);
    res.status(500).json({msg:"server error"})
   }
}

exports.getAllReviews=async(req,res)=>{
    try{
          const {productId}=req.params;
     let reviewsOfProduct=await rrmodel.find({product:productId});
     if(reviewsOfProduct.length==0){
        return res.status(404).json({msg:"product is  not reviewed yet"});
     }
     let allReviews=[];
     reviewsOfProduct.map((doc)=>{
         allReviews.push(doc.review);
     })
     allReviews = [...new Set(allReviews)];
     res.status(200).json({reviews:allReviews})
    }
    catch(err){
    console.log(err);
    res.status(500).json({msg:"server error"})
   }
}