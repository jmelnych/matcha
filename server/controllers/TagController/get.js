module.exports = (req, res) => {
    let db = req.app.get('db'),
        promise = db.getAll('tags'),
        error   = (e) => {
            console.log(e);
            res.send(e);
        };

    promise.then((response) => {
        res.send(response);
    }).catch(error);
};
