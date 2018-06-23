import React, { Component } from 'react'
import Ionicon from 'react-ionicons'
import styles from '../css/styles'
//import avatar from '../img/avatars/default.png'

export default class Profile extends Component {
  render() {
      const ionicStyle = {
          marginBottom: '-5px',
          marginRight: '10px',
          fontSize: '20px',
      };
    return (
        <div>

          <div className="profile-main-header">
            <img src="" alt="profile-avatar"/>
              <figcaption>
                <h2>Druid Wensleydale</h2>
                <span>Accountant</span>
              </figcaption>
          </div>

          <div className="profile-main">

            <div className="container-flex">

              <div className="profile-main-info">
                <h3>Info</h3>
                  <p><Ionicon icon="ios-pulse-outline" color='white' style={ionicStyle}/>Rating: 10</p>
                  <p><Ionicon icon="ios-body-outline" color='white' style={ionicStyle}/>Name: Druid Wensleydale</p>
                  <p><Ionicon icon="ios-briefcase-outline" color='white' style={ionicStyle}/>Occupancy: Accountant</p>
                  <p><Ionicon icon="ios-heart-outline" color='white' style={ionicStyle}/>Preferences: Men and women</p>
                  <p><Ionicon icon="ios-time-outline" color='white' style={ionicStyle}/>Joined on October 10</p>
              </div>

              <div className="profile-main-feed">
                <h3>Feed</h3>
                  <p>No posts yet</p>
              </div>

          </div>
        </div>

        </div>
      )
  }
}

