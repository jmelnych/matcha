import shortid from 'shortid'
import {SET_CHAT_HISTORY, ADD_CHAT_MESSAGE, RECEIVE_CHAT_MESSAGE,
    SET_HISTORY_NOTE, SET_CHAT_NOTE, SET_UNREAD_MESSAGES, CLEAN_CHAT_NOTES
    } from "../actions/types"

const initialState = {
    all_messages: [],
    unread: []
};

export default function (state = initialState, action) {
    switch (action.type){
        case SET_CHAT_HISTORY:
            return {
                ...state,
                all_messages: action.payload
            };
        case ADD_CHAT_MESSAGE:
            let newMsg = {
                id: shortid.generate(),
                author_id: action.payload.author_id,
                recipient_id: action.payload.recipient_id,
                message: action.payload.message,
                read: 0,
                time: action.payload.time
            };
            return {
                ...state,
                all_messages: state.all_messages.concat(newMsg)
            };
        case RECEIVE_CHAT_MESSAGE:
            let newIncMsg = {
                    id: shortid.generate(),
                    author_id: action.payload.author_id,
                    recipient_id: action.payload.recipient_id,
                    message: action.payload.message,
                    read: 0,
                    time: action.payload.time
                };
            return {
                ...state,
                all_messages: state.all_messages.concat(newIncMsg),
                unread: state.unread.concat(newIncMsg)
            };
        case SET_UNREAD_MESSAGES:
            const myId = action.payload;
            return {
                ...state,
                unread: state.all_messages.filter(message => message.read === 0 && message.author_id !== myId)
            };
        case CLEAN_CHAT_NOTES:
            return {
                ...state,
                unread: state.unread.filter(message => message.author_id !== action.payload)
            };
        // case SET_CHAT_NOTE:
        //         return [...state, action.payload];
        // case CLEAN_NOTES:
        //     return {
        //         ...state,
        //         unread_notes: state.unread_notes.slice(0, 0)
        //     };
        default:
            return state;
    }
}