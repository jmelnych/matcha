import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchMatchUsers} from '../../actions/chatActions'
import PropTypes from 'prop-types'
import { socket } from '../Root'
import {updateChatStatus} from '../../actions/chatActions'
import UserList from "../UI/UserList";

class ProfileUserFriends extends Component {
    componentDidMount(){
        this.props.fetchMatchUsers();
        socket.on('status', (data) => {
            this.props.updateChatStatus(data);
        });
    };
render() {
    const {matchUsers} = this.props;
    console.log(matchUsers);
    return (
        <div className="profile-main-info-list">
            <h3>Matches</h3>
            <UserList list={matchUsers} showTime={true}/>
        </div>
    );
  }
}
function mapStateToProps({matchUsers}) {
    return {matchUsers}
}

ProfileUserFriends.propTypes = {
    fetchMatchUsers: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {fetchMatchUsers, updateChatStatus})(ProfileUserFriends);