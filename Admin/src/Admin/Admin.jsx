import "./Admin.css";
import React from 'react';

import Sidebar from "../component/Sidebar/Sidebar";
import { Routes,Route } from "react-router-dom";
import AddProduct from "../component/AddProduct/AddProduct";
import ProductList from "../component/ProductList/ProductList";
const Admin = () => {
  return (
    <div className="admin">
      <Sidebar/>
      <Routes>
      <Route path="/addproduct" element={<AddProduct/>}/>
      <Route path="/productlist" element={<ProductList/>}/>
      </Routes>
      
    </div>
  )
}

export default Admin;
