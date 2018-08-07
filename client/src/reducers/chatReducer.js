import shortid from 'shortid'
import {SET_CHAT_HISTORY, ADD_CHAT_MESSAGE, RECEIVE_CHAT_MESSAGE } from "../actions/types"

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
                    time: action.payload.time

                }
            ];
        default:
            return state;
    }
}