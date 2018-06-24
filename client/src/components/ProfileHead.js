import React, { Component } from 'react'
import avatar from '../img/avatars/default.png'
import Ionicon from 'react-ionicons'

class ProfileHead extends Component {
render() {
    return (
          <div className="profile-main-header">
              <div className="profile-main-avatar">
                  <img src={avatar} alt="avatar"/>
              </div>
              <figcaption>
                  <h2>Druid Wensleydale</h2>
                  <Ionicon icon="ios-pulse-outline" color='white' fontSize="45px"/>
                  <p>Rating: 10</p>
              </figcaption>
          </div>

    );
  }
}
export default ProfileHead;