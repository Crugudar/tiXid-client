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
            <button className="navbar-button" onClick={logout}>
              Logout
            </button>
            
          
        <Link to={"/profile"} id="home-btn">
            <button className="navbar-button" >
              Profile
            </button>
        </Link>

        <Link to={"/"} id="home-btn">
            <button className="navbar-button" >
              Game
            </button>
        </Link>
            </div>
         
       
        
      </nav>
  );
  }
}

export default withAuth(Navbar);
