import { StrictMode } from 'react'
//admin url:https://e-commerce-admin-lsxi.onrender.com
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from  "react-router-dom";
createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <App/>
   </BrowserRouter>
)
