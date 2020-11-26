import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";

import "./Navbar.css"




class Navbar extends Component {
  render() {
    const { user, logout} = this.props;

      
    return (
      <nav className="navbar">
        <div className="nav">
          
           <div className="nav-links"></div> 
            
            
           

        <Link to={"/"} id="home-btn">
            <button className="navbar-button" >
              Home
            </button>
        </Link>
            
          
        <Link to={"/profile"} id="home-btn">
            <button className="navbar-button" >
              Profile
            </button>
        </Link>

           
        <Link to={"/rules"} id="home-btn">
            <button className="navbar-button" >
              Rules
            </button>
        </Link>

        <button className="navbar-button" onClick={logout}>
              Logout
        </button>
        
            </div>
         
       
        
      </nav>
  );
  }
}

export default withAuth(Navbar);
