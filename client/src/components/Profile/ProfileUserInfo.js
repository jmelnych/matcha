import React, { Component } from 'react'
import ProfileUserLocation from './ProfileUserLocation'
import {connect} from 'react-redux'
import ProfileUserInfoUI from '../UI/ProfileUserInfo'
import PropTypes from 'prop-types'

class ProfileUserInfo extends Component {
    state = {
        visible: false,
        confirmLoading: true,
        ModalText: ''
    };

    render() {
        const {user} = this.props;
        return (
            <div className="profile-main-info-list">
                <h3>Info</h3>
                <ul>
                    <ProfileUserInfoUI user={user}/>
                    <ProfileUserLocation userLocation={user.location}/>
                </ul>
            </div>
        );
  }
};

ProfileUserInfo.propTypes = {
    user: PropTypes.object.isRequired
};

function mapStateToProps({user}){
    return user;
};

export default connect(mapStateToProps)(ProfileUserInfo);