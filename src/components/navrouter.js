import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

import About from "./About";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import Youtube from "./Youtube";
import NavStyle from "./Nav.module.css";
import { Product } from "./Product";
import { useNavigate } from "react-router-dom";
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "underline" : "none",
      color: isActive ? "Lightblue" : "white",
    };
  };

const NavRouter = ( ) => {
 
  return (
    <div>
      <nav className="bg-secondary d-flex justify-content-lg-betweeb navbar navbar-dark px-2">
        <div>
          <NavLink style={navLinkStyles} to="/">
            Logo
          </NavLink>
        </div>
        <div className="d-flex">
          <div>
            <NavLink
              to="/about"
              className="navbar-brand"
              style={navLinkStyles}
              element={<About />}
            >
              About
            </NavLink>
            <NavLink
              to="/login"
              className="navbar-brand"
              style={navLinkStyles}
              element={<LoginForm />}
            >
              Login
            </NavLink>
            <NavLink
              to="/registration"
              className="navbar-brand"
              style={navLinkStyles}
              element={<RegistrationForm />}
            >
              Registration
            </NavLink>
           
              <NavLink
                to="/youtube"
                style={navLinkStyles}
                className="navbar-brand"
                element={<Youtube />}
              >
                Youtube
              </NavLink>
           
            <NavLink
              to="/products"
              style={navLinkStyles}
              className="navbar-brand"
              element={<Product />}
            >
              Product
            </NavLink>
          </div>
        
          
        </div>
      </nav>
    </div>
  );
};

export default NavRouter;