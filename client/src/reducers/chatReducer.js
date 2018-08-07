import shortid from 'shortid'
import {ADD_CHAT_MESSAGE, RECEIVE_CHAT_MESSAGE} from "../actions/types"

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type){
        case ADD_CHAT_MESSAGE:
        case RECEIVE_CHAT_MESSAGE:
            return [
                ...state,
                {
                    id: shortid.generate(),
                    authorId: action.payload.authorId,
                    recipientId: action.payload.recipientId,
                    message: action.payload.message,
                    time: action.payload.time

                }
            ];
        default:
            return state;
    }
}