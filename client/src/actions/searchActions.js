import {GET_USERS} from './types'
import axios from 'axios'
//axios.defaults.baseURL = 'http://localhost:5000';

export const getUsers = () => dispatch => {
    axios.post('api/search/get-all')
        .then(res => res.data)
        .then(users => dispatch({
            type: GET_USERS,
            payload: users
        }))
};

export const getUsersFiltered = (filters) => dispatch => {
    axios.post('api/search/get-by-filter', filters)
        .then(res => res.data)
        .then(users => dispatch({
            type: GET_USERS,
            payload: users
        }))
};



