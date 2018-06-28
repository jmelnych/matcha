import {CREATE_USER} from './types';
import axios from 'axios';

export const createUser = (data) => dispatch => {
    return axios.post('api/users/add', data)
};

export const getUser = (data) => dispatch => {
    return axios.post('api/users/get', data)
};

export const resendActivation = (data) => dispatch => {
    return axios.post('api/users/resend', data)
};

export  const sendLinkPassword = (data) => dispatch => {
    return axios.post('api/users/remind', data);
};

export const checkSession = (() => {
    return axios.post('api/users/session');
});