import {GET_PHOTOS} from "../actions/types";

const initialState = [];

export default function (state = initialState, action){
    switch (action.type){
        case GET_PHOTOS:
            if (typeof (action.payload === 'object')){
            return action.payload
            }
            return state;
        default:
            return state
    }
}