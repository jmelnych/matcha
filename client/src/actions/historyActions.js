import {FETCH_HISTORY, RECEIVE_HISTORY_NOTE, SET_UNREAD_HISTORY,
    CLEAN_HISTORY_NOTES} from './types'
import axios from 'axios'
import {getBaseURL} from '../config'

axios.defaults.baseURL = getBaseURL();

export const fetchHistory = (id) => dispatch => {
    axios.post('api/users/history')
        .then(res => res.data)
        .then(history => {
            dispatch({
                type: FETCH_HISTORY,
                payload: history
        });
            dispatch({
                type: SET_UNREAD_HISTORY,
                payload: id
            })
        })
};

export const receiveHistoryNote = (data) => {
  return {
      type: RECEIVE_HISTORY_NOTE,
      payload: data
  }
};

export const cleanHistoryNotes = () => dispatch => {
    axios.post('api/users/read-history')
        .then(() => dispatch({
            type:CLEAN_HISTORY_NOTES
        }))
}