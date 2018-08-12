import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const ChatAvatar = (props) => {
    let src;
    let uid = props.user.user_id || props.user.id;
    return (
        <Link to={`/user/${uid}`}>
            <p className="hidden">{src = require(`../../../img/avatars/${props.user.avatar}`)}</p>
            <img src={src} alt="avatar" className="chat-avatar"/>
        </Link>
    )
};

ChatAvatar.propTypes = {
    user: PropTypes.object.isRequired
};

export default ChatAvatar;