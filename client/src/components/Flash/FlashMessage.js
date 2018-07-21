import React, { Component } from 'react'
import { Alert } from 'antd'
import PropTypes from 'prop-types'

class FlashMessage extends Component {
    componentDidMount(){
        this.onClose = this.onClose.bind(this);
        setTimeout(() => {this.onClose()}, 3000);
    };

    onClose = () => {
        const {message, deleteFlashMessage} = this.props;
        deleteFlashMessage(message.id);
    };


render() {
    const {id, type, text} = this.props.message;
    let alertType;
    switch (type) {
        case 'success':
            alertType = 'success';
            break;
        case 'error':
            alertType = 'error';
            break;
        case 'warning':
            alertType = 'warning';
            break;
    }
    return (
        <Alert message={alertType} description={text}
               closable onClose={this.onClose}
               type={alertType}/>
    );
  }
}

FlashMessage.propTypes = {
    message: PropTypes.object.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired
}

export default FlashMessage;