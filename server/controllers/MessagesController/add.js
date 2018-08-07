module.exports = (req, res) => {
    let db = req.app.get('db'),
        author_id = req.body.author_id,
        recipient_id = req.body.recipient_id,
        message = req.body.message,
        data = {author_id, recipient_id, message};

    let columns = Object.keys(data).join(', '),
        values = Object.values(data),
        promise = db.create('messages', columns, values);

        promise.then(() => {
            res.send('success');
        }).catch(e => {
            res.send(e);
        })
};