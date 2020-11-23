import React, { Component } from "react";

import Prof from '../lib/prof-service'

class AddCard extends Component {

  constructor(props){
    super(props);
    console.log('heyyoooooooooooooooo',props.user._id)
    this.state = { image:"",name: "", author:props.user._id};

    console.log(this.state)
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

         

        
      </div>
    );
  }
}

export default AddCard ;
