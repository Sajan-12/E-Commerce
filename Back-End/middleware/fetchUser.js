const jwt=require('jsonwebtoken');
const userModel=require('../User/user.schema.js');

const fetchUser=async(req,res,next)=>{
    try{
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized User' });
        }

        const decoded = jwt.verify(token, 'secret_ecom');
        const user=await userModel.findById(decoded.userId);
         req.userId=user._id;
         next();
    }
    catch(err){
        res.status(401).send({msg:'please validate using authentic token'});
    }
  
}
module.exports=fetchUser;