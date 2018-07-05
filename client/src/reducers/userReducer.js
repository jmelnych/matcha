import {GET_USER, UPDATE_USER} from '../actions/types'

const initialState = {
    auth: false,
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            if (action.payload.id) {
                return {
                    user: action.payload,
                    auth: true
                }
            } else {
                return state;
            }
        case UPDATE_USER:
            let updateUser = Object.assign({}, state.user);
            for (let prop in action.payload){
                updateUser[prop] = action.payload[prop];
            }
            return {
                ...state,
                user: updateUser
            };
        default:
            return state;
    }
}