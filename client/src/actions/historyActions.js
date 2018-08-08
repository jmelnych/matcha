import {FETCH_HISTORY} from './types'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5000';

export const fetchHistory = () => dispatch => {
    axios.post('api/users/history')
        .then(res => res.data)
        .then(history => dispatch({
            type: FETCH_HISTORY,
            payload: history
        }))
}