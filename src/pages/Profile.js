import React, {Component} from 'react'
import Navbar from '../components/Navbar/Navbar'
import AddCard from '../components/AddCard'
import { withAuth } from '../lib/AuthProvider'
import Prof from '../lib/prof-service'


class Profile extends Component{

  constructor(props) {
    super(props);
    this.state = {
      cards:[] ,
      user:props.user,
    };
    
  }

  componentDidMount(){
    console.log('cartaaaaaaaaaaaaaaaaas',this.state.user._id)
    return Prof.cardList(this.state.user._id)
    .then((resp) =>{
      console.log(resp)
    this.setState({
      cards: resp,
    })}
  )
  .catch((err) => console.log(err));
  }


  render(){
    return (
    <div> 
    <Navbar/>
    <img src="" alt=""/>
    <h1>Profile of {this.state.user.username}</h1>

    <div className="ownTravels-container">
          {this.state.cards &&
            this.state.cards.map((eachCard) => {
              return (

                  //para que aparezca hará falta hacer el populate en el back dentro de alguna ruta

                <h1>{eachCard.name}</h1>
              );
            })}
        </div>

    
    <AddCard user={this.state.user}></AddCard>
    
    </div>
  )
  }  
  
}

export default withAuth(Profile);