import {CREATE_USER} from '../actions/types'

const initialState = {
    users: [],
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_USER:
            console.log('in CREATE_USER reducer');
            console.log(action.payload);
            return {
                ...state
            };
        default:
            return state;
    }
}