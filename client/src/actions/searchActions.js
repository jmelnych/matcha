import {GET_USERS, GET_MATCH_USERS} from './types'
import axios from 'axios'
import {getBaseURL} from '../config'

axios.defaults.baseURL = getBaseURL();

export const getUsersFiltered = (filters) => dispatch => {
    axios.post('api/search/get-by-filter', filters)
        .then(res => res.data)
        .then(users => dispatch({
            type: GET_USERS,
            payload: users
        }))
};

export const getMatchUsers = () => dispatch => {
    axios.post('api/search/match')
        .then(res => res.data)
        .then(users => dispatch({
            type: GET_MATCH_USERS,
            payload: users
        }))
}



