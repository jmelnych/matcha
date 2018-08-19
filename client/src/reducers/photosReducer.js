import {GET_PHOTOS, ADD_PHOTO, DELETE_PHOTO, CLEAR_PHOTOS} from "../actions/types";

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
        case DELETE_PHOTO:
            return state.filter(photo => photo.filename !== action.payload)
        case CLEAR_PHOTOS:
            return state.slice(0,0);
        default:
            return state
    }
}