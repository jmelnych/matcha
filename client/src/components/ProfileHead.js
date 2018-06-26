import React, { Component } from 'react'
//import avatar from '../img/avatars/default.png'
import Ionicon from 'react-ionicons'
import {Popover} from 'antd'

class ProfileHead extends Component {
render() {
    const content = (
        <div>
            <p>Rating is count based on your profile</p>
            <p>completness and likes from other users</p>
        </div>
    );

    const ratingText = {
        width: '100px',
        margin: '0 auto'
    };

    const genderStyle = {
        fill: 'white',
        marginLeft: '7px',
        marginBottom: '-3px',
        fontSize: '25px'
    };
    const usr = this.props.user;
    return (
          <div className="profile-main-header">
              <div className="profile-main-avatar">
                  <img src={usr.avatar} alt="avatar"/>
              </div>
              <figcaption>
                  <h2>{usr.username}
                      {usr.gender === 'male' ? <Ionicon icon="md-male" style={genderStyle}/>
                          : <Ionicon icon="md-female" style={genderStyle}/>}
                      </h2>
                  <Ionicon icon="ios-pulse-outline" color='white' fontSize="45px"/>
                  <Popover placement="rightTop" title="Rating info" content={content}
                           trigger="hover"><p style={ratingText}>Rating: {usr.rating}</p></Popover>
              </figcaption>
          </div>

    );
  }
}
export default ProfileHead;