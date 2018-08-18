import {GET_USERS} from "../actions/types"

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            if (typeof (action.payload) === 'object'){
                return action.payload;
            }
            return state;
        default:
            return state;
    }
}