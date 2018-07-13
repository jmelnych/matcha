import {GET_PHOTOS} from './types'
import axios from 'axios'

export const getPhotos = () => dispatch => {
    axios.post('api/image/getphotos')
        .then(res => res.data)
        .then(photos => dispatch({
            type: GET_PHOTOS,
            payload: photos
        }))
};
