import React, { useState } from 'react'
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
const AddProduct = () => {
    const [image,setImage]=useState(null);
    const [productDetails,setProductDetails]=useState({
      name:"",image:"",category:"Men",old_price:"",new_price:""
    })
    function imageHandler(e){
         setImage(e.target.files[0]);
    }
    function changeHandler(e){
      setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }
    
    const addProduct=async()=>{
      let responseData;
      let product=productDetails;
      let formData=new FormData();
      formData.append('product',image);
      await fetch('http://localhost:4000/upload',{
        method:'POST',
        headers:{
          Accept:'application/json'
        },
        body:formData
      }).then((res)=>res.json()).then((data)=>responseData=data);  
      if(responseData.success){
        product.image=responseData.image_url;
        console.log(product);
        await fetch('http://localhost:4000/addproduct',{
          method:'POST',
          headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify(product),
        }).then((resp)=>resp.json()).then((data)=>{data.success?alert('product Added'):alert("Failed")})
      } 
    }


  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input type="text" value={productDetails.name} onChange={changeHandler} name='name' placeholder='Type here'/>
      </div>
      <div className="addproduct-price">
      <div className="addproduct-itemfield">
        <p>Price</p>
        <input type="text" value={productDetails.old_price} onChange={changeHandler}  name='old_price' placeholder='Type here'/>
      </div>
      <div className="addproduct-itemfield">
        <p>Offer Price</p>
        <input type="text" value={productDetails.new_price} onChange={changeHandler}  name='new_price' placeholder='Type here'/>
      </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name='category' className='add-product-selector'>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="kid">Kid</option>
      </select>

      </div>
      
      <div className="addproduct-itemfield">
        <label htmlFor='file-input'>
            <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-image'/>
        </label>
        <input onChange={imageHandler} type='file' name='image' id='file-input' hidden/>
        <button onClick={()=>addProduct()} className="addproduct-btn">ADD</button>
      </div>
     
    </div>
  )
}

export default AddProduct;
