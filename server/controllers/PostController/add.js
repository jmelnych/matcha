module.exports = (req, res) => {
    console.log(req.body);
    // let db = req.app.get('db'),
    //     {names} = req.body,
    //     promise = db.createMultiple('tags', 'tag', names),
    //     error   = (e) => {
    //         console.log('error: ', e);
    //         res.send(e);
    //     };
    //
    // promise.then(() => {
    //     res.send('Tags added');
    // }).catch(error);
};