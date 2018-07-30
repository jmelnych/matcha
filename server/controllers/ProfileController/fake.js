module.exports = (req, res) => {
    //if (req.session.id === undefined) {
    //    res.send('Need login');
    //    return;
    //}
    //let {id} = req.body;
    //if (!id || id === req.session.id) {
    //    res.send('Need User Id');
    //    return;
    //}
    //let db      = req.app.get('db'),
    //    promise = db.getByMultipleUnique('history',
    //        ['first_id', 'second_id', '`action`'],
    //        [req.session.id, id, 'fake']),
    //    error   = (e) => {
    //        console.log(e);
    //        res.send(e);
    //    };
    //promise.then((response) => {
    //    if (response && response.length > 10) {
    //        res.send('Uzbagoisya');
    //    } else {
    //        promise = db.create('history',
    //            'first_id, second_id, `action`',
    //            [req.session.id, id, 'fake']);
    //        promise.then(() => res.send('I reported you')).catch(error);
    //    }
    //}).catch(error);
    res.send("Ne Rabotaet");
};
