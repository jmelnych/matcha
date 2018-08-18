import {GET_PHOTOS, ADD_PHOTO} from "../actions/types";

const initialState = [];

export default function (state = initialState, action){
    switch (action.type){
        case GET_PHOTOS:
            if (typeof (action.payload === 'object')){
            return action.payload
            }
            return state;
        case ADD_PHOTO:
            return state.concat(action.payload)
        default:
            return state
    }
}