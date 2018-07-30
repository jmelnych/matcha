import React, { Component } from 'react'
import { Input, Button } from 'antd'
import { socket } from './Messenger'
import {connect} from 'react-redux'
import { addChatMsg } from '../../actions/chatActions'
import PropTypes from 'prop-types'

const { TextArea } = Input;

class MessengerChat extends Component {
    state = {
        input: ''
    };

    sendMsg = () => {
        const {user} = this.props;
        const addMsg = this.props.addChatMsg;
        socket.emit('chat', {
            username: user.user.username,
            message: this.state.input,
            time: new Date()
        });
        this.setState({
            input: ''
        });
        socket.on('chat', function(data) {
            addMsg(data);
        });

    };

    updateText = (value) => {
        this.setState({
            input: value
        })
    };

    onEnterPress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            this.sendMsg();
        }
    };

render() {
    let currentUsername = this.props.user.user.username;
    return (
        <div className="chat-container">
            <div className="chat-header">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
                <div className="chat-header-about">
                    <div className="chat-header-with">Chat with Vincent Porter</div>
                    <div className="chat-header-num-messages">already 1 902 messages</div>
                </div>
            </div>
            <div className="chat-history">

                <ul className="chat-history-list">
                    {this.props.chat.map(message =>
                    <li key={message.id} className="history-list-message">
                        <div className="message-data">
                            <span className="message-data-name">{message.username} </span>
                            <span className="message-data-time"> {message.time}</span>
                        </div>
                        <div className={"message " + (currentUsername !== message.username ? "other-message float-right" : "my-message")}>{message.message}</div>
                    </li>
                    )}
                </ul>

            </div>
            <div className="chat-message">
                <TextArea value={this.state.input} rows={1} placeholder ="Type your message"
                          onKeyDown={this.onEnterPress} onChange={(e) => this.updateText(e.target.value)}/>
                <Button onClick={this.sendMsg} className="center-button-chat" type="primary">Send</Button>
            </div>
        </div>
    );
  }
};

function mapStateToProps({user, chat}) {
    return {user, chat};
}

MessengerChat.propTypes = {
    user: PropTypes.object,
    chat: PropTypes.array,
    addChatMsg: PropTypes.func.isRequired
}
export default connect(mapStateToProps, { addChatMsg })(MessengerChat);