import {GET_TAGS, ADD_TAGS} from './types'
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
    axios.post('api/tags/add', tags)
        .then(res => res.data)
        .then(tags => dispatch({
            type: ADD_TAGS,
            payload: tags
        }))
};





