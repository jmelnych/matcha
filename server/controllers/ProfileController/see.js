module.exports = (req, res) => {
    if (req.session.id === undefined) {
        res.send('Need login');
        return;
    }
    let {id} = req.body;
    if (!id || id === req.session.id) {
        res.send('Need User Id');
        return;
    }
    let db      = req.app.get('db'),
        promise = db.create('history',
            'first_id, second_id, `action`',
            [req.session.id, id, 'see']),
        error        = (e) => {
            console.log(e);
            res.send(e);
        };
    promise.then(() => res.send('I see you')).catch(error);
};
