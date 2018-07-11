import {GET_TAGS, ADD_TAGS} from './types'
import axios from 'axios'

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
}

