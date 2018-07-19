import {ADD_POST, GET_POSTS} from "../actions/types";

const initialState = [];

export default function (state = initialState, action){
    switch (action.type){
        case ADD_POST:
            return state.concat(action.payload);
        case GET_POSTS:
            return action.payload;
        default:
            return state
    }
}