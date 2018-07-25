import React, { Component } from 'react'
import {connect} from 'react-redux'
import OtherUserProfileInfo from './OtherUserProfileInfo'
import OtherUserProfileHead from './OtherUserProfileHead'
import OtherUserProfilePhotos from './OtherUserProfilePhotos'
import OtherUserProfileInterests from './OtherUserProfileInterests'
import OtherUserProfileFeedPosts from './OtherUserProfileFeedPosts'

class OtherUserProfile extends Component {
//TODO: ComponentDidMount -> getOtherUser(id)
    render() {
        return (
            <div>
                <OtherUserProfileHead/>
                <div className="profile-main">
                <div className="container-flex">
                <div className="profile-main-info">
                    <OtherUserProfileInfo/>
                    <OtherUserProfilePhotos/>
                    <OtherUserProfileInterests/>
                </div>
                    <div className="profile-main-feed">
                        <OtherUserProfileFeedPosts/>
                    </div>
                </div>
                </div>
            </div>
        );
    }
};

//TODO: getOtherUser(id)
function mapDispatchToProps(dispatch) {
    return{

    }
}



export default connect(null, mapDispatchToProps)(OtherUserProfile);