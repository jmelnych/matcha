import React, { Component } from 'react'
import ProfileHead from './Profile/ProfileHead'
import ProfileUserInfo from './Profile/ProfileUserInfo'
import ProfileUserPhotos from './Profile/ProfileUserPhotos'
import {connect} from 'react-redux'
import {getUser} from '../actions/userActions'
import PropTypes from 'prop-types'
import ProfileUserInterests from './Profile/ProfileUserInterests'
import ProfileFeedPosts from './Profile/ProfileFeedPosts'

class OtherUserProfile extends Component {
    render() {
        return (
            <div>
                other user profile :)
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: () => dispatch(getUser())
    }
};

OtherUserProfile.propTypes = {
    getUser: PropTypes.func.isRequired
};

export default connect (null, mapDispatchToProps)(OtherUserProfile);