import React from 'react'
import capitalize from 'lodash/capitalize'
import PropTypes from 'prop-types'

const ProfileUserTitleUI = (props) => {
    return (
        <div className="profile-user-title">
            <h1>{capitalize(props.user.firstname)} {capitalize(props.user.lastname)}<small>
                {props.user.username}
            </small></h1>

        </div>
    )
};

ProfileUserTitleUI.propTypes = {
    user: PropTypes.object.isRequired
}

export default ProfileUserTitleUI;