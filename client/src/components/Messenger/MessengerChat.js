import React, { Component } from 'react'
import { Input, Button } from 'antd'
import { socket } from './Messenger'
import {connect} from 'react-redux'
const { TextArea } = Input;

class MessengerChat extends Component {
    state = {
        input: ''
    };

    sendMsg = () => {
        const {user} = this.props;
        console.log('send');
        //console.log(this.state.input);
        socket.emit('chat', {
            username: user.username,
            message: this.state.input,
            date: new Date()
        });
        this.setState({
            input: ''
        });
        socket.on('chat', function(data) {
            console.log(data);
        });

    };

    updateText = (value) => {
        this.setState({
            input: value
        })
    };

render() {
    let currentUsername = this.props.user.username;
    console.log(this.props.chat);
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
                        <div className="message-data align-right">
                            <span className="message-data-name">{message.username} </span>
                            <span className="message-data-time"> {message.time}</span>
                        </div>
                        <div className="message other-message float-right">{message.message}</div>
                    </li>
                    )}



                    {/*<li className="history-list-message">*/}
                        {/*<div className="message-data">*/}
                            {/*<span className="message-data-name">Vincent</span>*/}
                            {/*<span className="message-data-time">10:20 AM, Today</span>*/}
                        {/*</div>*/}
                        {/*<div className="message my-message">*/}
                            {/*Actually everything was fine. I'm very excited to show this to our team.*/}
                        {/*</div>*/}
                    {/*</li>*/}

                    {/*<li className="history-list-message">*/}
                        {/*<div className="message-data align-right">*/}
                            {/*<span className="message-data-time">10:14 AM, Today</span> &nbsp; &nbsp;*/}
                            {/*<span className="message-data-name">Olia</span>*/}
                        {/*</div>*/}
                        {/*<div className="message other-message float-right">*/}
                            {/*Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?*/}
                        {/*</div>*/}
                    {/*</li>*/}

                    {/*<li className="history-list-message">*/}
                        {/*<div className="message-data">*/}
                            {/*<span className="message-data-name">Vincent</span>*/}
                            {/*<span className="message-data-time">10:20 AM, Today</span>*/}
                        {/*</div>*/}
                        {/*<div className="message my-message">*/}
                            {/*Actually everything was fine. I'm very excited to show this to our team.*/}
                        {/*</div>*/}
                    {/*</li>*/}
                </ul>

            </div>
            <div className="chat-message">
                <TextArea value={this.state.input} rows={4}
                          placeholder ="Type your message" onChange={(e) => this.updateText(e.target.value)}/>
                <Button onClick={this.sendMsg} className="center-button-chat" type="primary">Send</Button>
            </div>
        </div>
    );
  }
};

function mapStateToProps({user, chat}) {
    return {user, chat};
}


export default connect(mapStateToProps)(MessengerChat);