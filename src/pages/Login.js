import React, { Component } from "react";
import {withAuth} from '../lib/AuthProvider'
import { Link } from "react-router-dom";

class Login extends Component {
  state = { email: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    console.log('Login -> form submit', { email, password });
    this.props.login({ email, password });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <h1>Login</h1>

        <form onSubmit={this.handleFormSubmit}>
          <label>Email:</label>
          <input
            type='text'
            name='email'
            value={email}
            onChange={this.handleChange}
          />

          <label>Password:</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
          />

          <input type='submit' value='Login' />
        </form>

       
        <div>
             <Link to={'/signup'}>Don't have an account?</Link>
        </div>
        
      </div>
    );
  }
}

export default withAuth( Login);
