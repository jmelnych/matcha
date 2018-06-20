import React, { Component } from 'react'
import styles from '../css/styles'
//import avatar from '../img/avatars/default.png'

export default class Profile extends Component {
  render() {
    return (
        <div>
          <div className="profile-main-header">
            <img src="" alt="profile-avatar"/>
              <figcaption>
                <h2>Druid Wensleydale </h2>
                <span>Accountant</span>
              </figcaption>
            </div>
            <div className="profile-main">
              <div className="profile-main-info">
                <h2>About</h2>
              </div>
              <div className="profile-main-stream profile-deck">
<h2>About</h2>
              </div>
              <div className="profile-main-suggest">
<h2>About</h2>
              </div>
              <a href="#"><i className="ios-pin-outline"></i></a>
            </div>
        </div>
      )
  }
}

