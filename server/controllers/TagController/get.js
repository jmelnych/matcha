module.exports = (req, res) => {
    let tag = req.app.get('tag'),
        promise = tag.getAll(),
        error   = (e) => {
            console.log(e);
            res.send(e);
        };

    promise.then((response) => {
        res.send(response);
    }).catch(error);
};