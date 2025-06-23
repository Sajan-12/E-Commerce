const likeModel = require('./like.model');
const userModel = require('../User/user.schema');
const productModel = require('../Product/product.schema');

exports.addLike = async (req, res) => {
      
    try {
        const {productId}=req.params;
        const userLike = await likeModel.findOne({
            user: req.userId,
            product: productId
        });
        if (userLike) {
            userLike.likeStatus=!userLike.likeStatus;
            await userLike.save();
            let msg = userLike.likeStatus===true ? "Liked" : "unLiked";
            return res.status(202).json({ msg: msg });
        }
        const newUser = new likeModel({
            user: req.userId,
            product: productId,
            likeStatus: true
        })
        await newUser.save();
        res.status(202).json({ msg: "Liked" })
    }
    catch (err) {
        res.status(404).json({ msg: "server error" });
    }

}
exports.getLikedOne=async(req,res)=>{
    try{
    const {productId}=req.params;
        const userLike = await likeModel.findOne({
            user: req.userId,
            product: productId
        });
        if(userLike){
            let msg = userLike.likeStatus === true ? "Liked" : "unLiked";
            return res.status(200).json({ msg: msg });
        }
        else 
        return res.status(200).json({ msg:""});
    }
    catch(err){
             res.status(404).json({ msg: "server error" });
    }
}
exports.getLiked=async(req,res)=>{
    try{
         const userLikes=await likeModel.find({
            user: req.userId,likeStatus:true
        }).populate('product');
        if(userLikes.length===0){
            return res.status(200).json({msg:"liked Product not found"});
        }
        return res.status(200).json({msg:"success",data:userLikes});
    }
    catch(err){
        console.log(err);
        res.status(500).json({mgs:"server error"});
    }
}