module.exports = (req, res) => {
    let promise,
        users     = req.app.get('user'),
        {gender, rating} = req.body;

    //TODO: handle request by several params
    if (gender){
        console.log(gender);
        if (gender.length === 2) {
            promise = users.getAll();
            promise.then((response) => {
                if (response === undefined) {
                    res.send('No users');
                } else {
                    res.send(response);
                }
            }).catch((e) => {
                res.send(e);
            });
        } else if (gender.toString() === 'Men') {
            promise = users.getAllByUnique('gender', 'male');
            promise.then((response) => {
                if (response === undefined) {
                    res.send('No users');
                } else {
                    res.send(response);
                }
            }).catch((e) => {
                res.send(e);
            });
        } else if (gender.toString() === 'Women') {
            promise = users.getAllByUnique('gender', 'female');
            promise.then((response) => {
                if (response === undefined) {
                    res.send('No users');
                } else {
                    res.send(response);
                }
            }).catch((e) => {
                res.send(e);
            })
        }
    }
};
