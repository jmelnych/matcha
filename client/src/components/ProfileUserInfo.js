import React, { Component } from 'react'
import Ionicon from 'react-ionicons'

class ProfileUserInfo extends Component {
    render() {
        const ionicStyle = {
            fill: '#001529',
            marginBottom: '-5px',
            marginRight: '10px',
        };
        return (
            <ul className="profile-main-info-list">
                <h3>Info<Ionicon className="editable-icon" icon="md-create"/></h3>
                <li><Ionicon icon="ios-body-outline" style={ionicStyle}/>
                    <span className="text-secondary">Name: </span>
                    <span className="editable">Druid Wensleydale</span></li>
                <li><Ionicon icon="ios-briefcase-outline" style={ionicStyle}/>
                    <span className="text-secondary">Occupancy: </span>
                    <span className="editable">Accountant</span></li>
                <li><Ionicon icon="ios-heart-outline" style={ionicStyle}/>
                    <span className="text-secondary">Preferences: </span>
                    <span className="editable">Men and women</span></li>
                <li><Ionicon icon="ios-time-outline" style={ionicStyle}/>
                    <span className="text-secondary">Joined: </span>on June 2018</li>
            </ul>
        );
  }
}
export default ProfileUserInfo;