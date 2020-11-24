import React, {useEffect, useState} from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import "../pages/login&signup.css";



function Enter(props) {
 


  return (
    <div>
      
            <>
         
        <div className=" authform">
        <h1>Bienvenido a tiXid</h1>  
          <div className="enterForm">
            <>
             
              <Link className="link" to="/login">
            Login
              </Link>
              <p className="">
                ¿Aún no estás registrado? <Link className="link" to="/signup"> Registrate </Link>
              </p>
            </>
          </div>
        </div>
        </>
      
    </div>
  );
}

export default withAuth(Enter);
