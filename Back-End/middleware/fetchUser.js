const jwt=require('jsonwebtoken');
const fetchUser=async(req,res,next)=>{
  const token=req.header('auth-token');
  if(!token){
    res.status(401).send({msg:'please validate using authentic token'});
  }
  else{
    try{
         const data=jwt.verify(token,'secret_ecom');
         req.userId=data.userId;
         console.log(data.userId);
         next();
    }
    catch(err){
        res.status(401).send({msg:'please validate using authentic token'});
    }
  }
}
module.exports=fetchUser;