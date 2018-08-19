import {GET_PHOTOS, ADD_PHOTO, DELETE_PHOTO} from './types'
import axios from 'axios'

export const getPhotos = () => dispatch => {
    axios.post('api/image/get-photos')
        .then(res => res.data)
        .then(photos => dispatch({
            type: GET_PHOTOS,
            payload: photos
        }))
};

export const removePhoto = (name) => dispatch => {
    return axios.post('api/image/delete-photo', {name: name})
        .then(() => dispatch({
            type: DELETE_PHOTO,
            payload: name
        }))
};

export const addPhoto = (photo) => {
    return {
        type: ADD_PHOTO,
        payload: photo
    }
}
