import React, {Component} from 'react'
import Navbar from '../components/Navbar/Navbar'
import AddCard from '../components/AddCard'
import { withAuth } from '../lib/AuthProvider'
import Prof from '../lib/prof-service'
import { Link } from 'react-router-dom'
import EditCard from "../pages/EditCard"
import Points from '../components/Points'


class Profile extends Component{

  constructor(props) {

    console.log('props del perfil',props)
    super(props);
    this.state = {
      cards:[] ,
      user:props.user,
      image: "",
      userId:props.user._id,
    };
    
  }

  componentDidMount(){
    
    return Prof.cardList(this.state.user._id)
    .then((resp) =>{
      // console.log(resp)
    this.setState({
      cards: resp,
      
    })}
  )
  .catch((err) => console.log(err));
  }

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



handlePhotoSubmit = async (event) => {
  event.preventDefault();

  try {
    

    const author = this.state.user._id
    const image = this.state.image
    console.log('JHOLA CLAUDIA', image, author)
    const res = await Prof.addPhoto({image, author})
   
    console.log("added",res)
    this.setState({image:""})
    console.log('pastanaga')
    window.location.reload()
    
  } catch (error){
    console.log("while adding the movie error",error)
  }
  

};

  delete (e, card){


    console.log(this.state.user._id)
     Prof.deleteCard(card.eachCard._id, this.state.userId)
     console.log('props del profile',this.props)
      this.props.history.push("/profile");
      window.location.reload()
         
  }


  edit(){
    Prof.editCard()
  }

  render(){
    return (
    <div> 
    <Navbar/>
    
    <h1>Profile of {this.state.user.username}</h1>
    <div>
    <img src={this.state.user.image} alt="perfil"/>
    <form onSubmit={this.handlePhotoSubmit}>        
         <label>Image:</label>
          <input type='file' name='image' onChange={event => this.handleFileUpload(event)} />
          <button type="submit">New Profile Photo</button>
        </form>
    </div>
    

    <div >
          {this.state.cards &&
            this.state.cards.map((eachCard) => {
            
              return (
                //<h1>{eachCard.name}</h1>
 
              <div key={eachCard._id}>
              <img src={eachCard.image} alt="peine"/>
              <h1>{eachCard.name}</h1>
              <button onClick={(e)=>this.delete(e, {eachCard})}>Delete</button>
              <Link to={`/editCard/${eachCard._id}`}><button>Edit</button></Link>
              </div>

                
              );
            })}
        </div>

    
    <AddCard user={this.state.user}{...this.props}></AddCard>
    <Points/>
    
    </div>
  )
  }  
  
}

export default withAuth(Profile);