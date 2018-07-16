import {GET_USER, UPDATE_USER, LOGOUT_USER} from './types'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000';

export const createUser = (data) => dispatch => {
    return axios.post('api/users/add', data)
};

export const tryLoginUser = (data) => dispatch => {
    return axios.post('api/users/get', data)
};

export const resendActivation = (data) => dispatch => {
    return axios.post('api/users/resend', data)
};

export  const sendLinkPassword = (data) => dispatch => {
    return axios.post('api/users/remind', data);
};

export const getUser = () => dispatch => {
    axios.post('api/users/get')
        .then(res => res.data)
        .then(user => dispatch({
            type: GET_USER,
            payload: user
        }));
};

export const updateUser = (id, data) => dispatch => {
    axios.post('api/users/update', {id, data})
    .then(() => dispatch({
        type: UPDATE_USER,
        payload: data
    }))
};

export const tryActivate = (token) => dispatch => {
    return axios.post('api/users/activate', token)
};

export const updatePassword = (password, token) => dispatch => {
    return axios.post('api/users/password', {password, token})
};

export const validatePassword = (password) => dispatch => {
    return axios.post('api/users/password', password)
};

export const updatePasswordFromProfile = (password) => dispatch => {
    return axios.post('api/users/password', password)
};

export const logoutUser = () => dispatch => {
    axios.post('api/users/logout')
        .then(res => res.data)
        .then(user => dispatch({
            type: LOGOUT_USER,
            payload: user
        }));
};
