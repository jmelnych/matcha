import {FETCH_MATCH_PEOPLE, UPDATE_USER_STATUS} from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
    switch(action.type){
        case FETCH_MATCH_PEOPLE:
            return action.payload;
        case UPDATE_USER_STATUS:
            let {id} = action.payload;
            //console.log('action payl', action.payload);
            let user = state.filter(user => user.id === id);
            //console.log('filtered user', user);
            if (user.length){
                let userObj = user[0];
                userObj.online = action.payload.status === 'online' ? 1 : 0;
                if (!userObj.online) {
                    userObj.last_seen = new Date();
                }
                //console.log(userObj);
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