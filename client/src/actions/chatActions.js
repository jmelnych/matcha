import {ADD_CHAT_MESSAGE, RECEIVED_CHAT_MESSAGE,
    FETCH_MATCH_PEOPLE} from './types'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000';

export const fetchMatchUsers = (temp) => dispatch => {
    axios.post('api/users/get-matches')
        .then(res => (res.data))
        .then(people => dispatch({
            type: FETCH_MATCH_PEOPLE,
            payload: people
        }))
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
};