import { CREATE_USER } from './types'
const URL = 'http://localhost:5000';

export const createUser = (userData) => dispatch => {
		fetch(`${URL}/users/`, {
			method: 'POST',
			headers: {
	            'Content-Type': 'application/json',
	            'Accept': 'application/json'
	        },
	        body: JSON.stringify({
	        	userData
	        })
		}).then(res => res.json())
		.then(user => dispatch({
			type: CREATE_USER,
			payload: user
		}));
}


