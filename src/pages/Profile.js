import React, {Component} from 'react'
import Navbar from '../components/Navbar/Navbar'
import AddCard from '../components/AddCard'
import { withAuth } from '../lib/AuthProvider'
import Prof from '../lib/prof-service'
import { Link } from 'react-router-dom'
import EditCard from "../pages/EditCard"


class Profile extends Component{

  constructor(props) {

    console.log('props del perfil',props)
    super(props);
    this.state = {
      cards:[] ,
      user:props.user,
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

  delete (e, card){


    console.log(this.state.user._id)
     Prof.deleteCard(card.eachCard._id, this.state.userId)
     console.log('props del profile',this.props)
      this.props.history.push("/profile");
      return;
   
  }


  edit(){
    Prof.editCard()
  }

  render(){
    return (
    <div> 
    <Navbar/>
    <img src="" alt=""/>
    <h1>Profile of {this.state.user.username}</h1>

    <div >
          {this.state.cards &&
            this.state.cards.map((eachCard) => {
              {/* console.log(eachCard) */}
              return (

              <div key={eachCard._id}>
              <h1>{eachCard.name}</h1>
              <button onClick={(e)=>this.delete(e, {eachCard})}>Delete</button>
              <Link to={`/editCard/${eachCard._id}`}><button>Edit</button></Link>
              </div>

                
              );
            })}
        </div>

    
    <AddCard user={this.state.user}></AddCard>
    
    </div>
  )
  }  
  
}

export default withAuth(Profile);