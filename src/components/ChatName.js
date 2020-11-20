import React, {Component} from 'react';
import {withAuth} from '../lib/AuthProvider'


class ChatName extends Component {

  constructor(props) {
    console.log(props)
    super(props)
    this.state = {
      user: props.user,
      userID: props.user._id
    }
    

    this.setName = this.setName.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    return (

        <form action="" onSubmit={this.handleSubmit}>
            <label htmlFor=""> Name</label>
            <input id="name"
                        type="text"
                        label="Name"
                        placeholder="Enter your name"
                        onChange={this.setName}
                        autoComplete="off"/>
                   
            <button type="submit">Join Chat</button>
              

        </form>
      
    )
  }

  setName(event) {
    this.setState({
      name: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.handleSubmitName(this.state.name)
  }
}

export default withAuth(ChatName)