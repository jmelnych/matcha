import React, { Component } from 'react'
import { Alert } from 'antd'
import PropTypes from 'prop-types'

class FlashMessage extends Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
    }
    onClose = () => {
        const {message, deleteFlashMessage} = this.props;
        deleteFlashMessage(message.id);
    };

render() {
    console.log(this.props);
    const {id, type, text} = this.props.message;
    return (
        <Alert message={type === 'success' ? 'Success Tips' : 'Error'} description={text}
               closable onClose={this.onClose}
               type={type === 'success'? 'success' : 'error'} showIcon />
    );
  }
}
FlashMessage.propTypes = {
    message: PropTypes.object.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired
}

export default FlashMessage;