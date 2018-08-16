module.exports = (req, res) => {
    let id = req.session.id,
    db = req.app.get('db'),
        promise = db.run(`UPDATE history
                        SET read = 1
                        WHERE
                        second_id = ?`, id);
    promise.then(() => {
        res.send('success');
    }).catch(e => res.rend(e));
};