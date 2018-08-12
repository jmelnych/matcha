import {GET_MATCH_USERS} from "../actions/types"

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MATCH_USERS:
            return action.payload;
        default:
            return state;
    }
}