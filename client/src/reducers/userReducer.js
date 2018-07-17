import {GET_USER, UPDATE_USER, GET_USER_TAGS,
    DELETE_USER_TAG, SAVE_USER_TAG, LOGOUT_USER} from '../actions/types'

const initialState = {
    auth: false,
    user: {},
    user_tags: []
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
        case LOGOUT_USER:
            if (action.payload === 'logout'){
                return {
                    user: {},
                    auth: false
                }
            } else {
                return state;
            };
        case GET_USER_TAGS:
            return {
                ...state,
                user_tags: action.payload
            };
        case SAVE_USER_TAG:
            return {
                ...state,
                user_tags: state.user_tags.concat(action.payload)
            };
        case DELETE_USER_TAG:
            console.log('state tags', state.user_tags);
            console.log('action payload', action.payload);
            return {
                ...state,
                user_tags: state.user_tags.filter(tag => tag.tag !== action.payload.tag)
            };
        default:
            return state;
    }
}