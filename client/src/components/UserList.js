import React from 'react'
import moment from 'moment'
import ChatUserAvatar from './Messenger/MessengerUI/ChatUserAvatar'
import UserStatus from './Messenger/MessengerUI/UserStatus'

const UserList = (props) => {
    const showTime = (user) => {
        return user.online === 1 ? "online" :
            `last seen ${moment(user.last_seen).fromNow()}`;
    };

    const {list} = props;
    return (
        <ul className="list-wrap">
            {list.map((user) =>
                <li key={user.id} className="people-list-person">
                    <ChatUserAvatar user={user}/>
                    <div className="people-list-person-about">
                        <div className="people-list-person-name">{`${user.firstname} ${user.lastname}`}</div>
                        <div className="people-list-person-status">
                            <UserStatus status={user}/>
                            {props.showTime ? showTime(user.online): ''}

                        </div>
                    </div>
                </li>
            )}
        </ul>
    )
};

export default UserList;