import {GET_USERS} from './types'
import axios from 'axios'

export const getUsers = (gender = null) => dispatch => {
    axios.post('api/search/getall', gender)
        .then(res => res.data)
        .then(users => dispatch({
            type: GET_USERS,
            payload: users
        }))
};

export const getUserByGender = (gender) => dispatch => {
    axios.post('api/search/getall', gender)
        .then(res => res.data)
        .then(users => dispatch({
            type: GET_USERS,
            payload: users
        }))
};



