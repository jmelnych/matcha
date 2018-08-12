import {ADD_POST, GET_POSTS, UPDATE_POST, DELETE_POST} from './types'
import axios from 'axios'
import {getBaseURL} from '../config'

axios.defaults.baseURL = getBaseURL();

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
};

export const updatePost = (post) => dispatch => {
    axios.post('api/posts/update', post)
        .then(() => dispatch({
            type: UPDATE_POST,
            payload: post
        }))
};

export const deletePost = (id) => dispatch => {
    axios.post('api/posts/delete', {id})
        .then(() => dispatch({
            type: DELETE_POST,
            payload: id
        }))
};
