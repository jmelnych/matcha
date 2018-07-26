import React, { Component } from 'react'
import {connect} from 'react-redux'
import OtherUserProfileInfo from './OtherUserProfileInfo'
import OtherUserProfileHead from './OtherUserProfileHead'
import OtherUserProfilePhotos from './OtherUserProfilePhotos'
import OtherUserProfileInterests from './OtherUserProfileInterests'
import OtherUserProfileFeedPosts from './OtherUserProfileFeedPosts'
import ProfileUserTitleUI from './ProfileUI/ProfileUserTitleUI'

class OtherUserProfile extends Component {
//TODO: ComponentDidMount -> getOtherUser(id)
    render() {
        console.log(this.props.posts.length);
        return (
            <div>
                <OtherUserProfileHead/>
                <div className="profile-main">
                    <ProfileUserTitleUI user={this.props.info}/>
                <div className="container-flex">
                    {this.props.posts.length && (<div className="profile-main-feed">
                        <h3>Posts</h3>
                        <OtherUserProfileFeedPosts/>
                    </div>)}
                <div className="profile-main-info">
                    <OtherUserProfileInfo/>
                    <OtherUserProfilePhotos/>
                    <OtherUserProfileInterests/>
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

function mapStateToProps({otherUser}){
    return otherUser.user;
}



export default connect(mapStateToProps, mapDispatchToProps)(OtherUserProfile);