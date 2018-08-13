import React from 'react'
import capitalize from 'lodash/capitalize'
import PropTypes from 'prop-types'

const ProfileUserTitle = (props) => {
    return (
        <div className="profile-user-title">
            <h1>{capitalize(props.user.firstname)} {capitalize(props.user.lastname)}<small>
                {props.user.username}
            </small></h1>

        </div>
    )
};

ProfileUserTitle.propTypes = {
    user: PropTypes.object.isRequired
}

export default ProfileUserTitle;