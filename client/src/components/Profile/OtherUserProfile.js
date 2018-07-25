import React, { Component } from 'react'
import OtherUserProfileInfo from './OtherUserProfileInfo'
import OtherUserProfileHead from './OtherUserProfileHead'

class OtherUserProfile extends Component {

    render() {

        return (
            <div>
                <OtherUserProfileHead/>
                <div className="profile-main">
                <div className="container-flex">
                <div className="profile-main-info">
                    <OtherUserProfileInfo/>
                </div>
                </div>
                </div>
            </div>
        );
    }
};



export default OtherUserProfile;