import {GET_USER} from './types'
import axios from 'axios'

export const createUser = (data) => dispatch => {
    return axios.post('api/users/add', data)
};

export const loginUser = (data) => dispatch => {
    return axios.post('api/users/get', data)
};

export const resendActivation = (data) => dispatch => {
    return axios.post('api/users/resend', data)
};

export  const sendLinkPassword = (data) => dispatch => {
    return axios.post('api/users/remind', data);
};

export const checkSession = (() => {
    return axios.post('api/users/get');
});

export const getUser = (data) => dispatch => {
    axios.post('api/users/get', data)
        .then(res => res.data)
        .then(user => dispatch({
            type: GET_USER,
            payload: user
        }));
};

export const updateUser = (data) => dispatch => {
    axios.post('api/users/update', data)
    // .then(res => res.data)
    // .then(user => dispatch({
    //     type: UPDATE_USER,
    //     payload: user
    // }))
}