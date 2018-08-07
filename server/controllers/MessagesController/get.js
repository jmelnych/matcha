module.exports = (req, res) => {
    let db = req.app.get('db'),
        promise = db.all(`SELECT * FROM messages WHERE(author_id = ? OR recipient_id = ?)`, [req.session.id, req.session.id]);
        promise.then(response => {
        res.send(response);
        }).catch(e => res.rend(e));
};
