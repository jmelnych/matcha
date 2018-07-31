module.exports = (req, res) => {
    let db       = req.app.get('db'),
        promise  = db.getAllTagsForUser(req.session.id),
        response = obj => res.send(obj);

    promise.then(response).catch(response);
};
