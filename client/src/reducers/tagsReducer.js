import {GET_TAGS} from "../actions/types"

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TAGS:
            return action.payload;
        default:
            return state;
    }
}