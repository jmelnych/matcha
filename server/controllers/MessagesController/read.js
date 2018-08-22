module.exports = (req, res) => {
    let {id} = req.body;
    let db = req.app.get('db'),
        promise = db.run(`UPDATE messages
                        SET read = 1
                        WHERE
                        recipient_id = ? AND author_id = ?`, [req.session.id, id]);
    promise.then(() => {
        res.send('success');
    }).catch(e => res.send(e));
};
