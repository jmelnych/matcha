import React, { Component } from 'react'
import {Input} from 'antd'
import {connect} from 'react-redux'
import {fetchMatchUsers} from '../../actions/chatActions'
import MessengerChat from './MessengerChat'
import PropTypes from 'prop-types'
import moment from 'moment'
import { socket } from '../Root'
import {updateChatStatus} from '../../actions/chatActions'
import ChatUserAvatar from './MessengerUI/ChatUserAvatar'
import UserStatus from './MessengerUI/UserStatus'

const Search = Input.Search;

class Messenger extends Component {
    state = {
      chatWith: {}
    };
    componentDidMount(){
        this.props.fetchMatchUsers();
        socket.on('status', (data) => {
            this.props.updateChatStatus(data);
            console.log('comp Did Mount');
        });
    };

    selectUser = (user) => {
        this.setState({
          chatWith: user
      });

    };
    render() {
        const {matchUsers} = this.props;
        return (
            <div className="container-no-wrap">
                <div className="people-list-container">
                    <Search
                        placeholder="search"
                        onSearch={value => console.log(value)}
                        style={{ width: '90%' }}/>
                    <ul className="people-list">
                        {matchUsers.map((user) =>
                            <li key={user.id} className="people-list-person" onClick={() => this.selectUser(user)}>
                                <ChatUserAvatar user={user}/>
                                <div className="people-list-person-about">
                                    <div className="people-list-person-name">{`${user.firstname} ${user.lastname}`}</div>
                                    <div className="people-list-person-status">
                                <UserStatus status={user.online}/>
                                {user.online === 1 ? "online" :
                                    `last seen ${moment(user.last_seen).fromNow()}`}
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
                <MessengerChat chatWith={this.state.chatWith}/>
            </div>
        );
    }
};

function mapStateToProps({matchUsers}) {
    return {matchUsers}
}

Messenger.propTypes = {
    fetchMatchUsers: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {fetchMatchUsers, updateChatStatus})(Messenger);