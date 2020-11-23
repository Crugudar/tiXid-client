import React, {Component} from "react";
import { Link } from "react-router-dom";
import io from 'socket.io-client';
import ChatTable from '../components/ChatTable'
import GameTable from '../components/GameTable';
import '../components/Hand.css'
import auth from '../lib/auth-service'

import {withAuth} from '../lib/AuthProvider'



  const socket = io("http://localhost:4000", {
        transports: ["websocket", "polling"]})


class Game extends Component {

  constructor(props) {
    
    super(props)
    this.state = {
      name: null,
      messages: [],
      newMessage: '',
        user:this.props.user,
        cards:[],
        playerhands:{
            player1:[],
            player2:[],
            player3:[],
            player4:[],  
        },
        
        visible:[],
        selected:[],
        players:[]
       
    }
}

//Lo que ocurre cuando se forma el componente
  componentDidMount(){
    
    socket.emit('user',(this.props.user._id));
    
    socket.on('user', (data)=>{
        this.setState({
            players:[...this.state.players, data]
            
        })
        console.log(this.state.players) 
    })

    socket.on('chachi',(data)=>{
      console.log('heyyyyyy',data)
    })

   
    
    //recibe los mensajes del back
    socket.on('chat', message => {
        message.key = JSON.stringify(message)
        console.log(message)
        this.setState({
        messages:[...this.state.messages, message]
        }) 
    })
    //trae la baraja entera
    return auth.bringDeck()
    .then((resp) =>{
    this.setState({
      cards: resp, 
    })
    })
    //reparte cartas entre jugadores
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

  
  

    //cierra el socket si te vas
    componentWillUnmount() {
        socket.close()
    }
    //envía mensajes al back
        handleSubmit(event) {
        event.preventDefault()
        socket.emit('chat', {
            userId:this.props.user._id,
            name: this.props.user.username,
            message: this.state.newMessage,
            timestamp: new Date().toISOString()
        })
        this.setState({
            newMessage: ''
        })
        
        }
    //setea los mensajes en el estado para que se guarden
    setNewMessage(event) {
    this.setState({
        newMessage: event.target.value,
        
    })
    }
    //función repartidora de cartas
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

    //termina función repartidora de cartas
    selectCard(url){

    }

    



  render(){
    
    return (
      <>
      <div>
        <div>
            <GameTable/>
        </div>
        <div>
        <>
      {this.state.playerhands.player1.length? (<>
      <h1>Hola esta es la mano</h1>
      <div className="allhands">
      <div className="player">
        <h1>Player 1</h1>
       
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
      <div className="player">
        <h1>Player 2</h1>
        
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
      
      <div className="player">
        <h1>Player 4</h1>
        
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
      
      </>):<p>Loading</p>}
        
      </>
        </div>
        <div className="ChatRoom">
            <div>

                <form action="" onSubmit={(e)=>this.handleSubmit(e)}>
                    <label htmlFor=""> Message</label>
                    <input id="message"
                                type="text"
                                label="Message"
                                placeholder="Enter your Message"
                                onChange={(e)=>this.setNewMessage(e)}
                                value={this.state.newMessage}
                                autoComplete="off"/>
                        
                    <button type="submit">Send</button>
                    

                </form>
                <ChatTable messages={this.state.messages} user={this.state.user}/>

                </div> 
        </div>
      </div>
      <Link to='/'><button >Get out</button></Link>
       
      </>
        
      
    )
}
}



export default withAuth(Game)