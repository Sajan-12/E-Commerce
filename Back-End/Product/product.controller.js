
const productModel=require("./product.schema.js");

class ProductController{
       async addProduct(req,res){
        let id;
        let products=await productModel.find({});
        if(products.length>0){
            let lastProduct=products.slice(-1);
            id=lastProduct[0].id+1;
        }
        else id=1;
        const {name,image,category,old_price,new_price}=req.body;
        const newProduct=productModel({
            id,name,image,category,new_price,old_price
        });
        await newProduct.save();
        res.json({
            success:true,
            product:newProduct
        })
       }

       async removeProduct(req,res){
          const id=req.params.id;
          const product=await productModel.findOneAndDelete({id});
          if(product){
            res.send("product deleted successfuly");
          }
          else{
            res.send("product not found");
          }
         
       }

       async getAllProducts(req,res){

        let products=await productModel.find({}).populate("ratings");
        res.json({success:true,products:products}); 

       }

       async getOneProduct(req,res){
        let {id}=req.params;
        let product=await productModel.findOne({id:Number(id)}).populate("ratings");
        if(!product){
          res.send("product not found");
        }
        else {
          res.json({
            success:true,product:product
          })
        }
      }

     async newCollection(req,res){
      let products=await productModel.find({});
      let newcollection=products.slice(1).slice(-8);
      res.send(newcollection);
      }
      async popularInWomen(req,res){
        let products=await productModel.find({category:'Women'});
        let popular_in_women=products.slice(0,4);
        res.send(popular_in_women);
        }

        async relatedProduct(req,res){
          const id=req.params.id;
          let product=await productModel.find({id:Number(id)});
          console.log(product);
          let allRelatedProuducts=await productModel.find({category:product[0].category});
          let relatedProducts=allRelatedProuducts.slice(0,4);
          res.send(relatedProducts);
        }
    
}
module.exports = ProductController;