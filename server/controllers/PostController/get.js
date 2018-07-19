module.exports = (req, res) => {
    let db      = req.app.get('db'),
        {id}  = req.body,
        promise = db.getAllByUnique('posts', ['user_id'], id ? id : req.session.id),
        filterObject = req.app.get('filterObject'),
        error        = (e) => {
            console.log(e);
            res.send(e);
        };

    promise.then((response) => {
        if (response){
            res.send(response.map(val => filterObject(val, ['id', 'title', 'post', 'added'])))
        } else {
            res.send('404');
        }
    }).catch(error);
};
