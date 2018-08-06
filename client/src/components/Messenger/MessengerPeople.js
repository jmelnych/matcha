import React, { Component } from 'react'
import {Input} from 'antd'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchMatchUsers} from '../../actions/chatActions'
import PropTypes from 'prop-types'

const Search = Input.Search;

class MessengerPeople extends Component {
    componentDidMount(){
        this.props.fetchMatchUsers();
    }
render() {
        const {matchUsers} = this.props;
        let src;
    return (
        <div className="people-list-container">
            <Search
                placeholder="search"
                onSearch={value => console.log(value)}
                style={{ width: '90%' }}/>
            <ul className="people-list">
                {matchUsers.map((user) =>
                    <li key={user.id} className="people-list-person">
                        <p className="hidden">{src = require(`../../img/avatars/${user.avatar}`)}</p>
                        <Link to={`/user/${user.id}`}>
                            <img src={src} alt="avatar" className="chat-avatar"/>
                        </Link>
                        <div className="people-list-person-about">
                            <Link to={`/user/${user.id}`}>
                                <div className="people-list-person-name">{`${user.firstname} ${user.lastname}`}</div>
                            </Link>
                            <div className="people-list-person-status">
                                <span className="circle online">&#9679;</span> online
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
  }
};

function mapStateToProps({matchUsers}) {
    return {matchUsers}
}

MessengerPeople.propTypes = {
    fetchMatchUsers: PropTypes.func.isRequired //TODO: get all 'match users' and display it
};

export default connect(mapStateToProps, {fetchMatchUsers})(MessengerPeople);