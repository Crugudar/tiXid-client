import React, {Component} from 'react'
import Navbar from '../components/Navbar/Navbar'
import AddCard from '../components/AddCard'
import { withAuth } from '../lib/AuthProvider'
import Prof from '../lib/prof-service'
import { Link } from 'react-router-dom'


class EditCard extends Component{

  constructor(props) {

    console.log(props)
    super(props);
    this.state = {
        name:"",
        image:"",
        id:this.props.match.params.id
    }

    console.log('esto viene de props', this.props.match.params.id)
      
    };
    
  

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const {id, image, name } = this.state;

    console.log('esto es lo que hay en el estado',this.state)
    console.log('uploadimage -> form submit', { id, image, name });
    Prof.editCard({id, image, name });
    
    this.setState({ image:"",name: ""});
    this.props.history.push("/profile");

    console.log(this.props)
    
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  
  render(){
    const { image, name } = this.state;
    return (
      <div>
        <h1>Edit</h1>

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
};

export default withAuth(EditCard);