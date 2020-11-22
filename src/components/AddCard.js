import React, { Component } from "react";

import Prof from '../lib/prof-service'

class AddCard extends Component {

  constructor(props){
    super(props);
    
    this.state = { 
      image:"",name: "", 
      author:props.user._id
    };

  }
  


  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFileUpload = async (event) => {
      console.log("the file to be uploaded is: ", event.target.files[0])

      const uploadData = new FormData()
      
      uploadData.append("image", event.target.files[0])

      try {
        const res = await Prof.handleUpload(uploadData)

        console.log("response is", res)

        this.setState({image: res.secure_url})
        
      } catch (error){
        console.log("while uploading", error)
      }
     
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      //const {image, name, author } = this.state;
      const res = await Prof.addCard(this.state)
      console.log("added",res)
      this.setState({image:"", name:""})
      console.log(this.props.history)
      window.location.reload()
      
    } catch (error){
      console.log("while adding the movie error",error)
    }
    
    /* const {image, name, author } = this.state;
    console.log('uploadimage -> form submit', { image, name, author });
    Prof.addCard({image, name, author });
    this.setState({ image:"",name: ""}) */
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
          <input type='file' name='image' onChange={event => this.handleFileUpload(event)} />
          <button type="submit">Save the new Card</button>

        </form>

        
      </div>
    );
  }
}

export default AddCard ;
