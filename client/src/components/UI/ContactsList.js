import React from 'react'
import moment from 'moment'
import UserAvatar from './UserAvatar'
import UserStatus from './UserStatus'

const ContactList = (props) => {
    const checkUnread = (id) => {
        let unreadMsgWithUser = unreadMsgs.filter(message => message.author_id === id);
        return unreadMsgWithUser.length;

    };
    const showingContacts = props.users;
    const unreadMsgs = props.unreadMsgs;
    return (
        <ul className="people-list">
        {showingContacts.map((user) =>
            <li key={user.id} className="people-list-person"
                onClick={() => props.selectUser(user)}>
                <UserAvatar user={user}/>
                <div className="people-list-person-about">
                    {checkUnread(user.id) !== 0 ?
                    (<span className="new-message-notification">{checkUnread(user.id)}</span>)
                    : (<span className="message-notification">{}</span>)}
                    <div className="people-list-person-name">{`${user.firstname} ${user.lastname}`}</div>
                    <div className="people-list-person-status">
                        <UserStatus status={user.online}/>
                        <span className="status">{user.online === 1 ? "online" :
                            `last seen ${moment(user.last_seen).fromNow()}`}</span>
                    </div>
                </div>
            </li>
        )}
        </ul>
    )
};

export default ContactList;
