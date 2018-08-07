import React, { Component } from 'react'
import {Input} from 'antd'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchMatchUsers} from '../../actions/chatActions'
import MessengerChat from './MessengerChat'
import PropTypes from 'prop-types'

const Search = Input.Search;

class Messenger extends Component {
    state = {
      chatWith: {}
    };
    componentDidMount(){
        this.props.fetchMatchUsers();
    };

    selectUser = (user) => {
        this.setState({
          chatWith: user
      });

    };
    render() {
        const {matchUsers} = this.props;
        let src;
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
                                <p className="hidden">{src = require(`../../img/avatars/${user.avatar}`)}</p>
                                <Link to={`/user/${user.id}`}>
                                    <img src={src} alt="avatar" className="chat-avatar"/>
                                </Link>
                                <div className="people-list-person-about">
                                    <div className="people-list-person-name">{`${user.firstname} ${user.lastname}`}</div>
                                    <div className="people-list-person-status">
                                        <span className="circle online">&#9679;</span> online
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

export default connect(mapStateToProps, {fetchMatchUsers})(Messenger);