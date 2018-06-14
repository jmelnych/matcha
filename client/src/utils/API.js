export const URL='http://localhost:5000';
// export const header = {
//   'Authorization': '12345'
// }
//POST method
export const createUser = (data) => {
    return fetch(`${URL}/users/`, {
        method: 'POST',
        headers: {

            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
        	data
        })
    }).then(res => res.json())
}

