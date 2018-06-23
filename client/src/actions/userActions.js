import {CREATE_USER} from './types';
import axios from 'axios';

//const URL = 'http://localhost:5000';

export const createUser = (data) => dispatch => {
    return axios.post('api/users/add', data)
};

export const getUser = (data) => dispatch => {
    return axios.post('api/users/get', data)
};
