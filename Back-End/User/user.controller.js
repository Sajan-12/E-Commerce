const userModel=require("./user.schema.js");
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
const signUp=async(req,res)=>{

    const {name,email,password}=req.body;

     let check=await userModel.findOne({email});
     if(check){
        return res.status(400).json({success:false, msg:"email is exist"})
     }
     
         const hashPassword=await bcrypt.hash(password,12);
        let cart={};
        for(let i=0;i<300;i++){
            cart[i]=0;
        }

         const newUser=await userModel({name,email,password:hashPassword,cartData:cart});
         const savedUser=await newUser.save();
         res.json({success:true,user:savedUser});
     
}

const cookieoptions = {
    httpOnly: true,
    secure: true,           
    sameSite: 'None',       
    maxAge: 24 * 3600000    
};

const signIn=async(req,res)=>{
    const {email,password}=req.body;
    let user=await userModel.findOne({email});
    if(!user){
       return res.status(400).json({success:false,msg:"user does not exist"});
    }
    let result=await bcrypt.compare(password,user.password);
    if(!result){
      return  res.status(400).json({success:false,msg:"password does not matched"});
    }
    
    const token=jwt.sign({
        userId:user._id,
    },'secret_ecom',{ expiresIn: '1d'});
      res.cookie('token', token, cookieoptions);
      res.json({success:true,token});

}

module.exports={signUp,signIn};


