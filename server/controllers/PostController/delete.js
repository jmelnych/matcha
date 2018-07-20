module.exports = (req, res) => {
    console.log(req.body);
    let db      = req.app.get('db'),
        {id}    = req.body,
        promise = db.delete('posts', ['id', 'user_id'], [id, req.session.id]);

    promise.then(() => res.send('Deleted'))
        .catch((e) => {
            console.log(e);
            res.send(e);
        });
};
