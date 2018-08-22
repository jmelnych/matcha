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
        let make = (action) => {
                if (action === 'unban') {
                    promise = db.delete('history', ['first_id', 'second_id', '`action`'], [first_id, second_id, 'ban']);
                    promise.then(() => res.send(action)).catch(error);
                } else if (action === 'ban') {
                    promise = db.deleteFromHistory(['like', 'match', 'break up'], [first_id, second_id, first_id, second_id]);
                    promise.then(() => {
                        promise = db.create('history', 'first_id, second_id, `action`', [first_id, second_id, action]);
                        promise.then(() => {
                        promise = db.run(`UPDATE messages SET read = 1
                                          WHERE recipient_id = ? AND author_id = ?`,
                            [second_id, first_id]);
                            promise.then(() => res.send(action)).catch(error);
                        }).catch(error);
                    }).catch(error);
                }
            },
            Iban = relationshipHistory(response, 'ban', first_id);

        if (Iban) {
            make('unban');
        } else if (!Iban) {
            make('ban');
        } else {
            res.send('No');
        }
    }).catch(error);
};
