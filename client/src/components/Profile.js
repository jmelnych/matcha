import React, { Component } from 'react'
import ProfileHead from './ProfileHead'
import ProfileUserInfo from './ProfileUserInfo'
import ProfileUserPhotos from './ProfileUserPhotos'


export default class Profile extends Component {
  render() {
      //TODO: change user to obj from backend
    const user = {
        username: 'Testuser',
        gender: 'female',
        firstname: 'Druid',
        lastname: 'Wensleydale',
        rating: 150,
        occupancy: 'engineer',
        preferences: 'Men and Women',
        avatar: '../img/avatars/default.png',
        joined: '10 June 2018'

    }
    return (
        <div>
          <ProfileHead user={user}/>
          <div className="profile-main">
            <div className="container-flex">
              <div className="profile-main-info">
                  <ProfileUserInfo user={user}/>
                  <ProfileUserPhotos/>

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
                <h3>Feed</h3>
                  No posts yet
              </div>
          </div>
        </div>

        </div>
      )
  }
}

