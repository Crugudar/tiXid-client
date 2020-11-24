import React, {useEffect, useState} from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import "../pages/login&signup.css";
import classes from '../components/BackgroundVideo.module.css'



function Home(props) {
 
  const videoSource = "https://res.cloudinary.com/lemonade292/video/upload/v1606155635/videos%20tixid/VIDEO_Dixit_Boxart_seafhb.mp4"

  return (
    <div>
      
      <>
          <Navbar />
             
       
          
          <div className={classes.Container} >
            <video autoPlay="autoplay" loop="loop" muted className={classes.Video} >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className={classes.Content}>
                <div className={classes.SubContent} >
                <p>Welcome to Dixit {props.user.username && props.user.username}!</p>
          <br />
         
            <Link to="/game">
              <button>Let's Play!</button>
            </Link> 
                </div>
            </div>
        </div>
        
        
        </>
    
    </div>
  );
}

export default withAuth(Home);
