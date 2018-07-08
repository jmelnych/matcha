module.exports = (req, res) => {
    let db       = req.app.get('db'),
        {filename} = req.body,
        promise    = db.update('users', 'avatar', filename, 'id', req.session.id);

    promise.then(() => {
        res.send('Avatar updated');
    }).catch((e) => {
        console.log(e);
    });
};
