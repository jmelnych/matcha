import {FETCH_HISTORY} from './types'
import axios from 'axios'
import {getBaseURL} from '../config'

axios.defaults.baseURL = getBaseURL();

export const fetchHistory = () => dispatch => {
    axios.post('api/users/history')
        .then(res => res.data)
        .then(history => dispatch({
            type: FETCH_HISTORY,
            payload: history
        }))
}