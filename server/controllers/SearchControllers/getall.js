module.exports = (req, res) => {
    let promise,
        users     = req.app.get('user'),
        {gender} = req.body;
    console.log(gender);

    if (!gender) {
        promise = users.getAll();
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
    else if (gender){
        promise = users.getAllByUnique('gender', gender);
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
};
