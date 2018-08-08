import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const ChatAvatar = (props) => {
    let src;
    return (
        <Link to={`/user/${props.user.id}`}>
            <p className="hidden">{src = require(`../../../img/avatars/${props.user.avatar}`)}</p>
            <img src={src} alt="avatar" className="chat-avatar"/>
        </Link>
    )
};

ChatAvatar.propTypes = {
    user: PropTypes.object.isRequired
};

export default ChatAvatar;