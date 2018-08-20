import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {getBaseURL} from '../../config';

const UserAvatar = (props) => {
    const uid = props.user.user_id || props.user.id;
    return (
        <Link className="avatar" to={`/user/${uid}`}>
            <img src={`${getBaseURL()}/avatars/${props.user.avatar}`} alt="avatar" className="chat-avatar"/>
        </Link>
    )
};

UserAvatar.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserAvatar;
