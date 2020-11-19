import React, { Component } from "react";

import Prof from '../lib/prof-service'

class AddCard extends Component {

  constructor(props){
    super(props);
    console.log('heyyoooooooooooooooo',props.user._id)
    this.state = { image:"",name: "", author:props.user._id};

    console.log(this.state)
  }
  

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const {image, name, author } = this.state;
    console.log('uploadimage -> form submit', { image, name, author });
    Prof.addCard({image, name, author });
    this.setState({ image:"",name: ""})
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { image, name } = this.state;
    return (
      <div>
        <h1>Create your Card</h1>

        <form onSubmit={this.handleFormSubmit}>
        <label>Name:</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={this.handleChange}
          />

         
         <label>Image:</label>
          <input
            type='file'
            name='image'
            value={image}
            onChange={this.handleChange}
          />

         

          <input type='submit' value='Upload' />
        </form>

        
      </div>
    );
  }
}

export default AddCard ;
