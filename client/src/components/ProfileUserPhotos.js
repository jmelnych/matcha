import React, { Component } from 'react'
import Ionicon from 'react-ionicons'

class ProfileUserPhotos extends Component {
render() {
    const cameraStyle = {
        marginBottom: '-5px',
        width: '45px',
        height: '45px'

    };
    return (
        <ul className="profile-main-info-list">
            <h3>Photos</h3>
            <span className="text-secondary">You have no photos yet</span>
            <li className="li-center"><Ionicon className="clickable-icon" icon="ios-camera-outline" style={cameraStyle}/>
                <Ionicon className="additional-icon" icon="ios-add"/></li>
        </ul>
    );
  }
}
export default ProfileUserPhotos;