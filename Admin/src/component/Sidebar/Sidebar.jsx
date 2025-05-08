import React from 'react'
import "./Sidebar.css";
import add_product_cart from "../../assets/Product_Cart.svg";
import product_list_icon from "../../assets/Product_list_icon.svg";
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to="/addproduct" style={{ textDecoration: 'none' }}>
      <div className='sidebar-item'>
        <img src={add_product_cart} alt=""/>
        <p>Add Product</p>
      </div>
      </Link>
      <Link to="/productlist" style={{ textDecoration: 'none' }}>
      <div className='sidebar-item'>
        <img src={product_list_icon} alt=""/>
        <p>Product List</p>
      </div>
      </Link>
    </div>
  )
}

export default Sidebar;
