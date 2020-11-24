import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
//import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  //Tenemos que englobar el componente App con el componente Router de react-router-dom

      <Router>
      <App />
    </Router>
, document.getElementById('root'));
