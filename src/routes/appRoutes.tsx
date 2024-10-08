import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from "../pages/landingpage";
import { Login } from "../pages/loginPage";
import { Register } from "../pages/registerPage";
import { SellerDashboard } from "../pages/dashboard/seller";
import { Dashboard } from "../pages/dashboard/dashboard";
import Products from "../pages/products";
const AppRoutes: React.FC = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login"element ={<Login/>}/>
          <Route path="/register"element ={<Register/>}/>
          <Route path="/dashboard/add-products"element ={<SellerDashboard/>}/>
          <Route path="/dashboard"element ={<Dashboard/>}/>
          <Route path="/products"element ={<Products/>}/>
        </Routes>
      </Router>
    );
  };
  
  export default AppRoutes;