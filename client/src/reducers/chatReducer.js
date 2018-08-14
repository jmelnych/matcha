import shortid from 'shortid'
import {SET_CHAT_HISTORY, ADD_CHAT_MESSAGE, RECEIVE_CHAT_MESSAGE,
    SET_HISTORY_NOTE, SET_CHAT_NOTE,
    } from "../actions/types"

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type){
        case SET_CHAT_HISTORY:
            return action.payload;
        case ADD_CHAT_MESSAGE:
        case RECEIVE_CHAT_MESSAGE:
            return [
                ...state,
                {
                    id: shortid.generate(),
                    author_id: action.payload.author_id,
                    recipient_id: action.payload.recipient_id,
                    message: action.payload.message,
                    read: 0,
                    time: action.payload.time

                }
            ];
        case SET_CHAT_NOTE:
                return [...state, action.payload];
        // case CLEAN_NOTES:
        //     return {
        //         ...state,
        //         unread_notes: state.unread_notes.slice(0, 0)
        //     };
        // case CLEAN_CHAT_NOTES:
        //     return {
        //         ...state,
        //         unread_messages: state.unread_messages.slice(0, 0)
        //     };
        default:
            return state;
    }
}