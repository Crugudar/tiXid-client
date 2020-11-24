import React, {useEffect, useState} from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import "../pages/login&signup.css";
import classes from '../components/BackgroundVideo.module.css'



function Enter(props) {
 /*  document.querySelector("#page").addEventListener('click', (e, checkbox = document.querySelector('.navinput'))=>{ 
    if(checkbox.checked) { checkbox.checked = false; e.stopPropagation(); }
    }); */
  const videoSource = "https://res.cloudinary.com/lemonade292/video/upload/v1606155635/videos%20tixid/VIDEO_Dixit_Boxart_seafhb.mp4"
  return (
    <>
      
         
        <div className=" authform">
        
          <div className="enterForm2">
            
            <h2>Welcome to Dixit!</h2> 
              <Link className="loginlink" to="/login">
            Log In!
              </Link>
              <p className="signuptext">
                Don't have an account? <Link className="signuplink" to="/signup"> Sign Up! </Link>
              </p>
            
          </div>
        </div>
        
        
      
    </>
  );
}

export default withAuth(Enter);
