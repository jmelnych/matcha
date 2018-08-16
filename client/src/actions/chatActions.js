import {FETCH_MATCH_PEOPLE, SET_CHAT_HISTORY,
    ADD_CHAT_MESSAGE, RECEIVE_CHAT_MESSAGE, UPDATE_USER_STATUS,
    SET_CHAT_NOTE, CLEAN_CHAT_NOTES, SET_UNREAD_MESSAGES} from './types'
import axios from 'axios'
import {getBaseURL} from '../config'

axios.defaults.baseURL = getBaseURL();

export const fetchMatchUsers = () => dispatch => {
    axios.post('api/users/get-matches')
        .then(res => (res.data))
        .then(people => dispatch({
            type: FETCH_MATCH_PEOPLE,
            payload: people
        }))
};

export const getMessageHistory = (id) => dispatch => {
  axios.post('api/messages/get')
      .then(res => res.data)
      .then(messages => {
          dispatch({
              type: SET_CHAT_HISTORY,
              payload: messages
          });
          dispatch({
              type: SET_UNREAD_MESSAGES,
              payload: id
          })
      })
};

export const addChatMsg = data => dispatch => {
    axios.post('api/messages/add', data)
        .then(() => dispatch({
            type: ADD_CHAT_MESSAGE,
            payload: data
        }))
};

export const receiveChatMsg = data => {
    return {
        type: RECEIVE_CHAT_MESSAGE,
        payload: data
    }

};

export const updateChatStatus = data =>  {
    return {
        type: UPDATE_USER_STATUS,
        payload: data
    }
};

export const cleanChatNotes = id => dispatch => {
    axios.post('api/messages/read', {id: id})
        .then(() => dispatch({
            type: CLEAN_CHAT_NOTES,
            payload: id
        }))
};


