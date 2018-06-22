import {combineReducers} from 'redux'
import userReducer from './userReducer'
import flashMessages from './flashReducer'

export default combineReducers({
    user: userReducer,
    flashMessages
});