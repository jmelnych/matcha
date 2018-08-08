module.exports = (req, res) => {
    let id = req.session.id;
    if (id === undefined) {
        res.send('Need login');
        return;
    }
    let db      = req.app.get('db'),
        promise = db.all(`SELECT history.id,
                                 history.first_id,
                                 history.second_id,
                                 history.action,
                                 history.added,
                                 users.id,
                                 users.firstname,
                                 users.lastname,
                                 users.avatar
                          FROM history
                                 JOIN users ON (users.id = history.first_id OR
                                                users.id = history.second_id) AND
                                               users.id != ?
                          WHERE (first_id = ? OR second_id = ?)
                          ORDER BY history.added DESC`, [id, id, id]);
    promise.then((history) => {
                console.log('hhh',history);
        if (history && history.length) {
            history = history.map(row => {
                row.action = row.first_id === id ?
                    'I ' + row.action : row.action + ' Me';
                delete row.first_id;
                delete row.second_id;
                return row;
            });
            res.send(history);
        } else {
            res.send('Empty');
        }
    }).catch(error => {
        console.log(error);
        res.send(error);
    });
};
