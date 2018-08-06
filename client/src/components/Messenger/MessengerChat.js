import React, { Component } from 'react'
import { Input, Button } from 'antd'
import { socket } from './Messenger'
import {connect} from 'react-redux'
import { addChatMsg } from '../../actions/chatActions'
import PropTypes from 'prop-types'

const { TextArea } = Input;

class MessengerChat extends Component {
    componentDidMount(){
        const addMsg = this.props.addChatMsg;
        socket.on('chat', (data) => {
            //console.log(socket.id); unique socket id
            console.log('chat data component didMount', data);
        addMsg(data);
        });
    };

    state = {
        input: ''
    };

    sendMsg = () => {
        const {user} = this.props;
        socket.emit('chat', {
            recipientId: 2, //TODO: get recipient
            authorId: user.user.id,
            username: user.user.username,
            message: this.state.input,
            time: new Date()
        });
        //TODO: save msg to back
        this.setState({
            input: ''
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
    const currentUserId = this.props.user.user.id;
    const msgLength = this.props.chat.length;
    return (
        <div className="chat-container">
            <div className="chat-header">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg"
                     alt="avatar" />
                <div className="chat-header-about">
                    <div className="chat-header-with">Chat with Vincent Porter</div>
                    <div className="chat-header-num-messages">
                    {msgLength > 0 ? `${msgLength} messages` : 'not messages yet'}
                </div>
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
                        <div className={"message " + (currentUserId !== message.authorId ? "other-message float-right"
                            : "my-message")}>{message.message}</div>
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