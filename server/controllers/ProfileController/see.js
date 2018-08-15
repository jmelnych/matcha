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
        let mysocket = req.app.get('socket'),
            banMe    = relationshipHistory(response, 'ban', first_id);
        if (banMe) {
            mysocket.broadcastNote(second_id, 'Your page have been viewed');
            promise = db.create('history', 'first_id, second_id, `action`', [first_id, second_id, 'see']);
            promise.then(() => {
                res.send('I see you');
            }).catch(error);
        } else {
            res.send("Banned user can't generate view event");
        }
    }).catch(error);
};
