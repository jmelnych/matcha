import {ADD_CHAT_MESSAGE} from './types'

export const addChatMsg = (data) => dispatch => {
    dispatch({
        type: ADD_CHAT_MESSAGE,
        payload: data
    })
};