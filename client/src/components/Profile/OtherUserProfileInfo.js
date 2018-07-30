import React, { Component } from 'react'
import {connect} from 'react-redux'
import Ionicon from 'react-ionicons'
import ProfileUserInfoUI from './ProfileUI/ProfileUserInfoUI'
import PropTypes from 'prop-types'

class OtherUserProfileInfo extends Component {
render() {
    const user = this.props.info ||
        {firstname: 'John', lastname: 'Doe', preference:'both', location: {city:'Kiev', country: 'Ukraine'}};
    const ionicStyle = {
        fill: '#001529',
        marginBottom: '-5px',
        marginRight: '10px',
    };
    let userLoc = `${user.location.city}, ${user.location.country}`;
    let ouIndicator = true;
    return (
        <div className="profile-main-info-list">
            <h3>Info</h3>
            <ul>
                <ProfileUserInfoUI ouIndicator={ouIndicator} user={user}/>
                {(userLoc) && <li><Ionicon icon="ios-pin-outline" style={ionicStyle}/>
                    <span className="text-secondary">Location: </span>
                    <span className={ouIndicator ? "non-editable" : "editable"}>{userLoc}</span></li>
                }
            </ul>
        </div>
    );
  }
};

function mapStateToProps({otherUser}){
    return otherUser.user;
};

OtherUserProfileInfo.proTypes = {
    otherUser: PropTypes.object
}

export default connect(mapStateToProps)(OtherUserProfileInfo);