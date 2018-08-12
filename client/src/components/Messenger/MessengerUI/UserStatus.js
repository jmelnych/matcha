import React from 'react'

const UserStatus = (props) => {
    return (
        <span className={ props.status === 1 ? "circle online" :
            "circle offline"}>&#9679;
        </span>
    )
};

export default UserStatus;