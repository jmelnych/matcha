import React, { Component } from 'react'
import ProfileHead from './ProfileHead'
import ProfileUserInfo from './ProfileUserInfo'
import ProfileUserPhotos from './ProfileUserPhotos'
import ProfileUserPost from './ProfileUserPost'
import {connect} from 'react-redux'
import {getUser} from '../actions/userActions'

class Profile extends Component {
    componentDidMount() {
        this.props.getUser();
    }

  render() {
    let user = this.props.user;
    return (
    <div>
      <ProfileHead user={user}/>
      <div className="profile-main">
        <div className="container-flex">
          <div className="profile-main-info">
              <ProfileUserInfo user={user}/>
              <ProfileUserPhotos user={user}/>

              <ul className="profile-main-info-list">
                  <h3>Friends</h3>
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

              <ul className="profile-main-info-list">
                  <h3>Suggestions</h3>
                  <li></li>
              </ul>
          </div>

          <div className="profile-main-feed">
              <ProfileUserPost/>
              <div className="profile-feed-area">
                  <h3>Feed</h3>
                  No posts yet
              </div>
          </div>
      </div>
    </div>
    </div>
    )
  }
}

function mapStateToProps({user}) {
    return user;
}

export default connect (mapStateToProps, {getUser})(Profile);
