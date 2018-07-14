module.exports = (req, res) => {
    let db = req.app.get('db'),
        {names} = req.body,
        promise = db.createMultiple('tags', 'tag', names),
        error   = (e) => {
            console.log('error: ', e);
            res.send(e);
        };

    promise.then((response) => {
        console.log(response);
        res.send('Tags added');
    }).catch(error);
};
