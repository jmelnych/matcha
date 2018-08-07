import shortid from 'shortid'
import {ADD_CHAT_MESSAGE, RECEIVED_CHAT_MESSAGE} from "../actions/types"

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type){
        case ADD_CHAT_MESSAGE:
        // case RECEIVED_CHAT_MESSAGE:
            //console.log(action.payload);
            return [
                ...state,
                {
                    id: shortid.generate(),
                    authorId: action.payload.authorId,
                    message: action.payload.message,
                    time: action.payload.time

                }
            ];
        default:
            return state;
    }
}