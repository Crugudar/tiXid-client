import React from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar/Navbar";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import "../pages/login&signup.css";

const socket = io("http://localhost:4000", {
  transports: ["websocket", "polling"],
});

function Enter(props) {
  return (
    <div>
      {!props.isLoggedin ? (
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
      ) : (
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
      )}
    </div>
  );
}

export default withAuth(Enter);
