import React, {Component} from "react";
import { Link } from "react-router-dom";
import io from 'socket.io-client';
import ChatTable from '../components/ChatTable'
import GameTable from '../components/GameTable';
import '../components/Hand.css'
import auth from '../lib/auth-service'

import {withAuth} from '../lib/AuthProvider'



  const socket = io("http://localhost:4000", {
        transports: ["websocket","polling"]})


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
        
    yourhand:[],
    selected:[],
    info:[],
    currentplayer:0,
       
    }
}

    

//Lo que ocurre cuando se forma el componente
 componentDidMount(){
    
    
       console.log('Hola');
        socket.emit('hola', this.props.user) 
        socket.on('welcome',async (data)=>{
        console.log(`you are in room ${data.room}, and are player ${data.player}`)
         this.setState({
            currentplayer:data.player
        })

        console.log(this.state.currentplayer)
        })
      socket.on('otherusers',(data)=>{
        console.log(data)
      })

      //recibe los mensajes del back
      socket.on('chat', message => {
        message.key = JSON.stringify(message)
        console.log(message)
        this.setState({
        messages:[...this.state.messages, message]
        })  })
 

} 
    // let validator=false;
    // if(validator===false){
    //     socket.emit('hola', this.props.user) 
    //  socket.on('welcome',(data)=>{
    //   console.log(`you are in room ${data.room}, and are player ${data.player}`)
    //   this.setState({
    //       currentplayer:data.player
    //   })

    //   console.log(this.state.currentplayer)
    // })
    //   socket.on('otherusers',(data)=>{
    //     console.log(data)
    //   })
    // validator=true
    // }




  async getCards(){
    const resp = await auth.bringDeck();
    
      this.setState({
          cards: resp,
      });
      let manos = this.dealHand(this.state.cards, 4);
      ;
      this.setState({
          playerhands: {
              player1: manos[0],
              player2: manos[1],
              player3: manos[2],
              player4: manos[3],
          }
      });
      console.log(this.state.currentplayer)
    this.assignHand(); 
    
    
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

    //función que setea tu mano
    assignHand(){

        if(this.state.currentplayer===1){
            this.setState({
                yourhand:this.state.playerhands.player1
            })
        }else if(this.state.currentplayer===2){
            this.setState({
                yourhand:this.state.playerhands.player2
            }) 
        }else if(this.state.currentplayer===3){
            this.setState({
                yourhand:this.state.playerhands.player3
            })
        }else if(this.state.currentplayer===4){
            this.setState({
                yourhand:this.state.playerhands.player4
            })
        }
       
    }    
    
     selectCard(e){
        const {name}=e.target

        console.log(name)
        
        socket.emit('cardselected', name);

        socket.on('selectedcards', (data)=>{
                console.log('cartitaaaaaaaaaaaaaaaaas',data)    
                   this.setState({
                    selected:data,
                }) 
                console.log('estaditoooooooooooooooo',this.state.selected)              
         })
        
    }

 

  render(){
    
    // if(this.state.currentplayer===0){
    //     console.log('Hola');
    //  socket.emit('hola', this.props.user) 
    //   socket.on('welcome',(data)=>{
    //    console.log(`you are in room ${data.room}, and are player ${data.player}`)
    //    this.setState({
    //        currentplayer:data.player
    //    })
 
    //    console.log(this.state.currentplayer)
    //  })
    //    socket.on('otherusers',(data)=>{
    //      console.log(data)
    //    })
  
    //  }


    return (
    <>
    {this.state.currentplayer? (
    <>
      <div>
      <div>
          {this.state.info}
      </div>
        <div>
            {this.state.selected.length? <>
                <div>
                    <div><img src={this.state.selected[0]} alt=""/></div>
                </div>
                <div>
                    <div><img src={this.state.selected[1]} alt=""/></div>
                </div>
                <div>
                    <div><img src={this.state.selected[2]} alt=""/></div>
                </div>
                <div>
                    <div><img src={this.state.selected[3]} alt=""/></div>
                </div>
            </>:<p>Wait for it</p>}
        </div>
        <button onClick={()=>this.getCards()}> Get cards</button>
        <div>
        <>
      {this.state.yourhand.length? (<>
      
      <div className="allhands">
      
      <div className="player">

        <h1>Player {this.state.currentplayer}</h1>
       
            <div className="card">
                <img src={this.state.yourhand[0].url} alt=""/>
                <button name={this.state.yourhand[0].url} onClick={(e)=>this.selectCard(e)}>Select</button>
            </div>
        <div className="card">
            <img src={this.state.yourhand[1].url} alt=""/>
            <button name={this.state.yourhand[1].url} onClick={(e)=>this.selectCard(e)}>Select</button>
        </div>
        <div className="card">
            <img src={this.state.yourhand[2].url} alt=""/>
            <button name={this.state.yourhand[2].url} onClick={(e)=>this.selectCard(e)}>Select</button>
        </div>
        <div className="card">
            <img src={this.state.yourhand[3].url} alt=""/>
            <button name={this.state.yourhand[3].url} onClick={(e)=>this.selectCard(e)}>Select</button>
        </div>
       
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
    ):null}
      
        
    </>  
    )
}
}



export default withAuth(Game)