import React, { Component } from 'react';
class FlashMessage extends Component {
render() {
    const {id, type, text} = this.props.message;
    return (
      <div>{text}</div>
    );
  }
}
export default FlashMessage;