module.exports = (req, res) => {
    let user   = req.app.get('user'),
    {id}       = req.body,
    {filename} = req.body,
    promise    = user.update('avatar', filename, 'id', id);

    promise.then(() => {
        res.send('Avatar updated');
    }).catch((e) => {
        console.log(e);
    });
}