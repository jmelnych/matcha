import shortid from 'shortid'

const initialState = [{username: 'Olia',
    message: 'Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so?',
    time: '10:14 AM, Today',
    id:shortid.generate()},
    {username: 'julyettka',
        message: 'Actually everything was fine. Im very excited to show this to our team.',
        time: '10:20 AM, Today',
        id:shortid.generate()},
    {username: 'Olia',
        message: 'Actually everything was fine. Im very excited to show this to our team.',
        time: '10:20 AM, Today',
        id:shortid.generate()}
];

export default function (state = initialState, action) {
    switch (action.type){
        default:
            return state;
    }
}