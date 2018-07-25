import React, { Component } from 'react'
import Ionicon from 'react-ionicons'
import {connect} from 'react-redux'
import ProfileUserGenderIcon from './ProfileUI/ProfileUserGenderIcon'

class OtherUserProfileHead extends Component {
render() {
    const {user} = this.props;
    const av_name = user.avatar;
    const avatar = require(`../../img/avatars/${av_name}`);
    return (
        <div className="profile-main-header">
            <div className="profile-main-avatar">
                <img src={avatar} alt="avatar"/>
            </div>
            <figcaption>
                <h2>{user.username}
                    <ProfileUserGenderIcon gender={user.gender}/>
                </h2>
                <Ionicon icon="ios-pulse-outline" color='white' fontSize="45px"/>
                <p className="rating-text">Rating: {user.rating}</p>
            </figcaption>
        </div>
    );
  }
}

function mapStateToProps({otherUser}){
    return otherUser;
}

//TODO: fetch getOtherUser(id) instead
function mapDispatchToProps(dispatch) {
    return {
        getUser: () => dispatch(getUser())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherUserProfileHead);