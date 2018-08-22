module.exports = (req, res) => {
    let first_id  = req.session.id,
        second_id = parseInt(req.body.id);
    if (first_id === undefined) {
        res.send('Need login');
        return;
    }
    if (!second_id || second_id === first_id) {
        res.send('Need User Id');
        return;
    }
    let db                  = req.app.get('db'),
        relationshipHistory = req.app.get('relationshipHistory'),
        promise             = db.getHistory(first_id, second_id, true),
        error               = (e) => {
            console.log(e);
            res.send(e);
        };
    promise.then((response) => {
        let make  = (action) => {
                if (action === 'unlike') {
                    promise = db.delete('history', ['first_id', 'second_id', '`action`'], [first_id, second_id, 'like']);
                    promise.then(() => res.send(action)).catch(error);
                } else if (action === 'break up') {
                    promise = db.deleteFromHistory(['match'], [first_id, second_id, first_id, second_id]);
                    promise.then(() => {
                        promise = db.create('history', 'first_id, second_id, `action`', [first_id, second_id, action]);
                        promise.then(() => {
                            promise = db.getByUnique('users', 'id', second_id);
                            promise.then((user) => {
                                if (user.rating > 0) {
                                    user.rating--;
                                    promise = db.update('users', 'rating', user.rating, 'id', second_id);
                                    promise.then(() => {
                                        promise = db.run(`UPDATE messages SET read = 1
                                                          WHERE recipient_id = ? AND author_id = ?`,
                                            [second_id, first_id]);
                                        promise.then(() => res.send(action)).catch(error);
                                    }).catch(error);
                                } else {
                                    res.send(action);
                                }
                            }).catch(error);
                        }).catch(error);
                    }).catch(error);
                }
            },
            Ilike = relationshipHistory(response, 'like', first_id),
            match = relationshipHistory(response, 'match');

        if (Ilike) {
            make('unlike');
        } else if (match) {
            make('break up');
        } else {
            res.send('No');
        }
    }).catch(error);
};
