import React, { Component } from 'react'
import { Input, Button, message } from 'antd'
import { socket } from '../Root'
import {connect} from 'react-redux'
import { addChatMsg, cleanChatNotes } from '../../actions/chatActions'
import ChatUserAvatar from "../UI/UserAvatar";
import MessagesList from '../UI/MessagesList'
import PropTypes from 'prop-types'

const { TextArea } = Input;

class MessengerChat extends Component {
    state = {
        input: '',
        chatWith: {},
        scrollAtBottom: false
    };

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
                const {cleanChatNotes} = this.props;
                if (this.state.chatWith.id){
                    cleanChatNotes(this.state.chatWith.id);
                }
            }
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.chatWith.id !== this.props.chatWith.id){
            this.setState({
                chatWith: this.props.chatWith
            }, () => {
                this.props.cleanChatNotes(this.props.chatWith.id);
                this.scrollDown();
            });
        }
        if (this.state.scrollAtBottom) {
            this.scrollDown();
        }
    }

        //componentDidUpdate(prevProps) {
        //     if (prevProps.chatWith.id !== this.props.chatWith.id){
        //         this.setState({
        //             chatWith: this.props.chatWith
        //         }, () => {
        //             this.props.cleanChatNotes(this.props.chatWith.id);
        //             this.scrollDown();
        //         });
        //         let prevMessages = prevProps.chat.filter(message => prevProps.chatWith.id === message.recipient_id
        //             || prevProps.chatWith.id === message.author_id);
        //         let newMessages = this.props.chat.filter(message => this.props.chatWith.id === message.recipient_id
        //             || this.props.chatWith.id === message.author_id);
        //         if (prevMessages.length !== newMessages.length && document.querySelector('.chat-history')) {
        //             const chatContainer = document.querySelector('.chat-history');
        //             const scrollPos = chatContainer.scrollTop;
        //             const scrollBottom = (chatContainer.scrollHeight - chatContainer.clientHeight);
        //             this.setState({
        //                 scrollAtBottom: (scrollBottom <= 0) || (scrollPos === scrollBottom)
        //             });
        //             const {cleanChatNotes} = this.props;
        //             if (this.state.chatWith.id){
        //                 cleanChatNotes(this.state.chatWith.id);
        //             }
        //         }
        //     }
        //     if (this.state.scrollAtBottom) {
        //         this.scrollDown();
        //     }
        // }

    sendMsg = () => {
        const {user, addChatMsg} = this.props;
        console.log('this state input', this.state.input);

        if (!!this.state.input.trim()){
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
        } else {
            console.log(this.state.input);
            message.error(`Message cannot be empty`);
        }
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
    let chatContainer;
    if (chatWith.id) {
        chatContainer = (
            <div className="chat-container">
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
                    <MessagesList messages={messages} currentUserId={currentUserId} username={chatWith.username}/>
                </div>
                <div className="chat-message">
                    <TextArea value={this.state.input} rows={1} placeholder ="Type your message"
                              onKeyDown={this.onEnterPress} onChange={(e) => this.updateText(e.target.value)}/>
                    <Button onClick={this.sendMsg} className="center-button-chat" type="primary">Send</Button>
                </div>
            </div>
        );
    } else {
        chatContainer = (
            <div className="chat-container">
                <div className="choose-chat">Choose a user to start a chat</div>
            </div>
        );
    }
    const msgLength = messages.length;
    return chatContainer;
  }
}

function mapStateToProps({user, chat}) {
    return {
        user,
        chat: chat.all_messages
    };
};

function mapDispatchToProps(dispatch) {
    return {
        addChatMsg: (data) => dispatch(addChatMsg(data)),
        cleanChatNotes: (withId) => dispatch(cleanChatNotes(withId))
    }
}

MessengerChat.propTypes = {
    user: PropTypes.object,
    chat: PropTypes.array,
    addChatMsg: PropTypes.func.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(MessengerChat);
