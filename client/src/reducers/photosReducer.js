import {GET_PHOTOS} from "../actions/types";

const initialState = [];

export default function (state = initialState, action){
    switch (action.type){
        case GET_PHOTOS:
            return action.payload
        default:
            return state
    }
}