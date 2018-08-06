import {ADD_CHAT_MESSAGE, RECEIVED_CHAT_MESSAGE, POPULATE_USER_LIST} from './types'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000';

export const fetchMatchUsers = (temp) => dispatch => {
    return axios.post('api/users/get-matches');
};

export const addChatMsg = data => dispatch => {
    dispatch({
        type: ADD_CHAT_MESSAGE,
        payload: data
    })
};

export const receivedChatMsg = data => dispatch => {
    dispatch({
        type: RECEIVED_CHAT_MESSAGE,
        payload: data
    })
}