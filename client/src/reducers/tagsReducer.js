import {GET_TAGS, ADD_TAGS} from "../actions/types"

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TAGS:
            return action.payload;
        case ADD_TAGS:
            return state.concat(action.payload);
        default:
            return state;
    }
}