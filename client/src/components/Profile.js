import React, { Component } from 'react'
import ProfileHead from './ProfileHead'
import ProfileUserInfo from './ProfileUserInfo'
import ProfileUserPhotos from './ProfileUserPhotos'
import ProfileWritePost from './ProfileWritePost'
import {connect} from 'react-redux'
import {getUser} from '../actions/userActions'
import PropTypes from 'prop-types'
import ProfileUserInterests from './ProfileUserInterests'

class Profile extends Component {
    state = {
        x: null,
        y: null
    }
    componentDidMount() {
        this.props.getUser();
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude, position.coords.longitude);
        });
    }

  render() {
    let {user} = this.props;
    return (
    <div>
      <ProfileHead />
      <div className="profile-main">
        <div className="container-flex">
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

          <div className="profile-main-feed">
              <ProfileWritePost/>
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
};

function mapDispatchToProps(dispatch) {
    return {
        getUser: () => dispatch(getUser())
    }
};

Profile.propTypes = {
    user: PropTypes.object.isRequired
};

export default connect (mapStateToProps, mapDispatchToProps)(Profile);
