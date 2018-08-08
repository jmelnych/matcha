import {combineReducers} from 'redux'
import userReducer from './userReducer'
import flashMessages from './flashReducer'
import users from './searchReducer'
import tags from './tagsReducer'
import photos from './photosReducer'
import posts from './postsReducer'
import chat from './chatReducer'
import otherUser from './otherUser'
import matchUsers from './matchUsersReducer'
import history from './historyReducer'

export default combineReducers({
    users,
    user: userReducer,
    tags,
    flashMessages,
    photos,
    posts,
    chat,
    otherUser,
    matchUsers,
    history
});