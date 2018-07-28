module.exports = (req, res) => {
    if (req.session.id === undefined) {
        res.send('Need login');
        return;
    }
    let {id} = req.body;
    if (!id) {
        res.send('Need Post Id');
        return;
    }
    let db      = req.app.get('db'),
        promise = db.delete('posts', ['id', 'user_id'], [id, req.session.id]);

    promise.then(() => res.send('Deleted'))
        .catch((e) => {
            console.log(e);
            res.send(e);
        });
};
