import React, { Component } from 'react'
import {connect} from 'react-redux'
import OtherUserProfileInfo from './OtherUserProfileInfo'
import OtherUserProfileHead from './OtherUserProfileHead'
import OtherUserProfilePhotos from './OtherUserProfilePhotos'
import OtherUserProfileInterests from './OtherUserProfileInterests'
import OtherUserProfileFeedPosts from './OtherUserProfileFeedPosts'
import ProfileUserTitleUI from '../UI/ProfileUserTitle'
import {getOtherUser, seeNotify} from '../../actions/userActions'
import PropTypes from 'prop-types'
import { socket } from '../Root'

class OtherUserProfile extends Component {
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getOtherUser(id);
        this.props.seeNotify(id);
        const data = {
            recipient_id: id,
            action: 'see Me',
            added: new Date(),
            author_id: this.props.currentUser.id,
            firstname: this.props.currentUser.firstname,
            lastname: this.props.currentUser.lastname,
            avatar: this.props.currentUser.avatar
        };
        socket.emit('notification', data);
    };

    render() {
        const posts = this.props.posts || [];
        const otherUser = this.props.otherUser || {firstname: 'John', lastname: 'Doe', username: 'johndoe'};
        return (<div>
                <OtherUserProfileHead/>
                <div className="profile-main">
                    <ProfileUserTitleUI user={otherUser}/>
                    <div className="container-flex-center">
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
            </div>);
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getOtherUser: (id) => dispatch(getOtherUser(id)),
        seeNotify: (id) => dispatch(seeNotify(id))
    }
}

function mapStateToProps({otherUser, user}){
    return {
        otherUser: otherUser.user.info,
        currentUser: user.user
    };
}

OtherUserProfile.propTypes = {
    getOtherUser: PropTypes.func.isRequired,
    seeNotify: PropTypes.func.isRequired,
    otherUser: PropTypes.object,
    id: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherUserProfile);