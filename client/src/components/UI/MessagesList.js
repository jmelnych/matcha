import React from 'react'
import moment from 'moment'

const MessagesList = (props) => {
    const messages = props.messages || [];
    const currentUserId = props.currentUserId;
    const username = props.username;
    return (
        <ul className="chat-history-list">
            {messages.map(message =>
                <li key={message.id} className="history-list-message">
                    <div className="message-data">
                <span className="message-data-name">{currentUserId !== message.author_id ? `${username}`
                    : 'me'} </span>
                        <span className="message-data-time">{moment(message.added).fromNow()}</span>
                    </div>
                    <div className={"message " + (currentUserId !== message.author_id ? "other-message float-right"
                        : "my-message")}>{message.message}</div>
                </li>
            )}
        </ul>
    )
}

export default MessagesList;