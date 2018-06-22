import React, {Component} from 'react'
import {connect } from 'react-redux'
import FlashMessage from './FlashMessage'

class FlashMessagesList extends Component {
    render() {
        console.log('flashMessages.js line 7' + this.props);
        const messages = this.props.messages.map(message =>
        <FlashMessage key={message.id} message={message}/>
        )
        return(
            <div>
                {messages}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        messages: state.flashMessages
    }
}

export default connect(mapStateToProps)(FlashMessagesList);