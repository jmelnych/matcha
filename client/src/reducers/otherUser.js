const initialState = {
    user: {
        info: {
            id: 100,
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
            added: "2018-07-21 12:55:39"
        },
        photos: [{filename: "photo-1532278111394.png"}],
        posts: [{id: 1, title: "fgfg", post: "fgfgfgfg", added: "2018-07-22 16:51:24"}],
        tags: [{id: 1, tag: "zombie"}, {id: 2, tag: "pizza"}]
    },
};

export default function (state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}