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
        mysocket            =  req.app.get('socket'),
        relationshipHistory = req.app.get('relationshipHistory'),
        promise             = db.getHistory(first_id, second_id, true),
        error               = (e) => {
            console.log(e);
            res.send(e);
        };
    promise.then((response) => {
        let make   = (action) => {
                promise = db.create('history',
                    'first_id, second_id, `action`',
                    [first_id, second_id, action]);
                promise.then(() => {
                    promise = db.deleteFromHistory(action === 'like' ? ['break up'] : ['like', 'break up'],
                        [first_id, second_id, first_id, second_id]);
                    promise.then(() => {
                        promise = db.getByUnique('users', 'id', second_id);
                        promise.then((user) => {
                            if (user.rating < 42) {
                                user.rating++;
                                promise = db.update('users', 'rating', user.rating, 'id', second_id);
                                promise.then(() => {
                                    res.send(action);
                                }).catch(error);
                            } else {
                                res.send(action);
                            }
                        }).catch(error);
                    }).catch(error);
                }).catch(error);
            },
            Ilike  = relationshipHistory(response, 'like', first_id),
            likeMe = relationshipHistory(response, 'like', second_id),
            match  = relationshipHistory(response, 'match'),
            ban    = relationshipHistory(response, 'ban');

        if (!Ilike && !likeMe && !match && !ban) {
            make('like');
            mysocket.broadcastNote(second_id, 'Your profile liked another user');
        } else if (!Ilike && likeMe) {
            make('match');
            mysocket.broadcastNote(second_id, 'You have a new match!');
        } else {
            res.send('No');
        }
    }).catch(error);
};
