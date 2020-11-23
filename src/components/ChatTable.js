import React, {Component} from 'react'



class ChatTable extends Component {

  

  render() {
    return (
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
     
    )
  }
}

export default ChatTable