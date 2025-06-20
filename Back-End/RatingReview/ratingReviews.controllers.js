const productModel = require('../Product/product.schema.js');
const rrmodel=require('./ratingReviews.schema');

exports.rateProduct=async(req,res)=>{
   try{
     const {productId}=req.params;
     let product=await productModel.findById(productId);
     if(!product){
        return res.status(404).json({msg:"product not found"});
     }
    const {rating}=req.body;
    let ratedProduct=await rrmodel.findOne({
        user:req.userId,
        product:productId
    })
    if(ratedProduct){
        ratedProduct.rating=parseFloat(rating);
        await ratedProduct.save();
        if(!product.ratings.includes(ratedProduct._id)){
        product.ratings.push(ratedProduct._id);
         await product.save();
        }
        return res.status(202).json({msg:"rating is updated",rating:ratedProduct.rating})
    }
   let newRate=new rrmodel({
    user:req.userId,
    product:productId,
    rating:parseFloat(rating)
   })
    await newRate.save();
    product.ratings.push(newRate._id);
        await product.save();
    return res.status(202).json({msg:"rating is add",data:newRate})
   }
   catch(err){
    console.log(err);
    res.status(500).json({msg:"server error"})
   }
}  

exports.getRating=async(req,res)=>{
       try{
           const {productId}=req.params;
     let ratedproduct=await rrmodel.find({product:productId});
     if(ratedproduct.length==0){
        return res.status(404).json({msg:"product is  not rated yet"});
     }
     console.log(ratedproduct);
      let sum=ratedproduct.reduce((acc,product)=>{
        return acc+product.rating
      },0)
      let avg=parseFloat(sum/this.rateProduct.length).toFixed(1);
      res.status(200).json({avgRating:avg});
       }
       catch(err){
    console.log(err);
    res.status(500).json({msg:"server error"})
   }
}

exports.reviewProduct=async(req,res)=>{
   try{
     const {productId}=req.params;
     let product=await productModel.findById(productId);
     if(!product){
        return res.status(404).json({msg:"product not found"});
     }
    const {review}=req.body;
    let reviewProduct=await rrmodel.findOne({
        user:req.userId,
        product:productId
    })
    if(reviewProduct){
        reviewProduct.review=review;
         await reviewProduct.save();
         if(!product.reviews.includes(reviewProduct._id)){
           product.reviews.push(reviewProduct._id);
           await product.save();

         }
        return res.status(202).json({msg:"reviews is updated",review:reviewProduct})
    }
   let newReview=new rrmodel({
    user:req.userId,
    product:productId,
    review:review
   })
    await newReview.save();
    product.reviews.push(newReview._id);
        await product.save();
    return res.status(202).json({msg:"review is add",data:newReview})
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