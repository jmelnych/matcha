import React, { Component } from 'react'
import MessengerPeople from './MessengerPeople'
import MessengerChat from './MessengerChat'
import openSocket from 'socket.io-client'

export const socket = openSocket.connect('http://localhost:5000');

class Messenger extends Component {
render() {
    return (
      <div className="container-flex top-chat">
          <MessengerPeople/>
           <MessengerChat/>
      </div>
    );
  }
}
export default Messenger;