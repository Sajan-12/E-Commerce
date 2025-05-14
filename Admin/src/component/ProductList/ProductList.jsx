import React, {useEffect, useState } from 'react';
import "./ProductList.css";
import cross_image from '../../assets/cross_icon.png';

const ProductList = () => {
   const[allProducts,setAllProducts]=useState([]);

   const fetchInfo=async()=>{
    const resp=await fetch('https://e-commerce-8waw.onrender.com/products');
    const data=await resp.json();
    setAllProducts(data.products);
      console.log(data);
   }

   useEffect(()=>{
    fetchInfo();
   },[]);

   async function removeProduct(id){
      await fetch(`https://e-commerce-8waw.onrender.com/deleteproduct/${id}`,{
        method:'DELETE',
        headers:{
          Accept:'Application/json',
          'Content-Type':'Application/json',
        },
      })
      fetchInfo();
   }

  return (
    <div className='list-product'>
        <h1>All Products List</h1>
        <div className="listproduct-format-main">
        <p>Products</p>
       <p>Title</p>
       <p>Category</p>
       <p>Old Price</p>
       <p>New Price</p>
       <p>Remove</p>
      </div>
      <div className="listProduct-allproducts">
        <hr/>
        {
          allProducts.map((product,index)=>{
            return <><div key={index} className='listproduct-format-main'>
              <div><img src={product.image} alt="" className='listproduct-icon'/></div>
              <p>{product.name}</p>
              <p>{product.category}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <div><img onClick={()=>{removeProduct(product.id)}} src={cross_image} alt="" className='listproduct-remove-icon'/></div>
              </div><hr/></>
          })
        }
        
      </div>
    </div>
  )
}

export default ProductList;
