import {
    GET_USER,
    UPDATE_USER,
    GET_USER_TAGS,
    DELETE_USER_TAG,
    SAVE_USER_TAG,
    LOGOUT_USER,
    UPDATE_USER_LOCATION,
    SET_NOTE,
    CLEAN_CHAT_NOTES,
    CLEAN_NOTES
} from '../actions/types'

const initialState = {
    auth: false,
    user: {},
    user_tags: [],
    unread_notes: [],
    unread_messages: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            if (action.payload.id) {
                return {
                    ...state,
                    user: action.payload,
                    auth: true
                }
            }
            return state;
        case UPDATE_USER:
            let updateUser = Object.assign({}, state.user);
            for (let prop in action.payload){
                updateUser[prop] = action.payload[prop];
            }
            return {
                ...state,
                user: updateUser
            };
        case UPDATE_USER_LOCATION:
            let updateUserObj = Object.assign({}, state.user);
            updateUserObj.location = action.payload.location;
            return {
                ...state,
                user: updateUserObj
            };
        case LOGOUT_USER:
            if (action.payload === 'logout'){
                return {
                    user: {},
                    auth: false
                }
            };
            return state;
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
            return {
                ...state,
                user_tags: state.user_tags.filter(tag => tag.tag !== action.payload.tag)
            };
        case SET_NOTE:
            if (action.payload.action === 'You have new message'){
                return {
                    ...state,
                    unread_messages: state.unread_messages.concat(action.payload)
                };
            } else {
                return {
                    ...state,
                    unread_notes: state.unread_notes.concat(action.payload)
                };
            }
        case CLEAN_NOTES:
            return {
                ...state,
                unread_notes: state.unread_notes.slice(0, 0)
            };
        case CLEAN_CHAT_NOTES:
            return {
                ...state,
                unread_messages: state.unread_messages.slice(0, 0)
            }
        default:
            return state;
    }
}