import React, {Component} from 'react'
import '../components/ChatTable.css'



class ChatTable extends Component {

  

  render() {
    return (
      <div className="scrolling-box">
    <table>
        <tbody>
          {this.props.messages.map( message =>
            <tr key={message.key}>
              <td >{message.name}:</td>
              <td>{message.message}</td>
            </tr>
          )}
        </tbody>
    </table>
    </div>
     
    )
  }
}

export default ChatTable