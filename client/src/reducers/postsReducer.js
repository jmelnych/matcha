import {ADD_POST, GET_POSTS, UPDATE_POST, DELETE_POST} from "../actions/types";

const initialState = [];

export default function (state = initialState, action){
    switch (action.type){
        case ADD_POST:
            return [...state, action.payload];
        case GET_POSTS:
            return action.payload;
        case UPDATE_POST:
            let updatePost = state.filter(post => post.id === action.payload.id);
            let updatePostObj = updatePost[0];
            for (let prop in action.payload){
                updatePostObj[prop] = action.payload[prop];
            }
            return state.filter(post => post.id !== action.payload.id).concat(updatePostObj);
        case DELETE_POST:
            return state.filter(post => post.id !== action.payload);
        default:
            return state
    }
}

