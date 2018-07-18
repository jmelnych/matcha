module.exports = (req, res) => {
    let db       = req.app.get('db'),
        {id}     = req.body,
        promise  = db.getAllTagsForUser(id ? id : req.session.id),
        response = obj => res.send(obj);

    promise.then(response).catch(response);
};
