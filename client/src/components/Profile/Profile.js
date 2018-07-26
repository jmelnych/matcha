import React, { Component } from 'react'
import {connect} from 'react-redux'
import ProfileHead from './ProfileHead'
import ProfileUserInfo from './ProfileUserInfo'
import ProfileUserPhotos from './ProfileUserPhotos'
import ProfileWritePost from './ProfileWritePost'
import ProfileUserInterests from './ProfileUserInterests'
import ProfileFeedPosts from './ProfileFeedPosts'
import ProfileUserTitleUI from './ProfileUI/ProfileUserTitleUI'

class Profile extends Component {
  render() {
    return (
    <div>
      <ProfileHead/>
      <div className="profile-main">
          <ProfileUserTitleUI user={this.props.user}/>
        <div className="container-flex">
            <div className="profile-main-feed">
                <h3>Posts</h3>
                <ProfileWritePost/>
                <ProfileFeedPosts/>
            </div>
          <div className="profile-main-info">
              <ProfileUserInfo/>
              <ProfileUserPhotos/>
              <ProfileUserInterests/>
              <div className="profile-main-info-list">
                  <h3>Friends</h3>
                  <ul>
                      <li>
                          <p>friend</p>
                      </li>
                      <li>
                          <p>friend</p>
                      </li>
                      <li>
                          <p>friend</p>
                      </li>
                      <li>
                          <p>friend</p>
                      </li>
                      <li>
                          <p>friend</p>
                      </li>
                  </ul>
              </div>

              <div className="profile-main-info-list">
                  <h3>Suggestions</h3>
                  <ul>
                      <li></li>
                  </ul>
              </div>
          </div>


      </div>
    </div>
    </div>
    )
  }
}

function mapStateToProps({user}){
    return user;
}


export default connect(mapStateToProps)(Profile);
