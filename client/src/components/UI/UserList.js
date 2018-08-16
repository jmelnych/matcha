import React from 'react'
import moment from 'moment'
import ChatUserAvatar from './UserAvatar'
import UserStatus from './UserStatus'
import {Link} from 'react-router-dom'

const UserList = (props) => {
    const showTime = (user) => {
        return user.online === 1 ? "online" :
            `last seen ${moment(user.last_seen).fromNow()}`;
    };

    const list = props.list || [];
    console.log(list);
    return (
        <ul className="list-wrap">
            {list.map((user) =>
                <li key={user.id} className="people-list-person">
                    <ChatUserAvatar user={user}/>
                    <Link to={`/user/${user.id}`}>
                    <div className="people-list-person-about">
                        <div className="people-list-person-name">{`${user.firstname} ${user.lastname}`}</div>
                        <div className="people-list-person-status">
                            {props.showTime && (
                                <div>
                                <UserStatus status={user.online}/>
                                <span> {showTime(user)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    </Link>
                </li>
            )}
        </ul>
    )
};

export default UserList;