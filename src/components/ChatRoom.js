import React, {Component} from 'react'
import io from 'socket.io-client'
import ChatTable from '../components/ChatTable.js'
import {withAuth} from '../lib/AuthProvider'

const socket = io("http://localhost:4000", {
        transports: ["websocket", "polling"]})
        

    


class ChatRoom extends Component {

  constructor(props) {
    super(props)

        this.state = {
        messages: [],
        newMessage: '',
        user:this.props.user
        }

    };
   


  componentDidMount() {

    
    
    socket.on('chat', message => {
      message.key = JSON.stringify(message)
      // console.log(message)
      this.setState({
        messages:[...this.state.messages, message]
    }) 
    })
    
  }

    componentWillUnmount() {
      socket.close()
    }

  setNewMessage(event) {
    this.setState({
      newMessage: event.target.value,
      
    })
  }

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
  render() {
    return (
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
    )
  }

  
}

export default withAuth(ChatRoom);