import {ADD_POST} from './types'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000';

export const addPost = (post) => dispatch => {
    axios.post('api/posts/add', post)
        .then(() => dispatch({
            type: ADD_POST,
            payload: post
        }))
};
