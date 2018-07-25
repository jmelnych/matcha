const initialState = {
    user: {id: 100,
        email: "otheruser@gmail.com",
        username: "otheruser",
        firstname: "userName",
        lastname: "LastName",
        gender: "female",
        preference: "both",
        personality: null,
        occupancy: null,
        bday: "1999-01-20T00:00:00+02:00",
        rating: 0,
        bio: null,
        location: {
            lat: 50.464208899999996,
            lng: 30.466489,
            city: "Kyiv",
            country: "Ukraine",
        },
        avatar: "default.png",
        added: "2018-07-21 12:55:39"},
};

export default function (state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}