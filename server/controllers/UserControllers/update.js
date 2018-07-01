module.exports = (req, res) => {
    const {id} = req.body;
    let user   = req.app.get('user');
    //TODO: optimize implementation by improving update func in user model - remove loop here
    //EXPECTED RESULT: one request to DB instead loop requesting
    //see User.js update func
    for (let prop in req.body) {
        let promise = user.update(prop, req.body[prop], 'id', id);
        promise.then(() => {
            console.log('success');
        }).catch((e) => {
            console.log(e);
        });
    }
    res.send('success');
}