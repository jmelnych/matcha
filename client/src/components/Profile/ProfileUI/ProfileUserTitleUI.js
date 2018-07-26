import React from 'react'
import capitalize from 'lodash/capitalize'

const ProfileUserTitleUI = (props) => {
    return (
        <div className="profile-user-title">
            <h1>{capitalize(props.user.firstname)} {capitalize(props.user.lastname)}<small>
                {props.user.username}
            </small></h1>

        </div>
    )
};

export default ProfileUserTitleUI;