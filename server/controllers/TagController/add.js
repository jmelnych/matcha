module.exports = (req, res) => {
    let db = req.app.get('db'),
        {name} = req.body,
        promise = db.create('tags', 'tag', [name]),
        error   = (e) => {
            console.log(e);
            res.send(e);
        };

    promise.then((response) => {
        res.send(response);
    }).catch(error);
};
