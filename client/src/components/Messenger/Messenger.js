import React, { Component } from 'react'
import MessengerPeople from './MessengerPeople'
import MessengerChat from './MessengerChat'

class Messenger extends Component {
render() {
    return (
      <div className="container-no-wrap">
          <MessengerPeople/>
           <MessengerChat/>
      </div>
    );
  }
}
export default Messenger;