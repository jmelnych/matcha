import {GET_USER} from '../actions/types'

const initialState = {
    users: [],
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return {
                user: action.payload
            };
        default:
            return state;
    }
}