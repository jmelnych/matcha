import {GET_USERS} from './types'
import axios from 'axios'

export const getUsers = () => dispatch => {
    axios.post('api/search/getall')
        .then(res => res.data)
        .then(users => dispatch({
            type: GET_USERS,
            payload: users
        }))
};

