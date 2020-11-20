import React from 'react';
import {withAuth} from '../lib/AuthProvider';
import Navbar from '../components/Navbar/Navbar'

import { Link } from "react-router-dom";





function Enter (props) {
console.log(props)

  return (
    <> 
        
       
                           
                        <div className="row align-items-center w-100 h-100">
                            <div className="col-12 align-self-center text-center intro-text">
                                {(!props.isLoggedin) ? <><p>ESTO DEBERÍAS VERLO SI NO ESTÁS LOGGEADO. </p>
                                    </>: <>
                                    <Navbar/>
                                    <p>BIENVENIDO {(props.user.username) && props.user.username}.</p><br/>
                                    
                                    </>}
                            </div>
                            </div>
                        <div className="row align-items-center w-100 h-100">
                            <div className="col-12 align-self-center text-center mt-4">
                                {(!props.isLoggedin) ? <>
                                <Link to='/login'><button className='btn-inputs'>Login</button></Link>
                                <p className="mt-2">¿Aún no estás registrado? <Link to ='/signup'> Registrate </Link></p></>
                                : <><Link to='/game'><button className='btn-inputs'>Jugar</button></Link></>}
                            </div>
                            </div>
                            



    </>
  )
}

export default withAuth(Enter);