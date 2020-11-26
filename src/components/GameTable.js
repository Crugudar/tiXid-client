import React, {Component} from 'react'
import {withAuth} from '../lib/AuthProvider'

        

    


class GameTable extends Component {

  constructor(props) {
    super(props)
    
        this.state = {
        card1:"",
        card2:"",
        card3:"",
        card4:"",
        }

    };
   


  render() {
    return (
      <div>
          <h1>Hola esta es la mesa</h1>
        <div className="table">
          <div className="card">
            <img src="" alt=""/>
          </div>
          <div className="card">
            <img src="" alt=""/>
          </div>
          <div className="card">
            <img src="" alt=""/>
          </div>
          <div className="card">
            <img src="" alt=""/>
          </div>
        </div>
        
       
      </div>
    )
  }

  
}

export default withAuth(GameTable);