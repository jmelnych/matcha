import shortid from 'shortid'
import {ADD_CHAT_MESSAGE} from "../actions/types"

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type){
        case ADD_CHAT_MESSAGE:
            return [
                ...state,
        {
            id:shortid.generate(),
            username: action.payload.username,
            message: action.payload.message,
            time: action.payload.time

        }
            ];
        default:
            return state;
    }
}