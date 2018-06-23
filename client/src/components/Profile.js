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

            <div className="container-flex">

              <div className="profile-main-info">
                <h2>Info</h2>
              </div>

              <div className="profile-main-feed">
                <h2>Feed</h2>
              </div>

          </div>
        </div>

        </div>
      )
  }
}