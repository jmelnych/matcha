import React, { Component } from 'react'
import {connect} from 'react-redux'
import OtherUserProfileInfo from './OtherUserProfileInfo'
import OtherUserProfileHead from './OtherUserProfileHead'
import OtherUserProfilePhotos from './OtherUserProfilePhotos'
import OtherUserProfileInterests from './OtherUserProfileInterests'
import OtherUserProfileFeedPosts from './OtherUserProfileFeedPosts'
import ProfileUserTitleUI from './ProfileUI/ProfileUserTitleUI'
import {getOtherUser} from '../../actions/userActions'
import PropTypes from 'prop-types'

class OtherUserProfile extends Component {
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getOtherUser(id);
    };

    render() {
        const posts = this.props.posts || [];
        const user = this.props.info || {firstname: 'John', lastname: 'Doe', username: 'johndoe'};
        return (
            <div>
                <OtherUserProfileHead/>
                <div className="profile-main">
                    <ProfileUserTitleUI user={user}/>
                    <div className="container-flex">

                        {!!posts.length && (<div className="profile-main-feed">
                            <h3>Posts</h3>
                            <OtherUserProfileFeedPosts/>
                        </div>)}
                        {posts.length === 0 && (
                            <div className="profile-main-feed">
                                <h3>Posts</h3>
                                <div className="text-secondary info">No posts yet</div>
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

function mapDispatchToProps(dispatch) {
    return{
        getOtherUser: (id) => dispatch(getOtherUser(id))
    }
}

function mapStateToProps({otherUser}){
    return otherUser.user;
}

OtherUserProfile.propTypes = {
    getOtherUser: PropTypes.func.isRequired,
    otherUser: PropTypes.object,
    id: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherUserProfile);