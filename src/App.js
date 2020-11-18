import React, { Component } from "react";
import "./App.css";
import { Switch } from "react-router-dom";

import AuthProvider from "./lib/AuthProvider";

import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Private from "./pages/Private";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";

class App extends Component {
  render() {
    return (
      //Tendremos a AuthProvider englobando a todos los componentes

      <AuthProvider>
      {/* //Pondremos un div con un className "container" que engloble a los componentes */}
        <div className='container'>
        {/* //Renderizamos el componente Navbar para mostrarlo en todas las página */}
          <Navbar/>
          {/* //Usaremos Switch para englobar las rutas */}
          <Switch>
          {/*Por último, usamos el componente AnonRoute y PrivateRoute para añadirle un exact path y asignarles los componentes,
            así como Signup y Login tienen que ser rutas públicas, Private tiene que ser una ruta privada*/}
            <AnonRoute exact path='/signup' component={Signup}/>
            <AnonRoute exact path='/login' component={Login}/>
            <PrivateRoute exact path='/private' component={Private}/>
          </Switch>
        </div>
      </AuthProvider>
         
    );
  }
}

export default App;
