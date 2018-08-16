import {CLEAN_HISTORY_NOTES, FETCH_HISTORY, RECEIVE_HISTORY_NOTE, SET_UNREAD_HISTORY} from "../actions/types";

import shortid from 'shortid'

const initialState = {
    all_history: [],
    unread: []
};

export default function (state = initialState, action) {
    switch (action.type){
        case FETCH_HISTORY:
            return {
                ...state,
                all_history: action.payload
            };
        case SET_UNREAD_HISTORY:
            const myId = action.payload;
            return {
                ...state,
                unread: state.all_history.filter(note => note.second_id === myId && note.read === 0)
            };
        case RECEIVE_HISTORY_NOTE:
            let newHistory = {
                history_id: shortid.generate(),
                second_id: 1,
                action: action.payload,
                read: 0,
                added: new Date(),
                user_id: 1,
                firstname: 'John',
                lastname: 'Doe',
                avatar: "default.png"
            }
            return {
                ...state,
                all_history: state.all_history.concat(newHistory),
                unread: state.unread.concat(action.payload)
            };
        case CLEAN_HISTORY_NOTES:
            return {
                ...state,
                unread: state.unread.slice(0, 0)
            }
        default:
            return state;
    }
}