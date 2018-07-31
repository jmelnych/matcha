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
    let db      = req.app.get('db'),
        promise = db.getHistory(first_id),
        error   = (e) => {
            console.log(e);
            res.send(e);
        };
    promise.then((response) => {
        let fakes = response ? response.filter(row => row.second_id === second_id && row.action === 'fake') : null;
        if (fakes && fakes.length >= 10) {
            res.send('Uzbagoisya');
        } else {
            promise = db.create('history',
                'first_id, second_id, `action`',
                [first_id, second_id, 'fake']);
            promise.then(() => res.send('I reported you')).catch(error);
        }
    }).catch(error);
};
