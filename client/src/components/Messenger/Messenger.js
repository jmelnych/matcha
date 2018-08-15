import React, { Component } from 'react'
import {Input} from 'antd'
import {connect} from 'react-redux'
import MessengerChat from './MessengerChat'
import PropTypes from 'prop-types'
import { socket } from '../Root'
import {fetchMatchUsers, updateChatStatus} from '../../actions/chatActions'
import escapeRegExp from 'escape-string-regexp'
import orderBy from 'lodash/orderBy'
import ContactList from '../UI/ContactsList'

const Search = Input.Search;

class Messenger extends Component {
    state = {
        query: '',
      chatWith: {}
    };
    componentDidMount(){
        const {fetchMatchUsers, updateChatStatus} = this.props;
        fetchMatchUsers();
        socket.on('status', (data) => {
            updateChatStatus(data);
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
        const unreadMsgs = this.props.unread;
        let showingContacts;
        if (query) {
            let matchesWithQuery = new RegExp(escapeRegExp(query), 'i');
            showingContacts = matchUsers.filter(contact =>
                matchesWithQuery.test(contact.firstname) ||  matchesWithQuery.test(contact.lastname))
        } else {
            showingContacts = matchUsers;
        }
        showingContacts = orderBy(showingContacts, ['online'], ['desc']);
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
                    <ContactList selectUser={this.selectUser} users={showingContacts} unreadMsgs={unreadMsgs}/>
                </div>
                <MessengerChat chatWith={this.state.chatWith}/>
            </div>
        );
    }
};

function mapStateToProps({matchUsers, chat}) {
    return {
        matchUsers,
        unread: chat.unread
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMatchUsers: () => dispatch(fetchMatchUsers()),
        receiveChatMsg: () => dispatch(receiveChatMsg()),
        updateChatStatus: (data) => dispatch(updateChatStatus(data))
    }
}

Messenger.propTypes = {
    fetchMatchUsers: PropTypes.func.isRequired,
    updateChatStatus: PropTypes.func.isRequired,
    unread: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);