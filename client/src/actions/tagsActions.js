import {GET_TAGS} from './types'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000';

export const getTags = () => dispatch => {
    axios.post('api/tags/get')
        .then(res => res.data)
        .then(tags => dispatch({
            type: GET_TAGS,
            payload: tags
        }))
};

export const addTags = (tags) => dispatch => {
    return axios.post('api/tags/add', tags);
};

export const saveUserTag = (tag) => dispatch => {
    return axios.post('api/tags/addtouser', {name: tag})
};

export const deleteUserTag = (tag) => dispatch => {
    return axios.post('api/tags/deletefromuser', {name: tag})
};


