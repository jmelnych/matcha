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
    //        [req.session.id, id, 'ban']),
    //    error   = (e) => {
    //        console.log(e);
    //        res.send(e);
    //    };
    //promise.then((response) => {
    //    if (response) {
    //        promise = db.delete('history',
    //            ['first_id', 'second_id', '`action`'],
    //            [req.session.id, id, 'unlike']);
    //        promise.then(() => {
    //            promise = db.delete('history',
    //                ['first_id', 'second_id', '`action`'],
    //                [req.session.id, id, 'ban']);
    //            promise.then(() => res.send('I unbanned you')).catch(error);
    //        }).catch(error);
    //    } else {
    //        res.send("I can't unban you");
    //    }
    //}).catch(error);
    res.send("Ne Rabotaet");
};
