import React, {Component} from 'react'
import io from 'socket.io-client'
import ChatTable from '../components/ChatTable.js'

class ChatRoom extends Component {

  constructor(props) {
    super(props)

        this.state = {
        messages: [],
        newMessage: ''
        }

    this.socket = io("http://localhost:4000", {
        transports: ["websocket", "polling"]
    });

   
}

  componentDidMount() {
    this.socket.on('chat', message => {
      message.key = JSON.stringify(message)
      console.log(message)
      
      this.setState({
        messages:[...this.state.messages, message]
    }) 
    })
    }
  
    componentWillUnmount() {
        this.socket.close()
    }

  setNewMessage(event) {
    this.setState({
      newMessage: event.target.value,
      
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.socket.emit('chat', {
      name: this.props.name,
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
        <ChatTable messages={this.state.messages} />
       
      </div>
    )
  }

  
}

export default ChatRoom;