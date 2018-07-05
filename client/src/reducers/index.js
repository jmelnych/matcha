import {combineReducers} from 'redux'
import userReducer from './userReducer'
import flashMessages from './flashReducer'
import users from './searchReducer'

export default combineReducers({
    users,
    user: userReducer,
    flashMessages
});