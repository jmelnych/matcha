import React, { Component } from 'react'
import { Input, Button } from 'antd'
import { socket } from '../Root'
import {connect} from 'react-redux'
import { addChatMsg, getMessageHistory, cleanChatNotes, receiveChatMsg } from '../../actions/chatActions'
import moment from 'moment'
import ChatUserAvatar from "../UI/UserAvatar";
import PropTypes from 'prop-types'

const { TextArea } = Input;

class MessengerChat extends Component {
    state = {
        input: '',
        chatWith: {},
        scrollAtBottom: false
    };
    componentDidMount(){
        const {receiveChatMsg, cleanChatNotes} = this.props;
        if (socket) {
            socket.on('chat', (data) => {
                receiveChatMsg(data);
                if (this.state.chatWith.id === data.author_id){
                    cleanChatNotes(data.author_id);
                }
            });
        }
    };
    componentWillReceiveProps(nextProps){
        if (nextProps.chatWith.id !== this.state.chatWith.id){
            this.setState({
                chatWith: nextProps.chatWith
            }, () => {
                this.props.cleanChatNotes(nextProps.chatWith.id);
                this.scrollDown();
            });
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.chatWith.id) {
            let currentMsg = this.props.chat.filter(message => this.props.chatWith.id === message.recipient_id
                || this.props.chatWith.id === message.author_id);
            let newMessages = nextProps.chat.filter(message => nextProps.chatWith.id === message.recipient_id
                || nextProps.chatWith.id === message.author_id);
            if (currentMsg.length !== newMessages.length && document.querySelector('.chat-history')) {
                const chatContainer = document.querySelector('.chat-history');
                const scrollPos = chatContainer.scrollTop;
                const scrollBottom = (chatContainer.scrollHeight - chatContainer.clientHeight);
                this.setState({
                    scrollAtBottom: (scrollBottom <= 0) || (scrollPos === scrollBottom)
                });
            }
        }
    }

    componentDidUpdate() {
        if (this.state.scrollAtBottom) {
            this.scrollDown();
        }
    }

    sendMsg = () => {
        const {user, addChatMsg} = this.props;
        const data = {
            recipient_id: this.state.chatWith.id,
            author_id: user.user.id,
            message: this.state.input,
            added: new Date()

        };
        socket.emit('chat', data);
        addChatMsg(data);
        this.setState({
            input: ''
        });
    };

    scrollDown = () => {
        if (this.state.chatWith.id) {
            const chatContainer = document.querySelector('.chat-history');
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
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
    let messages = [];
    const {chatWith} = this.state;
    const chatAllMsg = this.props.chat;
    if (chatWith.id) {
        messages = chatAllMsg.filter(message => chatWith.id === message.recipient_id
            || chatWith.id === message.author_id);
    }
    const msgLength = messages.length;
    return (
        <div className="chat-container">
            {!chatWith.id && (<div className="choose-chat">Choose a user to start a chat</div>)}
            { chatWith.id && (
                <div>
                <div className="chat-header">
                    <ChatUserAvatar user={chatWith}/>
                    <div className="chat-header-about">
                        <div className="chat-header-with">Chat with {`${chatWith.firstname}, ${chatWith.lastname}`}</div>
                        <div className="chat-header-num-messages">
                            {msgLength > 0 ? `${msgLength} messages` : 'not messages yet'}
                        </div>
                    </div>
                </div>
                <div className="chat-history">

                <ul className="chat-history-list">
            {messages.map(message =>
                <li key={message.id} className="history-list-message">
                <div className="message-data">
                <span className="message-data-name">{currentUserId !== message.author_id ? `${chatWith.username}`
                    : 'me'} </span>
                <span className="message-data-time">{moment(message.added).fromNow()}</span>
                </div>
                <div className={"message " + (currentUserId !== message.author_id ? "other-message float-right"
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
        )}
        </div>
    );
  }
};

function mapStateToProps({user, chat}) {
    return {
        user,
        chat: chat.all_messages
    };
};

function mapDispatchToProps(dispatch) {
    return {
        addChatMsg: (data) => dispatch(addChatMsg(data)),
        receiveChatMsg: (data) => dispatch(receiveChatMsg(data)),
        getMessageHistory: () => dispatch(getMessageHistory()),
        cleanChatNotes: (withId) => dispatch(cleanChatNotes(withId))
    }
}

MessengerChat.propTypes = {
    user: PropTypes.object,
    chat: PropTypes.array,
    addChatMsg: PropTypes.func.isRequired,
    receiveChatMsg: PropTypes.func.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(MessengerChat);