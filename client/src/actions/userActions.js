import {CREATE_USER} from './types'

const URL = 'http://localhost:5000';

export const createUser = (data) => dispatch => {
    fetch(`${URL}/user/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            data
        })
    }).then(res => res.json())
        .then(user => dispatch({
            type: CREATE_USER,
            payload: user
        }));
};