import React, { Component } from 'react'
import Ionicon from 'react-ionicons'
import {connect} from 'react-redux'
import { Button } from 'antd'
import ProfileUserGenderIcon from './ProfileUI/ProfileUserGenderIcon'

class OtherUserProfileHead extends Component {
render() {
    const user = this.props.info;
    const av_name = user.avatar;
    const avatar = require(`../../img/avatars/${av_name}`);
    return (
        <div className="profile-main-header">
            <div className="profile-main-avatar">
                <img src={avatar} alt="avatar"/>
                <Button className="like-button" shape="circle" icon="heart" size='large'></Button>
            </div>
            <figcaption>
                <h2>{user.username}
                    <ProfileUserGenderIcon gender={user.gender}/>
                    <a className="profile-suspect-button">Suspect fake account?</a>
                </h2>
                <Ionicon icon="ios-pulse-outline" color='white' fontSize="45px"/>
                <p className="rating-text">Rating: {user.rating}</p>
            </figcaption>
        </div>
    );
  }
}

function mapStateToProps({otherUser}){
    return otherUser.user;
}

export default connect(mapStateToProps)(OtherUserProfileHead);