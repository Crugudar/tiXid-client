import React, {useEffect, useState} from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import "../pages/login&signup.css";



function Home(props) {
 


  return (
    <div>
      
        <>
          <Navbar />
          <p>BIENVENIDO {props.user.username && props.user.username}.</p>
          <br />
          <>
            <Link to="/game">
              <button>Jugar</button>
            </Link>
          </>
        </>
    
    </div>
  );
}

export default withAuth(Home);
