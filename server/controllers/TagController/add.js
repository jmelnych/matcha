module.exports = (req, res) => {
    let tag = req.app.get('tag'),
        {name} = req.body,
        promise = tag.add(name),
        error   = (e) => {
            console.log(e);
            res.send(e);
        };

    promise.then((response) => {
        res.send(response);
    }).catch(error);
};