module.exports = (req, res) => {
    console.log(req.body);
    const {id} = req.body;
    let user   = req.app.get('user');
    //TODO: optimize implementation by improving update func in user model - remove loop here
    //EXPECTED RESULT: one request to DB instead loop requesting
    //see User.js update func
    for (let prop in req.body.data) {
        let promise = user.update(prop, req.body.data[prop], 'id', id);
        promise.then(() => {
            console.log('success');
        }).catch((e) => {
            console.log(e);
        });
    }
    res.send('success');
}