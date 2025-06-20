const port=4000;
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors");
const ProductController=require("./Product/product.controller.js");
const upload=require("./middleware/upload.middleware.js");
const {signUp,signIn}=require("./User/user.controller.js");
const userModel = require("./User/user.schema.js");
const fetchUser=require("./middleware/fetchUser.js");

const likeController=require('./liked/like.controllers.js');
const rrController=require('./RatingReview/ratingReviews.controllers.js');
app.use(express.json());
app.use(cors());

//connect to mongodb
mongoose.connect("mongodb+srv://sk9088075:070707@cluster1.w55zw.mongodb.net/path");


//create route for image upload
app.use('/images',express.static('upload/images'));

app.post('/upload',upload.single('product'),(req,res)=>{
    res.json({
        success:"true",
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//create endpoint for user
app.post('/signup',(req,res)=>{signUp(req,res);});
app.post('/login',(req,res)=>{signIn(req,res);});

//like endpoint
app.post('/like/:productId',fetchUser,likeController.addLike);
app.get('/liked',fetchUser,likeController.getLiked);

//rating and reviews endpoin
app.post('/rate/:productId',fetchUser,rrController.rateProduct);
app.get('/avg-rating/:productId',rrController.getRating);
app.post('/review/:productId',fetchUser,rrController.reviewProduct);
app.get('/all-reviews/:productId',rrController.getAllReviews);

//create endpoint for product
const productController=new ProductController();
app.post('/addproduct',(req,res)=>{productController.addProduct(req,res)});
app.delete('/deleteproduct/:id',(req,res)=>{productController.removeProduct(req,res)});
app.get('/products',(req,res)=>{productController.getAllProducts(req,res)});
app.get('/product/:id',(req,res)=>{productController.getOneProduct(req,res)});

//create endpoint for new collection
app.get('/newcollection',(req,res)=>productController.newCollection(req,res));

//create endpoint for popular in women
app.get('/popularinwomen',(req,res)=>{productController.popularInWomen(req,res)});

//create endpoint for related product
app.get('/relatedproduct/:id',(req,res)=>{productController.relatedProduct(req,res)});
//create api for addtocart

app.post('/addtocart',fetchUser,async(req,res)=>{
   let userData=await userModel.findOne({_id:req.userId});
       userData.cartData[req.body.itemId]+=1;
     await userModel.findOneAndUpdate({_id:req.userId},{ cartData:userData.cartData});
     res.send("item is added");
})

//create api for removefromcart
app.post('/removefromcart',fetchUser,async(req,res)=>{
    let userData=await userModel.findOne({_id:req.userId});
        if(userData.cartData[req.body.itemId]>0)
        userData.cartData[req.body.itemId]-=1;
      await userModel.findOneAndUpdate({_id:req.userId},{ cartData:userData.cartData});
      res.send("item is removed");
 })

 //create api for getCart item
 app.post('/getcartitem',fetchUser,async(req,res)=>{
    let userData=await userModel.findOne({_id:req.userId});
    if(userData){
        return res.json(userData.cartData);
    }

 })

//default api 
app.get("/",(req,res)=>{
    res.send("server is running on port 4000");
})
app.listen(port,(err)=>{
    if(!err){
        console.log("app listen on port 4000.")
    }
    else{
        console.log(err);
    }
})