import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";

import "./Navbar.css"

class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;

      
    return (
      <nav className="navbar">
     

     
        <Link to={"/"} id="home-btn">
          <h4>tiXid</h4>
        </Link>
        
          <>
            <p className="navbar-user">Hello: {user.username}</p>
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
           
          </>
        
        
      </nav>
  );
  }
}

export default withAuth(Navbar);
