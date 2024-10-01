import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from "../pages/landingpage";
import { Login } from "../pages/loginPage";
import { Register } from "../pages/registerPage";
const AppRoutes: React.FC = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login"element ={<Login/>}/>
          <Route path="/register"element ={<Register/>}/>
        </Routes>
      </Router>
    );
  };
  
  export default AppRoutes;