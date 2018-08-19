import {ADD_POST, GET_POSTS, UPDATE_POST, DELETE_POST, CLEAR_POSTS} from "../actions/types";

const initialState = [];

export default function (state = initialState, action){
    switch (action.type){
        case ADD_POST:
            return [...state, action.payload];
        case GET_POSTS:
            if (typeof(action.payload === 'object')){
                return action.payload;
            }
            return state;
        case UPDATE_POST:
            let updatePost = state.filter(post => post.id === action.payload.id);
            let updatePostObj = updatePost[0];
            for (let prop in action.payload){
                updatePostObj[prop] = action.payload[prop];
            }
            return state.filter(post => post.id !== action.payload.id).concat(updatePostObj);
        case DELETE_POST:
            return state.filter(post => post.id !== action.payload);
        case CLEAR_POSTS:
            return state.slice(0,0);
        default:
            return state
    }
}

