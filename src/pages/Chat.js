import React, {Component} from "react";
import { Link } from "react-router-dom";
import io from 'socket.io-client';
import ChatRoom from '../components/ChatRoom';
import GameTable from '../components/GameTable';
import Hand from '../components/Hand'

import {withAuth} from '../lib/AuthProvider'



  const socket = io("http://localhost:4000", {
        transports: ["websocket", "polling"]})


class Chat extends Component {

  constructor(props) {
    
    super(props)
    this.state = {
      name: null
    }
}
  componentDidMount(){
    socket.on('num',(data)=>{
      console.log('heyyyyyy',data)
    })
    
    socket.on('connectToRoom',function(data) {
      document.body.innerHTML = '';
      document.write(data);
    })
  //   socket.emit('hola', { user:this.props.user._id})
    
  //   socket.on('hola', (data)=>{
  //     console.log(data)
  //   })
  }


  render(){
    // socket.emit('hola', (socket,this.props.user._id))
    // socket.on('welcomeMessage', (data)=>{
    //   console.log(data)
    // })
    return (
      <>
      <div>
        <div>
            <GameTable/>
        </div>
        <div>
          <Hand/>
        </div>
        <div>
          <ChatRoom/>  
        </div>
      </div>
      <Link to='/'><button >Get out</button></Link>
       
      </>
        
      
    )
}
}



export default withAuth(Chat)