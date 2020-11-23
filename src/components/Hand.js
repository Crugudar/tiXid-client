import React, {Component} from "react";
import {withAuth} from '../lib/AuthProvider'
import auth from '../lib/auth-service'

class Hand extends Component {

    constructor(props) {
      super(props)
      
      this.state = {
        cards:[],
        playerhands:{
            player1:[],
            player2:[],
            player3:[],
            player4:[],  
        },
        
        visible:[],
        selected:[]
      }
  }

  componentDidMount(){
      
    return auth.bringDeck()
    .then((resp) =>{
    this.setState({
      cards: resp, 
    })
    })
    .then(() =>{
    let manos=this.dealHand(this.state.cards,4)
    console.log(manos)
    this.setState({
        playerhands:{
            player1:manos[0],
            player2:manos[1],
            player3:manos[2],
            player4:manos[3],  
        }
    })
    })
    
  }
  
    dealHand =(arr,hands)=>{

        function shuffleArray(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        }
    }
    shuffleArray(arr);

    Array.prototype.chunk = function (n) {
            if (!this.length) {
            return [];
            }else{return [this.slice(0, n)].concat(this.slice(n).chunk(n));}
            
        };
   
    return arr.chunk(arr.length / 4);
    }

    
    selectCard(url){

    }

    


  render(){
    this.state.visible.forEach(playerhand=>{
        return playerhand
    })
    console.log('piripippppp',this.state.playerhands.player1[0]?.url)
    return (
      <>
      {this.state.playerhands.player1.length? (<>
      <h1>Hola esta es la mano</h1>
      <div>
      <div className="player">
        <h1>Player 1</h1>
        <div className="hand">
            <div className="card">
                <img src={this.state.playerhands.player1[0].url} alt=""/>
                <button onClick={()=>this.selectCard()}>Select</button>
            </div>
        <div className="card">
            <img src={this.state.playerhands.player1[1].url} alt=""/>
            <button onClick={this.selectCard}>Select</button>
        </div>
        <div className="card">
            <img src={this.state.playerhands.player1[2].url} alt=""/>
            <button onClick={this.selectCard}>Select</button>
        </div>
        <div className="card">
            <img src={this.state.playerhands.player1[3].url} alt=""/>
            <button onClick={this.selectCard}>Select</button>
        </div>
        </div>
      </div>
      <div className="player">
        <h1>Player 2</h1>
        <div className="hand"></div>
        <div className="card">
            <img src={this.state.playerhands.player2[0].url} alt=""/>
            <button onClick={this.selectCard}>Select</button>
        </div>
        <div className="card">
            <img src={this.state.playerhands.player2[1].url} alt=""/>
            <button onClick={this.selectCard}>Select</button>
        </div>
        <div className="card">
            <img src={this.state.playerhands.player2[2].url} alt=""/>
            <button onClick={this.selectCard}>Select</button>
        </div>
        <div className="card">
            <img src={this.state.playerhands.player2[3].url} alt=""/>
            <button onClick={this.selectCard}>Select</button>
        </div>
        </div>
      </div>
      <div className="player">
        <h1>Player 3</h1>
        <div className="hand">        
        <div className="card">
            <img src={this.state.playerhands.player3[0].url} alt=""/>
            <button onClick={this.selectCard}>Select</button>
        </div>
        <div className="card">
            <img src={this.state.playerhands.player3[1].url} alt=""/>
            <button onClick={this.selectCard}>Select</button>
        </div>
        <div className="card">
            <img src={this.state.playerhands.player3[2].url} alt=""/>
            <button onClick={this.selectCard}>Select</button>
        </div>
        <div className="card">
            <img src={this.state.playerhands.player3[3].url} alt=""/>
            <button onClick={this.selectCard}>Select</button>
        </div>
        </div>
      </div>
      <div className="player">
        <h1>Player 4</h1>
        <div className="hand"> 
        <div className="card">
            <img src={this.state.playerhands.player4[0].url} alt=""/>
            <button onClick={this.selectCard}>Select</button>
        </div>
        <div className="card">
            <img src={this.state.playerhands.player4[1].url} alt=""/>
            <button onClick={this.selectCard}>Select</button>
        </div>
        <div className="card">
            <img src={this.state.playerhands.player4[2].url} alt=""/>
            <button onClick={this.selectCard}>Select</button>
        </div>
        <div className="card">
            <img src={this.state.playerhands.player4[3].url} alt=""/>
            <button onClick={this.selectCard}>Select</button>
        </div>
      </div>
      </div>
      </>):<p>Loading</p>}
        
      </>
        
      
        
    )}
} 

export default withAuth(Hand);