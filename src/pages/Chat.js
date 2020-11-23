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

    socket.emit('connection', (socket,this.props.user._id))

    socket.on('numberOfSockets', (sockUser)=>{
      console.log('you are',sockUser)
    })
  //   socket.emit("join", { name, room }, (error) => {
  //     if (error) {
  //       alert(error);
  //     }
  // })
  }


  render(){
    
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