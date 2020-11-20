
import React, {Component} from "react";

import ChatName from '../components/ChatName'
import ChatRoom from '../components/ChatRoom'







require('./Chat.css')

class Chat extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: null
    }

    this.handleSubmitName = this.handleSubmitName.bind(this)
  }

  render() {
    return (
      <div>{!this.state.name &&
          <ChatName handleSubmitName={this.handleSubmitName}/>
        }
        {this.state.name && <ChatRoom name={this.state.name}/>
        }
      </div>
        
      
    )
  }

  handleSubmitName(name) {
    this.setState({
      name: name
    })
  }
}
export default Chat