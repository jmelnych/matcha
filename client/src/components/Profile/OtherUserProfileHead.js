import React, { Component } from 'react'
import {Button} from 'antd'
import {connect} from 'react-redux'
import ProfileUserGenderIcon from './ProfileUI/ProfileUserGenderIcon'

class OtherUserProfileHead extends Component {
render() {
    const user = this.props.info;
    const av_name = user.avatar;
    const avatar = require(`../../img/avatars/${av_name}`);
    return (
        <div className="profile-main-header">
            <div className="profile-main-avatar">
                <div className="profile-main-avatar-content">
                    <img src={avatar} alt="avatar"/>
                </div>
                <figcaption>
                    <p className="figcaption-text">Rating: {user.rating}</p>
                    <p className="figcaption-text">Age: {user.age}</p>
                    <p className="figcaption-text">City: {user.location.city}</p>
                    <p className="figcaption-text">Gender:
                        <ProfileUserGenderIcon user={this.props.info.gender}/></p>
                </figcaption>
                <Button className="like-button" type="primary">Like</Button>
            </div>
        </div>
    );
  }
}

function mapStateToProps({otherUser}){
    return otherUser.user;
}

export default connect(mapStateToProps)(OtherUserProfileHead);