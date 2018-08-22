import {GET_TAGS, ADD_TAGS} from "../actions/types"

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TAGS:
            return action.payload;
        case ADD_TAGS:
            if(!action.payload.errno){
                return state.concat(action.payload);
            }
            return state;
        default:
            return state;
    }
}