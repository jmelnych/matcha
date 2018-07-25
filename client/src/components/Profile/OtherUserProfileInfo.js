import React, { Component } from 'react'
import {connect} from 'react-redux'
import Ionicon from 'react-ionicons'
import ProfileUserInfoUI from './ProfileUI/ProfileUserInfoUI'

class OtherUserProfileInfo extends Component {
render() {
    const {user} = this.props;
    const ionicStyle = {
        fill: '#001529',
        marginBottom: '-5px',
        marginRight: '10px',
    };
    let userLoc = `${this.props.user.location.city}, ${this.props.user.location.country}`;
    return (
        <div className="profile-main-info-list">
            <h3>Info</h3>
            <ul>
                <ProfileUserInfoUI user={user}/>
                {(userLoc) && <li><Ionicon icon="ios-pin-outline" style={ionicStyle}/>
                    <span className="text-secondary">Location: </span>
                    <span className="editable">{userLoc}</span></li>
                }
            </ul>
        </div>
    );
  }
};

function mapStateToProps({otherUser}){
    return otherUser;
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: () => dispatch(getUser())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherUserProfileInfo);