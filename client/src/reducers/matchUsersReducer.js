import {FETCH_MATCH_PEOPLE, UPDATE_USER_STATUS} from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
    switch(action.type){
        case FETCH_MATCH_PEOPLE:
            if (typeof (action.payload) === 'object'){
                return action.payload;
            }
            return state;
        case UPDATE_USER_STATUS:
            let {id} = action.payload;
            let user = state.filter(user => user.id === id);
            if (user.length){
                let userObj = user[0];
                userObj.online = action.payload.status === 'online' ? 1 : 0;
                if (!userObj.online) {
                    userObj.last_seen = new Date();
                }
                return [
                    ...state.filter(user => user.id !== id),
                    userObj
                ];
            } else {
                return state;
            }
        default:
            return state;
    }
}