import React, { Component } from 'react'
import {Input} from 'antd'
import {connect} from 'react-redux'
import {fetchMatchUsers} from '../../actions/chatActions'
import MessengerChat from './MessengerChat'
import PropTypes from 'prop-types'
import moment from 'moment'
import { socket } from '../Root'
import {updateChatStatus} from '../../actions/chatActions'
import ChatUserAvatar from '../UI/UserAvatar'
import UserStatus from '../UI/UserStatus'
import escapeRegExp from 'escape-string-regexp';

const Search = Input.Search;

class Messenger extends Component {
    state = {
        query: '',
      chatWith: {}
    };
    componentDidMount(){
        this.props.fetchMatchUsers();
        socket.on('status', (data) => {
            this.props.updateChatStatus(data);
        });
    };

    selectUser = (user) => {
        this.setState({
          chatWith: user
      });
    };
    updateQuery = (query) => {
        this.setState({query: query.trim()})
    };

    clearQuery = () => {
        this.setState({query: ''})
    }

    render() {
        const {matchUsers} = this.props;
        const {query} = this.state;
        let showingContacts;
        if (query) {
            let matchesWithQuery = new RegExp(escapeRegExp(query), 'i');
            showingContacts = matchUsers.filter(contact =>
                matchesWithQuery.test(contact.firstname) ||  matchesWithQuery.test(contact.lastname))
        } else {
            showingContacts = matchUsers;
        }
        return (
            <div className="container-no-wrap">
                <div className="people-list-container">
                    <Search
                        placeholder="search"
                        onChange={(event) => this.updateQuery(event.target.value)}
                        style={{ width: '90%' }}/>
                    {showingContacts.length !== matchUsers.length && (
                        <div className='showing-contacts'>
                            <span>Now showing {showingContacts.length} of {matchUsers.length} total</span>
                            <button onClick={this.clearQuery}>Show all</button>
                        </div>
                    )}
                    <ul className="people-list">
                        {showingContacts.map((user) =>
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