import {ADD_POST} from "../actions/types";

const initialState = [{ id: 1,
                        text: 'Hello world',
                        author: 'julyettka',
                        avatar: 'default.png',
                        date: Date.now()}];

export default function (state = initialState, action){
    switch (action.type){
        case ADD_POST:
            return state.concat(action.payload);
        default:
            return state
    }
}