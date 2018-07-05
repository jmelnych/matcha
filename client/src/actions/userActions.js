import {GET_USER, UPDATE_USER} from './types'
import axios from 'axios'

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

export const uploadAvatar = (id, filename) => dispatch => {
    return axios.post('api/users/avatar', {id, filename});
};

export const uploadPhoto = (id, photo) => dispatch => {
    return axios.post('api/users/photos', {id, photo});
};

