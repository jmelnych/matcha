import {FETCH_MATCH_PEOPLE} from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
    switch(action.type){
        case FETCH_MATCH_PEOPLE:
            return action.payload;
        default:
            return state;
    }
}