import {GET_USER, UPDATE_USER, UPLOAD_AVATAR} from '../actions/types'

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
        case UPDATE_USER:
            let updateUser = Object.assign({}, state.user);
            for (let prop in action.payload){
                updateUser[prop] = action.payload[prop];
            }
            return {
                ...state,
                user: updateUser
            };
        case UPLOAD_AVATAR:
            console.log(action.payload);
        default:
            return state;
    }
}