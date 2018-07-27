import {GET_OTHER_USER} from '../actions/types'

const initialState = {
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_OTHER_USER:
            // console.log(action.payload);
            return {
                user: action.payload
            };
        default:
            return state;
    }
}