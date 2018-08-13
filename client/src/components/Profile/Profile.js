import React, { Component } from 'react'
import {connect} from 'react-redux'
import ProfileHead from './ProfileHead'
import ProfileUserInfo from './ProfileUserInfo'
import ProfileUserPhotos from './ProfileUserPhotos'
import ProfileWritePost from './ProfileWritePost'
import ProfileUserInterests from './ProfileUserInterests'
import ProfileFeedPosts from './ProfileFeedPosts'
import ProfileUserTitleUI from '../UI/ProfileUserTitle'
import ProfileUserFriends from './ProfileUserFriends'
import ProfileUserSuggestions from './ProfileUserSuggestions'
import PropTypes from 'prop-types'

class Profile extends Component {
    render() {
    return (
    <div>
      <ProfileHead/>
      <div className="profile-main">
          <ProfileUserTitleUI user={this.props.user}/>
        <div className="container-flex-center">
            <div className="profile-main-feed">
                <h3>Posts</h3>
                <ProfileWritePost/>
                <ProfileFeedPosts/>
            </div>
          <div className="profile-main-info">
              <ProfileUserInfo/>
              <ProfileUserPhotos/>
              <ProfileUserInterests/>
              <ProfileUserFriends/>
              <ProfileUserSuggestions/>
          </div>
      </div>
    </div>
    </div>
    )
  }
}

function mapStateToProps({user}){
    return user;
};

Profile.propTypes = {
    user: PropTypes.object
}

export default connect(mapStateToProps)(Profile);
