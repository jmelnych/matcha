import {FETCH_MATCH_PEOPLE, ADD_CHAT_MESSAGE, RECEIVE_CHAT_MESSAGE} from './types'
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
    axios.post('api/messages/add', data)
        .then(() => dispatch({
            type: ADD_CHAT_MESSAGE,
            payload: data
        }))
};

export const receiveChatMsg = data => dispatch => {
    dispatch({
        type: RECEIVE_CHAT_MESSAGE,
        payload: data
    })
}
