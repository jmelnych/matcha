import {FETCH_HISTORY} from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type){
        case FETCH_HISTORY:
            return action.payload;
        default:
            return state;
    }
}