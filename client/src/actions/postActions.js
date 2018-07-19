import {ADD_POST, GET_POSTS} from './types'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000';

export const addPost = (post) => dispatch => {
    axios.post('api/posts/add', post)
        .then((res) => res.data)
        .then((post) => dispatch({
            type: ADD_POST,
            payload: post
        }))
};

export const getPosts = () => dispatch => {
    axios.post('api/posts/get')
        .then((res) => res.data)
        .then(posts => dispatch({
            type: GET_POSTS,
            payload: posts
        }))
}
