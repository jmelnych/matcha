import React, { Component } from 'react'
import ProfileHead from './ProfileHead'
import ProfileUserInfo from './ProfileUserInfo'
import ProfileUserPhotos from './ProfileUserPhotos'


export default class Profile extends Component {
  render() {

    return (
        <div>
          <ProfileHead/>
          <div className="profile-main">
            <div className="container-flex">
              <div className="profile-main-info">
                  <ProfileUserInfo/>
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

